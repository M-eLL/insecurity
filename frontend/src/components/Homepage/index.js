import "./homepage.css";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import picture from "./brain.jpg";

const Homepage = () => {
  const userId = useParams();
  const user = useSelector((state) => {
    return state.session.user;
  });

  return (
    <div>
      <div id="header">
        <img src={picture} />
        <h1 id="logo-font">IN.SECURITY</h1>
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
