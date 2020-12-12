import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import Logo from "../../components/Logo/Logo";

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }) => {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={style.profile}>
      <div className="d-flex flex-column align-items-center mt-3">
        <Logo />
        <h1 style={{ color: "#404040" }}>DEvKoNg</h1>
        <h1>
          <a
            href="https://www.youtube.com/channel/UCqoMNUpqua88mEP7TRWRYuQ"
            style={{ color: "pink" }}
          >
            Youtube
          </a>
        </h1>
        <h1>
          <a href="https://github.com/WhaleKong" style={{ color: "pink" }}>
            Github
          </a>
        </h1>

        <div style={{ color: "white" }}>
          Current time: {new Date(time).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
