import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneEntry,
  deleteOneEntry,
  editOneEntry,
} from "../../store/currentEntry";
import CryptoJS from "crypto-js";

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
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const editHandler = () => {
    dispatch(editOneEntry(entryId));
    history.push("/entries");
  };

  const deleteHandler = () => {
    dispatch(deleteOneEntry(entryId));
    history.push("/entries");
  };

  return (
    <div>
      {user && (
        <div>
          <h1>encrypted entry: </h1>
          <div style={{}}>
            {currEntry.title} <br />
            {text} <br />
          </div>
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
              onClick={() => {
                const decryptedText = decryptWithAES();
                setText(decryptedText);
              }}
            >
              decrypt message
            </button>
            <button onClick={deleteHandler}>delete</button>
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
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="TEXT"
              />
              <button onClick={editHandler}>edit</button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
