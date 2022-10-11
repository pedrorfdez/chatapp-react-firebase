import React, { useState } from 'react';
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

interface FormElements extends HTMLFormControlsCollection {
  displayNameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  fileInput: HTMLInputElement;
}
interface RegisterFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Register = () => {
  const [err, setErr] = useState(false);
  const handleSubmit = async (e: React.FormEvent<RegisterFormElement>) => {
    e.preventDefault();
    const displayName = e.currentTarget.elements.displayNameInput.value;
    const email = e.currentTarget.elements.emailInput.value;
    const password = e.currentTarget.elements.passwordInput.value;
    const file = e.currentTarget.elements.fileInput.value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Beta Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='display name' id='displayNameInput' />
          <input type='email' placeholder='email' id='emailInput' />
          <input type='password' placeholder='password' id='passwordInput' />
          <input type='file' style={{ display: 'none' }} id='fileInput' />
          <label htmlFor='file'>
            <img src={Add} alt='' />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong.</span>}
        </form>
        <p>You do have an account? Log in</p>
      </div>
    </div>
  );
};

export default Register;
