// api/contact.js
// Vercel serverless function - /api/contact
// This SAME file runs both locally (via `vercel dev`) and in production
// (Vercel auto-deploys anything in /api). No separate server, no code
// changes needed between local and production.
//
// Sends TWO emails on every valid submission:
//   1. A styled notification to YOU (the site owner).
//   2. A styled auto-reply to the VISITOR who submitted the form.
//
// Required environment variables (see .env.example):
//   EMAIL_USER   - the Gmail address that sends the mail
//   EMAIL_PASS   - a Gmail "App Password" (NOT your normal Gmail password)
//   TO_EMAIL     - (optional) where owner notifications land. Defaults to EMAIL_USER.

import nodemailer from 'nodemailer'
import dns from 'node:dns'
import { ownerNotificationTemplate, visitorAutoReplyTemplate } from './_emailTemplates.js'

// Fixes DNS timeouts some Windows machines hit when resolving smtp.gmail.com.
dns.setDefaultResultOrder('ipv4first')

// Very small in-memory rate limit: same IP can submit once every 30s per
// serverless instance. Not bulletproof (cold starts reset it), but stops
// accidental double-submits and basic spam bots without extra infra.
const lastSubmission = new Map()
const RATE_LIMIT_MS = 30_000

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  return (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

let transporter = null
function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  return transporter
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message, company } = req.body || {}

  // Honeypot: hidden "company" field. Real users never fill it; bots often do.
  if (company) {
    return res.status(200).json({ message: 'Message received successfully' })
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' })
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message is too long' })
  }

  const ip = getClientIp(req)
  const now = Date.now()
  const last = lastSubmission.get(ip)
  if (last && now - last < RATE_LIMIT_MS) {
    return res.status(429).json({ error: 'Please wait a moment before sending another message' })
  }
  lastSubmission.set(ip, now)

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER / EMAIL_PASS env vars are not set - cannot send email')
    return res.status(500).json({ error: 'Email service is not configured' })
  }

  console.log(`📩 Contact: ${name} (${email}) - ${message}`)

  try {
    const mail = getTransporter()
    const ownerEmail = ownerNotificationTemplate({ name, email, message })
    const replyEmail = visitorAutoReplyTemplate({ name })

    const results = await Promise.allSettled([
      mail.sendMail({
        from: `"${name} via Portfolio" <${process.env.EMAIL_USER}>`,
        to: process.env.TO_EMAIL || process.env.EMAIL_USER,
        replyTo: email,
        subject: ownerEmail.subject,
        html: ownerEmail.html,
        text: ownerEmail.text,
      }),
      mail.sendMail({
        from: `"Hemant Singh" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: replyEmail.subject,
        html: replyEmail.html,
        text: replyEmail.text,
      }),
    ])

    const [ownerResult, replyResult] = results
    if (ownerResult.status === 'rejected') {
      console.error('Failed to send owner notification email:', ownerResult.reason)
    }
    if (replyResult.status === 'rejected') {
      console.error('Failed to send visitor auto-reply email:', replyResult.reason)
    }

    // Owner notification is the critical one - auto-reply is a nice-to-have.
    if (ownerResult.status === 'rejected') {
      throw ownerResult.reason
    }

    return res.status(200).json({ message: 'Message received successfully' })
  } catch (err) {
    console.error('Error sending contact email:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again or email me directly.' })
  }
}
