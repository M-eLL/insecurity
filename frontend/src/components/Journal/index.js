import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";
import "./journal.css";
import Entry from "../Entry";

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
          <div className="entry-container">
            <div>
              {Object.values(entries).map((entry) => (
                // <Link key={entry.id} to={`/entries/${entry.id}`}>
                <Link key={entry.id} to={`/entries/${entry.id}`}>
                  <div className="single-entry">
                    <h3>{entry.title}</h3>
                  </div>
                </Link>
                // </Link>
              ))}
            </div>
            <div className="entries">
              <Entry entry={entries} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
