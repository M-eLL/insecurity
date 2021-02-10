import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getEntries, createEntry } from "../../store/entries";
import CryptoJS from "crypto-js";
import "./form.css";

const EntryForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  const decryptWithAES = (ciphertext) => {
    const passphrase = "persephone";
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      title,
      text,
      userId: user.id,
      encryption_key: password,
    };
    console.log(newEntry);
    dispatch(createEntry(newEntry));

    history.push("/entries");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>this is the entry form component</h1>
      <form onSubmit={onSubmit}>
        <div>
          Title:{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <br />
          <br />
          <textarea
            className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="WRITE SOMETHING"
          ></textarea>
          <br />
          <br />
          passphrase:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          ></input>
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
