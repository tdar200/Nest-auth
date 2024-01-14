import "./App.css";
import RegisterScreen from "./Pages/SignUp";
import LoginScreen from "./Pages/SignIn";
import Home from "./Pages/Home";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path='/' element={<LoginScreen />} />
        <Route path='/loggedin' element={<Home />} />
        <Route path='/signup' element={<RegisterScreen />} />
      </Routes>
    </Container>
  );
}

export default App;
