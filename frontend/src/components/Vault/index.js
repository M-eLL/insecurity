import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";
import "../Journal/journal.css";

const Vault = () => {
  const dispatch = useDispatch();

  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries(true));
  }, [dispatch]);

  return (
    <>
      {entries && (
        <div id="vault-container">
          <h1 style={{ textAlign: "center" }}>LOCKED SUPER SECRET ENTRIES</h1>
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

export default Vault;
