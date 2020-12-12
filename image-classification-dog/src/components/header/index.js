import { useEffect, useState } from "preact/hooks";
import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style.css";

const Header = () => {
  const [chooseClassName, setChosseClassName] = useState(false);
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style={{ zIndex: 50, backgroundColor: "#673ab7" }}
    >
      <h1 className={style.h1}> What dog breed does your friend look like?</h1>

      <button
        class="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setChosseClassName(!chooseClassName)}
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        className={
          chooseClassName
            ? "collapse navbar-collapse justify-content-end show"
            : "collapse navbar-collapse justify-content-end"
        }
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item active mr-3">
            <Link href="/" activeClassName={style.active}>
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link activeClassName={style.active} href="/profile">
              Me
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
