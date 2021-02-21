import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {
  // getOneEntry,
  deleteOneEntry,
  // editOneEntry,
} from "../../store/currentEntry";
import { lockEntry } from "../../store/entries";
// import CryptoJS from "crypto-js";

const Hidden = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entryId } = useParams();

  // const [passphrase, setPassphrase] = useState("");
  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
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
    <div>
      {/* <h1>single hidden entry component</h1> */}
      <div>
        <h1>{currEntry.title}</h1>
        <label>
          Enter your login password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="panic-button"
          value={currEntry.locked}
          onClick={() => {
            {
              panicHandler();
            }
          }}
        >
          <i className="fas fa-skull-crossbones"></i> Restore entry
          <i className="fas fa-skull-crossbones"></i>
        </button>
        <div className={errorClass}>
          {error} attempts left before permanent deletion of entry
        </div>
      </div>
    </div>
  );
};

export default Hidden;
