// Import Components and Dependencies

import { useState } from "react";
import Login from "./components/login/login";
import Mainbody from "./components/mainbody/mainbody";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// App Component - Contains Different Routes

function App() {

  // Disabled Direct Routing & Account Details

  const [login, setLogin] = useState("loggedOut")
  const handleChange = (newData) => {
    setLogin(newData);
  };

  const [username, setUsername] = useState("")
  const handleUserChange = (newData) => {
    setUsername(newData);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login onChange={handleChange} onUserChange={handleUserChange} />} />
          <Route path="/bookApp" element={<Mainbody isLogin={login} username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
