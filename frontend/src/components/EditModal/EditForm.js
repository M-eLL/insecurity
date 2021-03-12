import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOneEntry, editOneEntry } from "../../store/currentEntry";
import { deleteOneEntry } from "../../store/entries";
import CryptoJS from "crypto-js";
import "./edit.css";

const EditForm = ({ setShowEdit, setShowModal, passphrase }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entryId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const currEntry = useSelector((state) => state.currentEntry);
  useEffect(() => {
    let decryptedText = CryptoJS.AES.decrypt(currEntry.text, passphrase);
    setTitle(currEntry.title);
    setText(decryptedText.toString(CryptoJS.enc.Utf8));
  }, [currEntry]);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  const editHandler = () => {
    let encryptedText = CryptoJS.AES.encrypt(text, passphrase).toString();

    dispatch(editOneEntry(entryId, title, encryptedText));
    setShowEdit(false);
    setShowModal(false);
    history.push("/entries");
  };

  const deleteHandler = () => {
    dispatch(deleteOneEntry(entryId));
    history.push("/entries");
  };

  return (
    <div className="edit-wrapper">
      <div className="edit-content">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={currEntry.title}
        />
      </div>
      <div>
        <textarea
          className="edit-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={currEntry.text}
        />
      </div>
      <div>
        <button className="edit-button" onClick={editHandler}>
          EDIT
        </button>
      </div>
      <div>
        <button className="delete-button" onClick={deleteHandler}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default EditForm;
