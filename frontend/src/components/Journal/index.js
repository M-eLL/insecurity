import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";
import "./journal.css";

const Journal = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  return (
    <div>
      {user && (
        <div>
          <h1 style={{ textAlign: "center" }}>
            these are your entries by title
          </h1>
          {Object.values(entries).map((entry) => (
            <Link key={entry.id} to={`/entries/${entry.id}`}>
              <div id="entries-list">
                <div>{entry.title}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
