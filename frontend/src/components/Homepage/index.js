import "./homepage.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import LoginForm from "../LoginFormModal/LoginForm";
import { useDencrypt } from "use-dencrypt-effect";

import { Modal } from "../../context/Modal";

const Homepage = () => {
  const userId = useParams();
  const { result, dencrypt } = useDencrypt();

  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => {
    return state.session.user;
  });

  let values;
  if (!user) {
    values = ["IN.SECURITY", "ENCRYPTION", "PROTECTED", "JOURNALING"];
  }
  if (user) {
    values = [`WELCOME BACK`, `${user.username}`];
  }

  useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(values[i]);

      // if (i === values.length - 1) {
      //   i = 0;
      // } else {
      //   i = i + 1;
      // }

      i = i === values.length - 1 ? 0 : i + 1;
    }, 3000);

    return () => clearInterval(action);
  }, []);

  return (
    <div>
      <>
        <div className="home-body">
          {!user && (
            <>
              <div id="header">
                <h1 id="logo-font">{result}</h1>
              </div>
              <h1>PLEASE LOG IN OR SIGN UP</h1>
              <Link>
                <button className="button" onClick={() => setShowModal(true)}>
                  Log In
                </button>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                  </Modal>
                )}
              </Link>
              <Link to={`/signup`}>
                <button className="button">SIGN UP</button>
              </Link>
            </>
          )}
          {user && (
            <div>
              <div id="header">
                <h1 id="logo-font">{result}</h1>
              </div>
              <Link to={`/entries/new`}>
                <button className="button">new entry</button>
              </Link>
              <Link to={`/entries`}>
                <button className="button">view entries</button>
              </Link>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Homepage;
