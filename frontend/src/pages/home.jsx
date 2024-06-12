import React, { useState } from 'react';
import Navbar from '../components/nav';
import './page.css';
import { FiInstagram } from 'react-icons/fi';
import { MdLocationPin } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Email is not valid';
    tempErrors.message = formData.message ? '' : 'Message is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:4400/message', formData);
        alert("Message sent succesfuly");
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } catch (error) {
        alert('Error submitting form');
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* header */}
      <div className="bg_img">
        <br />
        <br />
        <br />
        <div className="heading_div">
          <h1 className="hi">HI!</h1>
          <h1 className="name">I am Hemant Singh</h1>
          <br />
          <p className="dev">MERN STACK DEVELOPER</p>
          <br />
          <br />
          <br />
          <a href="https://github.com/Honeyaps" className="visit">
            Visit My Work
          </a>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about_sec">
        <div className="img_div">
          <img src="IMG_20221210_234743.jpg" className="img" alt="Hemant Singh" />
        </div>
        <div className="about">
          <h1 className="h1_abt">About Me</h1>
          <br />
          <p className="text_abt_me">
            As a dedicated and proficient MERN Stack Developer, I bring
            extensive experience in building dynamic, responsive, and
            high-performance web applications using MongoDB, Express.js, React,
            and Node.js. My expertise lies in designing and implementing robust
            full-stack solutions that are both scalable and maintainable. With a
            strong foundation in JavaScript and a keen eye for detail, I excel
            in developing user-centric interfaces, ensuring seamless backend
            integration, and optimizing overall application performance. My
            projects demonstrate a commitment to best practices in coding,
            including code reusability, modularity, and efficient state
            management. Additionally, I have a proven track record of
            collaborating effectively with cross-functional teams to deliver
            innovative solutions that meet client requirements and enhance user
            experiences.
          </p>
          <br />
          <br />
          <a
            href="https://drive.google.com/file/d/1MhEsdbBXqG7Km2QmBx_loAu7qGgWYtxU/view?usp=drivesdk"
            className="dnld_cv"
          >
            Download CV
          </a>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* LANGUAGES */}

      <h1 className="wik">What I Know?</h1>
      <div className="lang_div_contnr">
        <div className="frontend">
          <h2 className="lang_head">Frontend</h2>
          <br />
          <span>HTML</span>
          <span>CSS</span> <br />
          <br />
          <span>Tailwind</span>
          <span>Javascript</span> <br />
          <br />
          <span>React js</span>
        </div>

        <div className="backend">
          <h2 className="lang_head">Backend</h2>
          <br />
          <span>Node.js</span>
          <span>Express</span> <br />
          <br />
        </div>

        <div className="database">
          <h2 className="lang_head">Database</h2>
          <br />
          <span>MongoDB</span>
          <span>Firebase</span>
          <br />
          <br />
          <span>MongoDB Atlas</span>
        </div>

        <div className="projects">
          <h2 className="lang_head">Projects</h2>
          <br />
          <div className="inner_proj_div">
            <a href="https://github.com/Honeyaps?tab=repositories" className="project_link">
              <p className="proj_head">Expense-Tracker</p>
              <p className="proj_desc">
                React.js, react-chart-js2, Node.js, Express.js, Mongodb
              </p>
            </a>
          </div>
          <br />
          <div className="inner_proj_div">
            <a href="https://github.com/Honeyaps?tab=repositories" className="project_link">
              <p className="proj_head">Blog-app</p>
              <p className="proj_desc">
                React.js, Node.js, Express.js, Mongodb, Firebase
              </p>
            </a>
          </div>
          <br />
          <div className="inner_proj_div">
            <a href="https://github.com/Honeyaps?tab=repositories" className="project_link">
              <p className="proj_head">E-Commerce</p>
              <p className="proj_desc">
                React.js , Node.js, Express.js, Mongodb, Firebase
              </p>
            </a>
          </div>
          <br />
          <div className="inner_proj_div">
            <a href="https://github.com/Honeyaps?tab=repositories" className="project_link">
              <p className="proj_head">Game-Space</p>
              <p className="proj_desc">HTML, CSS, Bootstrap</p>
            </a>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      {/* HIRE ME */}
      <div className="hire_sec">
        <div>
          <h2>Want to work with me ?</h2>
          <br />
          <p>Always feel free to Contact & Hire me</p>
        </div>

        <div className="insta_btn_div">
          <a href="https://www.instagram.com/__honey_001?igsh=MTRxeGV4a2F5dWFrOA==" className="insta_btn">
            <FiInstagram /> Follow me on Instagram
          </a>
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Client thinking about me */}
      <h1 className="wik">Testmonial</h1>
      <div className="client_contnr">
        <div className="client_div">
          <p>
            "Exceptional MERN Stack developer! Delivered high-quality, scalable
            applications on time. Great communication and problem-solving
            skills. Highly recommended for any project."
          </p>
          <br />
          <h3>John</h3>
        </div>

        <div className="client_div">
          <p>
            "Outstanding MERN Stack developer! Consistently delivered top-notch,
            scalable applications ahead of schedule. Excellent problem-solving
            abilities and communication skills. Highly reliable and a pleasure
            to work with."
          </p>
          <br />
          <h3>Cheema</h3>
        </div>
      </div>

      <br />
      <br />

      {/* footer */}
      <hr/>
      <div className='footer_cntnr'>
      
        <p><IoMdMail />honeyaps12345@gmail.com</p>
        <p><MdLocationPin />Chandigarh, Punjab</p>
      </div>
     
    </>
  );
}
