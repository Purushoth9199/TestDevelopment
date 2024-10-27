import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
