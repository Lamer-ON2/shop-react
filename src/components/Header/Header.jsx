import { NavLink } from "react-router-dom";

import "./header.scss";

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="top-header">
          <nav className="header-nav">
            <ul className="menu-list">
              <li>
                <NavLink to={"/"}>Main</NavLink>
              </li>
              <li>
                <NavLink to={"about"}>About</NavLink>
              </li>
              <li>
                <NavLink to={"registration"}>Registration</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
