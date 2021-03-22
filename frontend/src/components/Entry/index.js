import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOneEntry } from "../../store/currentEntry";
import { lockEntry } from "../../store/entries";
import * as sessionActions from "../../store/session";
import CryptoJS from "crypto-js";
import "./entrypage.css";
import Panic from "./panic";
import Hidden from "../Vault/hidden";
import Navigation from "../Navigation";
import EditForm from "../EditModal/EditForm";
import { Modal } from "../../context/Modal";

const Entry = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entryId } = useParams();

  const [passphrase, setPassphrase] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(3);
  const [errorClass, setErrorClass] = useState("entry-page");
  const [attempts, setAttempts] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const currEntry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    setText(currEntry.text);
  }, [currEntry]);

  useEffect(() => {
    dispatch(getOneEntry(entryId));
  }, [entryId, dispatch]);

  // after a certain number of attempts trigger "panic"
  useEffect(() => {
    if (attempts >= 3) {
      setErrorClass("error");
      dispatch(lockEntry(entryId));
      // history.push(`/entries/${currEntry.id}`);
    }
  }, [attempts, dispatch]);

  const decryptWithAES = () => {
    const bytes = CryptoJS.AES.decrypt(currEntry.text, passphrase);
    let originalText;
    try {
      originalText = bytes.toString(CryptoJS.enc.Utf8);
      let wordCount = originalText.split("").length;
      setTimeout(function () {
        setText(currEntry.text);
      }, wordCount * 50);
      // ORIGINAL TEXT SHOWS UP AS EMPTY STRING IF PASSCODE IS WRONG
      if (originalText === "") {
        setAttempts(attempts + 1);
        setError(error - 1);
      } else {
        setAttempts(0);
        setError(3);
        setErrorClass("entry-page");
      }
      return originalText;
    } catch (e) {
      // UTF8 ERROR HANDLING
      setAttempts(attempts + 1);
      setError(error - 1);
    }
  };

  return (
    <div className={errorClass}>
      {errorClass !== "error" ? (
        <div>
          {currEntry.locked === false ? (
            <div>
              <Navigation isLoaded={isLoaded} />
              <div className={errorClass}>
                <h1>{currEntry.title}</h1>
                <div className="entry-text">{text}</div>
                <div>
                  <input
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="passphrase"
                  ></input>
                  <p className={errorClass} style={{ color: "red" }}>
                    {error} attempts left
                  </p>
                  <br />
                  <button
                    className="decrypt-button"
                    onClick={() => {
                      const decryptedText = decryptWithAES();
                      setText(decryptedText);
                      !!decryptedText && setShowEdit(true);
                    }}
                  >
                    decrypt message
                  </button>
                  {showEdit && (
                    <div>
                      <button onClick={() => setShowModal(true)}>
                        EDIT ENTRY
                      </button>
                      {showModal && (
                        <Modal
                          onClose={() => {
                            setShowModal(false);
                            setShowEdit(false);
                          }}
                        >
                          <EditForm
                            passphrase={passphrase}
                            setShowEdit={setShowEdit}
                            setShowModal={setShowModal}
                          />
                        </Modal>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Hidden />
          )}
        </div>
      ) : (
        <Panic />
      )}
    </div>
  );
};

export default Entry;
