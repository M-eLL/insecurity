import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneEntry,
  deleteOneEntry,
  editOneEntry,
} from "../../store/currentEntry";
import { lockEntry } from "../../store/entries";
import * as sessionActions from "../../store/session";
import CryptoJS from "crypto-js";
import "./entrypage.css";

const Entry = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entryId } = useParams();

  const [passphrase, setPassphrase] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(3);
  const [errorClass, setErrorClass] = useState("entry-page");
  const [attempts, setAttempts] = useState(0);
  const [password, setPassword] = useState("");
  const [lock, setLock] = useState(true);

  const user = useSelector((state) => state.session.user);
  const currEntry = useSelector((state) => state.currentEntry);
  // const [lock, setLock] = useState(currEntry.locked);

  useEffect(() => {
    setText(currEntry.text);
  }, [currEntry]);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  // after a certain number of attempts trigger "panic"
  useEffect(() => {
    if (attempts >= 3) {
      console.log("LOCKING");
      setErrorClass("error");
      setLock(false);
      dispatch(lockEntry(entryId));
      history.push(`/entries/${currEntry.id}`);
    }
  }, [attempts]);

  const decryptWithAES = () => {
    const bytes = CryptoJS.AES.decrypt(currEntry.text, passphrase);
    let originalText;
    try {
      originalText = bytes.toString(CryptoJS.enc.Utf8);
      let wordCount = originalText.split("").length;
      setTimeout(function () {
        setText(currEntry.text);
      }, wordCount * 50);
      // ORIGINAL TEXT SHOWS UP AS EMPTY STRING IF PASSCODE IS WRONG
      if (originalText === "") {
        setAttempts(attempts + 1);
        console.log(attempts);
        setError(error - 1);
      } else {
        setAttempts(0);
        setError(3);
        setErrorClass("entry-page");
      }
      return originalText;
    } catch (e) {
      // UTF8 ERROR HANDLING
      setAttempts(attempts + 1);
      console.log(attempts);
      setError(error - 1);
    }
  };

  const editHandler = () => {
    dispatch(editOneEntry(entryId, title));
    history.push("/entries");
  };

  const deleteHandler = () => {
    dispatch(deleteOneEntry(entryId));
    history.push("/entries");
  };

  const panicHandler = async () => {
    let res = await dispatch(
      sessionActions.validatePassword({
        credential: user.email,
        password,
      })
    );
    console.log("!!!!!!!!!!!", res.data.result);
    try {
      if (res.data.result === true) {
        setLock(true);
        setError(3);
        setAttempts(0);
        history.push("/entries");
        setErrorClass("entry-page");
        console.log("UNLOCKING");
      } else {
        console.log("NO THAT'S WRONG");
      }
    } catch {
      console.log("NO THAT'S WRONG");
    }
  };

  return (
    <div className={errorClass}>
      <div>
        {lock === false && (
          <div>
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
            <br />
            <button
              className="panic-button"
              value={lock}
              onClick={() => {
                {
                  panicHandler();
                }
              }}
            >
              <i className="fas fa-skull-crossbones"></i> PLEASE MAKE IT STOP
              <i className="fas fa-skull-crossbones"></i>
            </button>
          </div>
        )}
        {lock === true && (
          <div className={errorClass}>
            <br />
            <h1>{currEntry.title}</h1>
            <br />
            <div className="entry-text">{text}</div>
            <br />
            <br />
            <br />
            <div>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="passphrase"
              ></input>
              <br />
              <button
                className="yellutton"
                onClick={() => {
                  const decryptedText = decryptWithAES();
                  setText(decryptedText);
                }}
              >
                decrypt message
              </button>
              <br />
              <div className={errorClass}>{error} attempts left</div>
              <br />
              <br />
              <br />
              <br />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="EDIT TITLE?"
              />
              <button id="edit-input" onClick={editHandler}>
                edit
              </button>
              <br />
              <br />
              <br />
              <button style={{ color: "red" }} onClick={deleteHandler}>
                PERMANENTLY DELETE ENTRY?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entry;
