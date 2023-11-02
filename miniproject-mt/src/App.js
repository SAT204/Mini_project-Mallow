import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/SignIn";
import Profile from "./Components/Profile";
import Posts from "./Components/Posts";
import Dashboard from "./Components/Dashboard";
import View from "./Components/View";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/View" element={<View />} />
        <Route path="/Posts" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
