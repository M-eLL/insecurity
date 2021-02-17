import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getEntries, createEntry } from "../../store/entries";
import "./form.css";

const EntryForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.session.user);
  // const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

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
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <div>
          <input
            className="input-area"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="TITLE YOUR ENTRY."
          />
          <p>
            A HELPFUL TITLE THAT WILL HELP YOU REMEMBER THIS ENTRY'S UNIQUE
            PASSPHRASE
          </p>
          <br />
          <br />
          <br />
          <textarea
            className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="WRITE ANYTHING YOU WANT. ONCE YOU SUBMIT YOUR ENTRY, NO ONE WILL BE ABLE TO 
        DECRYPT IT WITHOUT THE ENTRY'S UNIQUE PASSPHRASE."
          ></textarea>
          <br />
          <br />
          <br />
          <br />
          <br />
          <input
            className="input-area"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="CHOOSE A PASSPHRASE."
          ></input>
          <p>
            LOSING THIS PASSPHRASE MEANS THAT YOU PERMANENTLY LOSE ACCESS TO
            THIS ENTRY
          </p>
          <button className="blutton">submit</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
