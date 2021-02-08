import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries, createEntry } from "../../store/entries";
import "./journal.css";

const Journal = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  // how do i make the entry title change to the entry text just by clicking on it
  // want to try useEffect
  return (
    <div>
      {user && (
        <div>
          <h1 style={{ textAlign: "center", color: "white" }}>
            these are your entries by title: encrypted text
          </h1>
          {Object.values(entries).map((entry) => (
            <Link key={entry.id} to={`/entries/${entry.id}`}>
              <div id="entries-list">
                <h3>{entry.title}:</h3>
                <p>"{entry.text}"</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
