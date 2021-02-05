import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntries, createEntry } from "../../store/entries";
import EntryForm from "../EntryForm";

const Journal = () => {
//   const CryptoJS = require("crypto-js");
//   const AES = require("crypto-js/aes");

//   const decryptWithAES = (ciphertext) => {
//     const passphrase = "persephone";
//     const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
//     const originalText = bytes.toString(CryptoJS.enc.Utf8);
//     return originalText;
//   };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const entries = useSelector((state) => state.entries);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  // how do i make the entry title change to the entry text just by clicking on it
  // want to try useEffect
  return (
    <div>
      {user && (
        <div>
          <div id="entries-list">
            <div>these are your entries by title:</div>
            {Object.values(entries).map((entry) => (
              <Link key={entry.id} to={`/entries/${entry.id}`}>
                {entry.title}
              </Link>
              //   need to figure this out on app.js
            ))}
          </div>
          <EntryForm entries={entries} />
        </div>
      )}
    </div>
  );
};

export default Journal;