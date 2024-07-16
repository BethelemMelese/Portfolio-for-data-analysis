import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <div className="nav-log">
        <h2>
          <b>Ablene Melese</b> / DATA SCIENTISTS
        </h2>
      </div>
      <ul className="nav-item-menu">
        <li>
          <a href="/">ABOUT ME</a>
          {/* <Link to="/">ABOUT ME</Link> */}
        </li>
        <li>
          <a href="blog">BLOG</a>
        </li>
        <li>
          <a href="project">PROJECT</a>
        </li>
        <li>
          <a href="contactMe">CONTACT</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
