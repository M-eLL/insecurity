import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ErrorClass } from "./components/Entry/index";
import SignupFormPage from "./components/SignupFormPage";
import Homepage from "./components/Homepage";
import Journal from "./components/Journal";
import EntryForm from "./components/EntryForm";
import Entry from "./components/Entry";
import Footer from "./components/Footer";
import Vault from "./components/Vault";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const { errorClass } = useContext(ErrorClass);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {errorClass !== "error" && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
            <Footer />
          </Route>
          <Route exact path="/entries">
            <Journal />
          </Route>
          <Route exact path="/vault">
            <Vault />
          </Route>
          <Route exact path="/entries/new">
            <EntryForm />
          </Route>
          <Route exact path="/entries/:entryId">
            <Entry />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
