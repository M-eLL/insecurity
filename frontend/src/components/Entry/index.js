import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOneEntry, deleteOneEntry } from "../../store/currentEntry";
import CryptoJS from "crypto-js";

const Entry = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");

  const { entryId } = useParams();

  const user = useSelector((state) => state.session.user);
  const entry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  // const decryptWithAES = (ciphertext) => {
  //   const passphrase = "persephone";
  //   const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  //   const originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   return originalText;
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   decryptWithAES();
  // };

  const deleteHandler = () => {
    dispatch(deleteOneEntry(entryId));
    history.push("/entries");
  };

  // how do i make the entry title change to the entry text just by clicking on it
  // want to try useEffect
  return (
    <div>
      {user && (
        <div>
          <h1>encrypted entry: </h1>
          {entry.text}
          {/* <form onSubmit={onSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            ></input>
            <button>decrypt message</button>
          </form> */}
          <div>
            <button onClick={deleteHandler}>delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
