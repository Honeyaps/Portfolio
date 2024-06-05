import { useState } from "react";
import { CgMenuLeftAlt, CgMenuRightAlt } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import "./nav.css";

export default function Navbar() {
  const [showMobileLinks, setShowMobileLinks] = useState(false);

  const handleLinkClick = () => {
    setShowMobileLinks(false);
  };

  return (
    <>
      <div className="navbar">
        <h1 className="logo" onClick={handleLinkClick}>
          <GoDotFill />
          <GoDotFill />
        </h1>

        <button
          className="menu_btn"
          onClick={() => setShowMobileLinks(!showMobileLinks)}
        >
          {showMobileLinks ? <CgMenuLeftAlt /> : <CgMenuRightAlt />}
        </button>
      </div>

      {showMobileLinks && (
        <div className="mobile_navbar">
          <ul className="mobile_links">
            <li onClick={handleLinkClick}>Home</li>
            <li onClick={handleLinkClick}>About</li>
          </ul>
        </div>
      )}
    </>
  );
}
