import "./nav.css";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  const [showMobileLinks, setShowMobileLinks] = useState(false);

  const handleLinkClick = () => {
    setShowMobileLinks(false);
  };

  const links = ["Home", "Add", "Thrive", "Insights"];

  return (
    <>
      <div className="navbar">
        <h1 className="logo" onClick={handleLinkClick}>Portfolio</h1>
        <ul className="links">
          {links.map((link, index) => (
            <li key={index} onClick={handleLinkClick} className="home">{link}</li>
          ))}
        </ul>
        <button className="menu_btn" onClick={() => setShowMobileLinks(!showMobileLinks)}>
          <BiMenu />
        </button>
      </div>

      {showMobileLinks && (
        <div className="mobile_navbar">
          <ul className="mobile_links">
            {links.map((link, index) => (
              <li key={index} onClick={handleLinkClick}>{link}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
