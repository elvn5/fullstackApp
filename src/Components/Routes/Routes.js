import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Admin from "../Admin/Admin";
import Auth from "../Auth/Auth";
import Client from "../Client/Client";

const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/admin" exact>
          <Admin />
        </Route>
        <Redirect to="/admin" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Client />
      </Route>  
      <Route path="/auth" exact>
        <Auth />
      </Route> 
      <Redirect to="/" />
    </Switch>
  );
};


export default useRoutes