import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";
import "./journal.css";

const Journal = () => {
  const dispatch = useDispatch();

  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries(false));
  }, [dispatch]);

  return (
    <>
      {entries && (
        <div id="journal-container">
          <h1 style={{ textAlign: "center" }}>UNLOCKED ENTRIES</h1>
          {Object.values(entries).map((entry) => (
            <Link id="entries-list" key={entry.id} to={`/entries/${entry.id}`}>
              <div id="single-entry">
                <p id="journal-entries">{entry.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Journal;
