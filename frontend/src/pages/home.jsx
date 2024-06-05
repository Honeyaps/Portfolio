import Navbar from "../components/nav";
import "./page.css";

export default function Home() {
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
          <img src="IMG_20221210_234743.jpg" className="img"></img>
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

      <br/><br/><br/><br/>

      {/* LANGUAGES */}
     
      <h1 className="wik">What I Know?</h1>
      <div className="lang_div_contnr">
        
        <div className="frontend">
          <h2 className="lang_head">Frontend</h2>
          <br/>
          <span>HTML</span>
          <span>CSS</span> <br/><br/>
          <span>Tailwind</span>
          <span>Javascript</span> <br/><br/>
          <span>React js</span>
        </div>

        <div className="backend">
          <h2 className="lang_head">Backend</h2>
          <br/>
          <span>Node.js</span>
          <span>Express</span> <br/><br/>
        </div>

        <div className="database">
          <h2 className="lang_head">Database</h2>
          <br/>
          <span>MongoDB</span>
          <span>Firebase</span><br/><br/>
          <span>MongoDB Atlas</span>
        </div>
      </div>

      <br/><br/>
    </>
  );
}
