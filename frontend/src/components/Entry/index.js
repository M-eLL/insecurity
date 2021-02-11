import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneEntry,
  deleteOneEntry,
  editOneEntry,
} from "../../store/currentEntry";
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

  const user = useSelector((state) => state.session.user);
  const currEntry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    setText(currEntry.text);
  }, [currEntry]);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  // after a certain number of attempts trigger "delete"
  useEffect(() => {
    if (attempts >= 3) {
      dispatch(deleteOneEntry(entryId));
      history.push("/entries");
    }
  }, [attempts]);

  const decryptWithAES = () => {
    const bytes = CryptoJS.AES.decrypt(currEntry.text, passphrase);
    let originalText = "NOPE";
    try {
      originalText = bytes.toString(CryptoJS.enc.Utf8);
      let wordCount = originalText.split("").length;
      setTimeout(function () {
        setText(currEntry.text);
      }, wordCount * 50);
      // ORIGINAL TEXT SHOWS UP AS EMPTY STRING IS PASSCODE IS WRONG
      if (originalText == "") {
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
      setError("THIS IS A UTF8 ERROR");
      // SET THIS AS A CLASS TO ALTER VISUAL EFFECTS OF AN ERROR
      setErrorClass("error");
      return originalText;
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

  return (
    <div className={errorClass}>
      {user && (
        <div>
          <h1>{currEntry.title} </h1>
          <div style={{}}>
            <br />
            {text} <br />
          </div>
          <br />
          show msg?
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
              change things <br />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="TITLE"
              />
              <button onClick={editHandler}>edit</button>
              <br />
              <br />
              <br />
              deletee entry?
              <br />
              <button style={{ color: "red" }} onClick={deleteHandler}>
                delete
              </button>
            </label>
          </div>
        </div>
      )}
      {/* {error && (
        <div className="error">
          <h1>NO NO NO</h1>
        </div>
      )} */}
    </div>
  );
};

export default Entry;
