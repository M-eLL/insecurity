import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getEntries } from "../../store/entries";
import "../Journal/journal.css";

const Vault = () => {
  const dispatch = useDispatch();

  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries(true));
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>LOCKED SUPER SECRET ENTRIES</h1>
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

export default Vault;
