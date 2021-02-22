import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <Homepage />
            <Footer />
          </Route>
          <Route exact path="/entries">
            <Navigation isLoaded={isLoaded} />
            <Journal />
          </Route>
          <Route exact path="/vault">
            <Navigation isLoaded={isLoaded} />
            <Vault />
          </Route>
          <Route exact path="/entries/new">
            <Navigation isLoaded={isLoaded} />
            <EntryForm />
          </Route>
          <Route exact path="/entries/:entryId">
            <Entry />
          </Route>
          <Route path="/signup">
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
