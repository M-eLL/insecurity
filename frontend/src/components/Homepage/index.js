import "./homepage.css";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
// import picture from "./simp.jpg";

const Homepage = () => {
  const userId = useParams();
  const user = useSelector((state) => {
    return state.session.user;
  });

  return (
    <div>
      <div className="header">
        <h1 id="logo-font">IN.SECURITY</h1>
      </div>
      <div className="home-body">
        {!user && (
          <div>
            WELCOME TO (in)security
            <p>yo who r u</p>
            {/* <Link to={`/entries`}>Go to journal</Link> */}
          </div>
        )}
        {user && (
          <div>
            <p>
              Hey {user.username}! HEY STUPID IDDIOTTTTTTTT SPILL THE TEA BIHHH
            </p>
            <Link to={`/entries/new`}>new entry</Link>
            <Link to={`/entries`}>Go to journal</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
