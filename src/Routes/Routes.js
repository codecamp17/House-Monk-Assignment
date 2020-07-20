import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home  from "../Components/Home";
import GitUser from "../Components/Repo";


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route  path="/:id" component={GitUser}/>
      </Switch>
    </Router>
  );
};
export default Routes;