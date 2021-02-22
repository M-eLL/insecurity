import React, { useContext } from "react";
import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import { ErrorClass } from "./components/Entry/index";

import App from "./App";

import configureStore from "./store";
import { restoreCSRF, fetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  const { errorClass } = useContext(ErrorClass);
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorClass value={{errorClass}}>
            <App />
          </ErrorClass>
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
