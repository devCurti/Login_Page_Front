import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./pages/Register";
import Home from "./pages/Home";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
