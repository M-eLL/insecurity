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
      {Object.values(entries).map(
        (entry) =>
          entry.locked === false && (
            <Link key={entry.id} to={`/entries/${entry.id}`}>
              <div id="entries-list">
                <h1>{entry.title}</h1>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default Journal;
