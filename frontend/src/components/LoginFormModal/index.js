import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
      <button
        onClick={() => {
          dispatch(
            sessionActions.login({
              credential: "Demo-lition",
              password: "password",
            })
          )
            .then((res) => history.pushState("/"))
            .catch((res) => {
              if (res.data && res.data.errors) setErrors(res.data.errors);
            });
        }}
      >
        Demo User
      </button>
    </>
  );
}

export default LoginFormModal;
