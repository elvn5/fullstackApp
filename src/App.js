import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import useRoutes from "./Components/Routes/Routes.js";
import { Container } from "reactstrap";

function App() {
  const isAuthenticated = !!localStorage.getItem('userData')
  const routes = useRoutes(isAuthenticated);
  return (
    <div className="App">
      <Container>
        <Router>{routes}</Router>
      </Container>
    </div>
  );
}

export default App;
