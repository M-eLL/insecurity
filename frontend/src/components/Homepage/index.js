import "./homepage.css";
import { useSelector, useDispatch } from "react-redux";

const Homepage = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => {
    return state.session.user;
  });

  return (
    <div>
      {!loggedInUser && <h1>I am a logged OUT user</h1>}
      {loggedInUser && <h1>I am a logged IN user</h1>}
    </div>
  );
};

export default Homepage;
