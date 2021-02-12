import React from "react";
import "./Footer.css";

const Footer = () => {
     
  return (
    <footer class="bg-light text-center text-lg-start">
     <div className="my_page_links">
        ©<p> Bryant Klein</p>
          <p>
          <a href="https://github.com/Bryant16">
            <i className="fab fa-github" />
          </a>
          </p>
          <p>
          <a href="https://www.linkedin.com/in/bryant-klein-927915134/">
            <i className="fab fa-linkedin-in" />
          </a>
          </p>
          <p>
          <a href='mailto:kleinb1616@gmail.com'>
              <i className='far fa-envelope' />
            </a>
          </p>
        </div>
    </footer>
  );
};

export default Footer;
