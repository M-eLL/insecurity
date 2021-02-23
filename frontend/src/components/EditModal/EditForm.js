import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneEntry,
  deleteOneEntry,
  editOneEntry,
} from "../../store/currentEntry";

const EditForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entryId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const currEntry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    setText(currEntry.text);
  }, [currEntry]);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  const editHandler = () => {
    dispatch(editOneEntry(entryId, title));
    history.push("/entries");
  };

  const deleteHandler = () => {
    dispatch(deleteOneEntry(entryId));
    history.push("/entries");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={currEntry.title}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={currEntry.text}
      />
      <button id="edit-input" onClick={editHandler}>
        edit
      </button>
      <button style={{ color: "red" }} onClick={deleteHandler}>
        PERMANENTLY DELETE ENTRY?
      </button>
    </div>
  );
};

export default EditForm;
