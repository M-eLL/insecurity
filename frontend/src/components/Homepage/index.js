import "./homepage.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useDencrypt } from "use-dencrypt-effect";
// import picture from "./simp.jpg";

const Homepage = () => {
  const userId = useParams();
  const { result, dencrypt } = useDencrypt();

  const user = useSelector((state) => {
    return state.session.user;
  });

  let values;
  if (!user) {
    values = ["WELCOME TO", "IN.SECURITY", "WHO R U"];
  }
  if (user) {
    values = [`welcome back`, `missed u`];
  }

  useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(values[i]);

      // if (i === values.length - 1) {
      //   i = 0;
      // } else {
      //   i = i + 1;
      // }

      i = i === values.length - 1 ? 0 : i + 1;
    }, 3500);

    return () => clearInterval(action);
  }, []);

  return (
    <div>
      <div id="header">
        {/* <h1 id="logo-font">IN.SECURITY</h1> */}
        <h1 id="logo-font">{result}</h1>
      </div>
      <div className="home-body">
        {!user && (
          <div>
            WELCOME TO in.security
            <p>yo who r u</p>
            {/* <Link to={`/entries`}>Go to journal</Link> */}
          </div>
        )}
        {user && (
          <div>
            <h2>Welcome back, {user.username}.</h2>
            <Link to={`/entries/new`}>
              <button className="button">new entry</button>
            </Link>
            <Link to={`/entries`}>
              <button className="button">view entries</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
