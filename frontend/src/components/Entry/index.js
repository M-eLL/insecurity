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

  const user = useSelector((state) => state.session.user);
  const currEntry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    setText(currEntry.text);
  }, [currEntry]);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  const decryptWithAES = () => {
    const bytes = CryptoJS.AES.decrypt(currEntry.text, passphrase);
    console.log(bytes);
    let originalText = "NOPE";
    try {
      originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText.split(" ").length > 5) {
        return "more than 5 words";
      }
      if (originalText.split(" ").length === 3) {
        return "this is cool";
      }
      return originalText;
    } catch {
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
    <div className="entry-page">
      {user && (
        <div>
          <h1>{currEntry.title}: </h1>
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
              {/* <br />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="TEXT"
              />
              <button onClick={editHandler}>edit</button> */}
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
    </div>
  );
};

export default Entry;
