import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
// import Summarizer from './Summarizer';
// import Analyzer from './Analyzer';
import Login from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import Logout from './Logout';
import ConfirmEmail from './ConfirmEmail';

const App = () => {
  const [activeTab, setActiveTab] = useState('summarizer');

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={
          <>
            {activeTab === 'summarizer' && <Summarizer onTabSwitch={setActiveTab} />}
            {activeTab === 'analyzer' && <Analyzer onTabSwitch={setActiveTab} />}
          </>
        } /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;