import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getTokenCookie } from "./context/cookie";
import axios from "axios";

import LoginForm from "./Pages/Login";
import SignupForm from "./Pages/Signup";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./Pages/HomePage";
import TaskForm from "./components/Task/TaskForm";
import TaskList from "./components/Task/TaskList";

axios.defaults.baseURL = process.env.REACT_APP_BACK_URL;
function App() {
  const user = getTokenCookie();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={user ? <HomePage /> : <SignupForm />} />
        <Route path="/signup" element={user ? <HomePage /> : <SignupForm />} />
        <Route path="/login" element={user ? <HomePage /> : <LoginForm />} />
        <Route
          path="/create-task"
          element={user ? <TaskForm /> : <LoginForm />}
        />
        <Route
          path="/task-list"
          element={user ? <TaskList /> : <LoginForm />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
