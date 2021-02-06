import "./homepage.css";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ice from "./ice.jpg";

const Homepage = () => {
  const userId = useParams();
  const user = useSelector((state) => {
    return state.session.user;
  });

  return (
    <div>
      <div id="home-page-container">
        <img id="welcome-picture" src={ice} />
        <div id="home-page-overlay">
          <h1>IN.SECURITY</h1>
        </div>
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
        </div>
      )}
    </div>
  );
};

export default Homepage;
