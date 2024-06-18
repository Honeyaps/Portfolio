import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { IoMdMail } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import Navbar from '../components/nav';
import './page.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

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

      <br/>  

      {/* ABOUT SECTION */}
      <div className="about_sec">
        <div className="img_div"  data-aos="fade-right">
          <img src="mypic.jpg" className="img" alt="Hemant Singh" />
        </div>
        <div className="about" data-aos="fade-left">
          <h1 className="h1_abt">ABOUT ME</h1>
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
      <br />
      <br />

      {/* what i know */}

      <h1 className="wik" >TECH STACK</h1>
      <br/><br/><br/>
      <div className='tech_div' data-aos="zoom-in">
        <div>
          <img src="icons (1).svg" className='icons' />
        </div>
        <div>
          <img src="icons (2).svg" className='icons' />
        </div>
        <div>
          <img src="icons.svg" className='icons' />
        </div>
        <div>
          <img src="icons1.svg" className='icons' />
        </div>
        <div>
          <img src="icons2.svg" className='icons' />
        </div>
        <div>
          <img src="icons3.svg" className='icons' />
        </div>
      </div>
      <br/><br/><br/>
      {/* languages */}
      <h1 className="wik" >WHAT I KNOW?</h1>
      <div className="lang_div_contnr" >
        <div className="frontend" data-aos="flip-left">
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

        <div className="backend" data-aos="flip-left">
          <h2 className="lang_head">Backend</h2>
          <br />
          <span>Node.js</span>
          <span>Express</span> <br />
          <br />
        </div>

        <div className="database"  data-aos="flip-left">
          <h2 className="lang_head">Database</h2>
          <br />
          <span>MongoDB</span>
          <span>Firebase</span>
          <br />
          <br />
          <span>MongoDB Atlas</span>
        </div>

        <div className="projects" data-aos="flip-left">
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
        <div data-aos="fade-right">
          <h2>Want to work with me ?</h2>
          <br />
          <p>Always feel free to Contact & Hire me</p>
        </div>

        <div className="insta_btn_div" data-aos="fade-left">
          <a href="https://www.instagram.com/__honey_001?igsh=MTRxeGV4a2F5dWFrOA==" className="insta_btn">
            <FiInstagram /> Follow me on Instagram
          </a>
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Client thinking about me */}
      <h1 className="wik" >Testmonial</h1>
      <div className="client_contnr">
        <div className="client_div" data-aos="fade-up-right">
          <p>
            "Exceptional MERN Stack developer! Delivered high-quality, scalable
            applications on time. Great communication and problem-solving
            skills. Highly recommended for any project."
          </p>
          <br />
          <h3>John</h3>
        </div>

        <div className="client_div" data-aos="fade-up-left">
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
