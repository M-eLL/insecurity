import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneEntry,
  deleteOneEntry,
  editOneEntry,
} from "../../store/currentEntry";
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
  const [error, setError] = useState("");
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
      }, wordCount * 75);
      // ORIGINAL TEXT SHOWS UP AS EMPTY STRING IF PASSCODE IS WRONG
      if (originalText === "") {
        setAttempts(attempts + 1);
        console.log(attempts);
        setError("wrong password");
      } else {
        setAttempts(0);
        setErrorClass("entry-page");
      }
      return originalText;
    } catch (e) {
      // UTF8 ERROR HANDLING
      setAttempts(attempts + 1);
      console.log(attempts);
      setError("wrong password");
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
        setAttempts(0);
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
              Password
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
            </button>
          </div>
        )}
        {lock === true && (
          <div className={errorClass}>
            <h1>{currEntry.title}</h1>
            <div className="entry-text">{text}</div>
            <br />
            <div>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="passphrase"
              ></input>
              <button
                onClick={() => {
                  const decryptedText = decryptWithAES();
                  setText(decryptedText);
                }}
              >
                decrypt message
              </button>
              <br />
              <div className={errorClass}>{error}</div>
              <br />
              <br />
              <label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="TITLE"
                />
                <button onClick={editHandler}>edit</button>
                <br />
                <br />
                <br />
                delete entry?
                <br />
                <button style={{ color: "red" }} onClick={deleteHandler}>
                  delete
                </button>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entry;
