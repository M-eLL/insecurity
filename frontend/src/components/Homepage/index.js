import "./homepage.css";
import { getEntries } from "../../store/entries";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Homepage = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => {
    return state.session.user;
  });

  const entries = useSelector((state) => {
    return state.entries;
  });
  console.log(entries);

  useEffect(() => {
    dispatch(getEntries(1));
  }, [dispatch]);

  return (
    <div>
      {!loggedInUser && <h1>yo who r u</h1>}
      <div>
        {loggedInUser && (
          <div>
            <h1>
              Hey {loggedInUser.username}! HEY STUPID IDDIOTTTTTTTT SPILL THE
              TEA BIHHH 🤡
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
