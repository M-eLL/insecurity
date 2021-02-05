import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntries, createEntry } from "../../store/entries";

const EntryForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  // const CryptoJS = require("crypto-js");
  // const AES = require("crypto-js/aes");

  // const decryptWithAES = (ciphertext) => {
  //   const passphrase = "persephone";
  //   const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  //   const originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   return originalText;
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      title,
      text,
      userId: user.id,
      // encryption_key,
    };
    console.log(newEntry);
    dispatch(createEntry(newEntry));
  };

  console.log(entries, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  return (
    <div>
      <h1>this is the entry form component</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="IS THIS WORKING"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="WRITE SOMETHING"
        ></textarea>
        <button>submit</button>
      </form>
    </div>
  );
};

// need to pull in prompts here

export default EntryForm;
