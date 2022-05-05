import Home from "./pages/home/Home";
import Topbar from "./components/topbar/TopBar"
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";

function App() {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
