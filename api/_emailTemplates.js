// api/_emailTemplates.js
// HTML email templates used by api/contact.js
// Kept table-based + inline-styled on purpose: Gmail/Outlook strip most
// modern CSS (flexbox, backdrop-filter, gradients on text, etc.), so this
// mimics the portfolio's dark/indigo look using only what email clients
// reliably render.

const SITE_NAME = 'Hemant Singh'
const LINKEDIN_URL = 'https://www.linkedin.com/in/hemant-singh-b69a14291'
const ACCENT = '#6366f1'
const ACCENT_LIGHT = '#818cf8'

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function shell(innerHtml) {
  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
              ${innerHtml}
              <tr>
                <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #eee;">
                  <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                    Sent automatically from ${SITE_NAME}'s contact form &middot;
                    <a href="${LINKEDIN_URL}" style="color:${ACCENT};text-decoration:none;">LinkedIn</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`
}

/**
 * Email sent to YOU (the site owner) whenever someone submits the form.
 */
export function ownerNotificationTemplate({ name, email, message }) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')
  const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

  const body = `
    <tr>
      <td style="background:linear-gradient(135deg,${ACCENT},${ACCENT_LIGHT});padding:28px 32px;">
        <p style="margin:0;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);">New portfolio message</p>
        <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;">📩 ${safeName} contacted you</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Name</p>
              <p style="margin:2px 0 0;font-size:15px;color:#111827;font-weight:600;">${safeName}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Email</p>
              <p style="margin:2px 0 0;font-size:15px;">
                <a href="mailto:${safeEmail}" style="color:${ACCENT};text-decoration:none;font-weight:600;">${safeEmail}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0 4px;">
              <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;">Message</p>
              <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;background:#f9fafb;border-radius:10px;padding:14px 16px;border:1px solid #f0f0f0;">${safeMessage}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px 26px;">
        <a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: your message to ' + SITE_NAME)}"
           style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 22px;border-radius:10px;">
          Reply to ${safeName}
        </a>
        <p style="margin:16px 0 0;font-size:12px;color:#c1c5cb;">Received ${timestamp}</p>
      </td>
    </tr>`

  return {
    subject: `📩 New message from ${name} - Portfolio`,
    html: shell(body),
    text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nReceived: ${timestamp}`,
  }
}

/**
 * Auto-reply sent to the VISITOR who filled the form.
 */
export function visitorAutoReplyTemplate({ name }) {
  const safeName = escapeHtml(name)

  const body = `
    <tr>
      <td style="background:#0d0d0d;padding:32px;text-align:center;">
        <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,${ACCENT},${ACCENT_LIGHT});display:inline-block;line-height:52px;color:#fff;font-weight:700;font-size:18px;font-family:monospace;">HS</div>
        <h1 style="margin:18px 0 0;font-size:21px;color:#ffffff;font-weight:700;">Thanks for reaching out, ${safeName}! 👋</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px 6px;">
        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
          I've received your message and really appreciate you taking the time to connect.
        </p>
        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.65;">
          I'll go through it carefully and <strong>get back to you soon</strong> - usually within a day or two.
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.65;">
          In the meantime, feel free to connect with me on LinkedIn.
        </p>
        <a href="${LINKEDIN_URL}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 22px;border-radius:10px;">
          Connect with me on LinkedIn
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 30px;">
        <p style="margin:0;font-size:14px;color:#111827;">- Hemant Singh</p>
        <p style="margin:2px 0 0;font-size:12.5px;color:#9ca3af;">Full-Stack Developer</p>
      </td>
    </tr>`

  return {
    subject: `Thanks for reaching out, ${name}! I'll be in touch soon`,
    html: shell(body),
    text: `Hi ${name},\n\nI've received your message and will get back to you soon.\n\nConnect with me on LinkedIn: ${LINKEDIN_URL}\n\n- Hemant Singh\nFull-Stack Developer`,
  }
}
