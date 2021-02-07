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
        <h1 id="logo-head">IN.SECURITY</h1>
      </div>

      {!user && (
        <div>
          WELCOME TO (in)security
          <h1>yo who r u</h1>
          {/* <Link to={`/entries`}>Go to journal</Link> */}
        </div>
      )}
      {user && (
        <div>
          <h1>
            Hey {user.username}! HEY STUPID IDDIOTTTTTTTT SPILL THE TEA BIHHH
          </h1>
          <Link to={`/entries/new`}>new entry</Link>
          <Link to={`/entries`}>Go to journal</Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
