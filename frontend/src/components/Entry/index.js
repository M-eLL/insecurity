import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOneEntry, deleteOneEntry } from "../../store/currentEntry";
import CryptoJS from "crypto-js";

const Entry = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const { entryId } = useParams();

  const user = useSelector((state) => state.session.user);
  const entry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  const decryptWithAES = () => {
    const bytes = CryptoJS.AES.decrypt(entry.text, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
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
          {entry.title} <br />
          {entry.text}
          <form>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="passphrase"
            ></input>
            <button onClick={decryptWithAES}>decrypt message</button>
          </form>
          <div>
            <button onClick={deleteHandler}>delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
