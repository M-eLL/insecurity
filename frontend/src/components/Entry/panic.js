import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { lockEntry } from "../../store/entries";
import "./entrypage.css";

const Panic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(3);
  const [attempts, setAttempts] = useState(0);
  const [errorClass, setErrorClass] = useState("entry-page");

  const { entryId } = useParams();

  const user = useSelector((state) => state.session.user);
  const currEntry = useSelector((state) => state.currentEntry);

  const panicHandler = async () => {
    let res = await dispatch(
      sessionActions.validatePassword({
        credential: user.email,
        password,
      })
    );
    try {
      if (res.data.result === true) {
        dispatch(lockEntry(true));
        setError(3);
        setAttempts(0);
        history.push("/entries");
        setErrorClass("entry-page");
      } else {
        console.log("NO THAT'S WRONG");
      }
    } catch {
      console.log("NO THAT'S WRONG");
    }
  };

  return (
    <div>
      <label>
        Enter your login password
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        className="panic-button"
        value={currEntry.locked}
        onClick={() => {
          {
            panicHandler();
          }
        }}
      >
        <i className="fas fa-skull-crossbones"></i> PLEASE MAKE IT STOP
        <i className="fas fa-skull-crossbones"></i>
      </button>
    </div>
  );
};

export default Panic;
