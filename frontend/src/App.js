import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
