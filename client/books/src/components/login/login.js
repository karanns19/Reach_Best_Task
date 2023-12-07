import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import data from './service.js'


// Created a Login Page for Dashboard - Signup & Register 

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp, setSignUp] = useState(true);
  const navigate = useNavigate()

  const validateEmail = (input) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(input);
  };

  const handleRegistration = async () => {
    const response = await axios.get('http://localhost:3001/users');
    let emails = response.data.map((item) => { return item.email })
    if (!emails.includes(email)) {
      if (validateEmail(email)) {
        if (password.length >= 8 && password.length <= 20) {
          try {
            Loading.hourglass()
            const response = await axios.post('http://localhost:3001/users/new', {
              email,
              password,
            });
            Loading.remove()
            Notify.success('Registered Successfully !!');
            setSignUp(true)
            console.log(response)
          } catch (error) {
          }
        } else {
          Notify.failure("Password length should be greater or equal to 8 ")
        }

      } else {
        Notify.failure("Please enter valid Email Id")
      }
    } else {
      Notify.failure("You have already registered with this Email Id, Please login to Continue")
    }

  };

  const handleLogin = async () => {
    if (validateEmail(email)) {
      try {
        Loading.hourglass()
        const response = await axios.get('http://localhost:3001/users');
        let emails = response.data.map((item) => { return item.email })
        let passwords = response.data.map((item) => { return item.password })
        let ids = response.data.map((item) => { return item._id })
        if (emails.includes(email)) {
          let index = emails.indexOf(email)
          if (password === passwords[index]) {
            Loading.remove()
            Notify.success('Login Successfully !!');
            data.email = email
            data.id = ids[index]
            navigate('/dashboard')
          }
          else {
            Loading.remove()
            Notify.failure('Password Incorrect !!');
          }
        } else {
          Loading.remove()
          Notify.failure('EmailId not registered !!');
        }
      } catch (error) {
      }
    }
    else {
      Notify.failure("Please enter valid Email Id")
    }
  };

  const toggleAuthType = () => {
    setSignUp(!signUp);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-customBlue-dark text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">{signUp ? 'Login' : 'Register'}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}yy name="email" className="bg-transparent rounded-lg w-60 border-2 border-white px-2 py-1 mt-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="password"  className="block mb-1">
              Password:
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="bg-transparent rounded-lg w-60 border-2 border-white px-2 py-1 mt-2" />
          </div>
          <div className='flex justify-between mt-6'>
            <button onClick={signUp ? handleLogin : handleRegistration} type="button" className="bg-customBlue-light text-white px-4 py-2 rounded-lg w-5/12">
              {signUp ? 'Sign In' : 'Register'}
            </button>
            <button onClick={toggleAuthType} type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg w-5/12">
              {signUp ? 'Register' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
