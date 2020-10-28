import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/actions/authentication';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const newUser = {
      fullName,
      username,
      email,
      password,
      confirmPassword,
    };
    console.log('handleSubmit -> newUser', newUser);
    dispatch(signUp(newUser));
  };

  return (
    <main>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Full Name'
          value={fullName}
          onChange={updateProperty(setFullName)}
          required
        />
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={updateProperty(setUsername)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={updateProperty(setEmail)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={updateProperty(setConfirmPassword)}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </main>
  );
};

export default SignUpForm;
