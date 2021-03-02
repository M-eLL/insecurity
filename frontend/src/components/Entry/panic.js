import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import { lockEntry } from "../../store/entries";
import "./entrypage.css";

const Panic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(3);
  const [attempts, setAttempts] = useState(0);
  const [errorClass, setErrorClass] = useState("entry-page");

  // const { entryId } = useParams();

  const user = useSelector((state) => state.session.user);
  const currEntry = useSelector((state) => state.currentEntry);

  useEffect(() => {
    if (attempts >= 3) {
      dispatch(sessionActions.logout());
      setErrorClass("entry-page");
      history.push("/");
      window.location.reload();
    }
  }, [attempts, dispatch]);

  const panicHandler = async () => {
    let res = await dispatch(
      sessionActions.validatePassword({
        credential: user.email,
        password,
      })
    );
    try {
      if (res.data.result === true) {
        setError(3);
        setAttempts(0);
        history.push("/vault");
        setErrorClass("entry-page");
      } else {
        setAttempts(attempts + 1);
        setError(error - 1);
      }
    } catch {
      setAttempts(attempts + 1);
      setError(error - 1);
    }
  };

  return (
    <div className="panic-input">
      <label>
        <h1 style={{ borderBottom: "1px solid red", color: "red" }}>
          Enter your login password
        </h1>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className={errorClass} style={{ color: "red", fontSize: "small" }}>
        {error} attempts left before ending session
      </div>
      <div style={{ paddingTop: "2em" }}>
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
    </div>
  );
};

export default Panic;
