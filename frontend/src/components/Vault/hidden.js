import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { deleteOneEntry } from "../../store/currentEntry";
import { lockEntry } from "../../store/entries";
import "../Entry/entrypage.css";
// import Navigation from "../Navigation";

const Hidden = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entryId } = useParams();

  const [error, setError] = useState(3);
  const [errorClass, setErrorClass] = useState("entry-page");
  const [attempts, setAttempts] = useState(0);
  const [password, setPassword] = useState("");

  const currEntry = useSelector((state) => state.currentEntry);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (attempts >= 3) {
      setErrorClass("error");
      dispatch(deleteOneEntry(entryId));
      history.push(`/vault`);
    }
  }, [attempts, dispatch]);

  const panicHandler = async () => {
    let res = await dispatch(
      sessionActions.validatePassword({
        credential: user.email,
        password,
      })
    );
    try {
      if (res.data.result === true) {
        dispatch(lockEntry(entryId));
        setError(3);
        setAttempts(0);
        history.push(`/entries`);
        setErrorClass("entry-page");
      } else {
        setAttempts(attempts + 1);
        setError(error - 1);
      }
    } catch {
      setAttempts(attempts + 1);
      setError(error - 1);
    }
  };

  return (
    <div className="hidden-entry" style={{ marginTop: "6em" }}>
      <h1 style={{ borderBottom: "1px solid gray", margin: "2em" }}>
        {currEntry.title}
      </h1>
      <div>
        <label>
          <div>Enter login password</div>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className={errorClass} style={{ color: "red", fontSize: "small" }}>
          PERMANENT DELETION IN {error}...
        </div>
        <div style={{ paddingTop: "2em" }}>
          <button
            className="hidden-entry"
            value={currEntry.locked}
            onClick={() => {
              {
                panicHandler();
              }
            }}
          >
            Restore entry {"  "}
            <i className="fas fa-undo"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hidden;
