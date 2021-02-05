import "./homepage.css";
import { getEntries } from "../../store/entries";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const user = useSelector((state) => {
    return state.session.user;
  });

  // const entry = useSelector((state) => {
  //   // return state.entries[1];
  //   return state.entries;
  // });
  // console.log(entry);

  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries(1));
  }, [dispatch]);

  return (
    <div>
      {!user && <h1>yo who r u</h1>}
      <div>
        {user && (
          <div>
            <h1>
              Hey {user.username}! HEY STUPID IDDIOTTTTTTTT SPILL THE TEA BIHHH
            </h1>
            <h2>
              these are your entries by title:
              {Object.values(entries).map((entry) => (
                <ul>{entry.title}</ul>
              ))}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
