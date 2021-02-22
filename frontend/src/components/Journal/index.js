import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getEntries } from "../../store/entries";
import "./journal.css";

const Journal = () => {
  const dispatch = useDispatch();

  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries(false));
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>these are your entries by title</h1>

      {Object.values(entries).map((entry) => (
        <NavLink key={entry.id} to={`/entries/${entry.id}`}>
          <div id="entries-list" aria-hidden="true">
            <div id="single-entry" aria-hidden="true">
              <a>{entry.title}</a>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Journal;
