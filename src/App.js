import React, { useState } from 'react';
import axios from 'axios'
import Navbar from './Navbar';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [li, setLi] = useState()  // Short for Logged In (Li)
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      setLi(true)
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // setLi(false)
    }
  };

  return (
    <div>
      <Navbar isloggedin={li} username={email} />
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>

      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      

    </div>
  );
};

export default App;
