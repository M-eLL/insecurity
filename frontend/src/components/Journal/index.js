import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../../store/entries";
import EntryForm from "../EntryForm";
import Entry from "../Entry";
import Vault from "../Vault";
import "./journal.css";

const Journal = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState("form");

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  // how do i make the entry title change to the entry text just by clicking on it
  // want to try useState
  return (
    <div className="entries-page">
      <div>
        {user && (
          <div>
            {/* <h1 style={{ textAlign: "center" }}>
              these are your entries by title: encrypted text
            </h1> */}
            {Object.values(entries).map((entry) => (
              <Link key={entry.id} to={`/entries/${entry.id}`}>
                <div id="entries-list">
                  <div>{entry.title}</div>
                </div>
              </Link>
            ))}
            <Link to={`/vault`}>
              <button style={{ textAlign: "center", color: "red" }}>
                VAULT
              </button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <div className="nav">
          <ul className="journal-component-options">
            <li className="journal-item" onClick={() => setComponent("form")}>
              form
            </li>
            <li
              className="journal-item"
              onClick={() => setComponent("single-entry")}
            >
              entry info
            </li>
          </ul>
        </div>
        <div className="container">
          {component === "form" && <EntryForm />}
          {component === "single-entry" && <Entry />}
        </div>
      </div>
    </div>
  );
};

export default Journal;
