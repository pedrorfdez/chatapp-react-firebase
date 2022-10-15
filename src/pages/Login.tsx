import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

interface FormElements extends HTMLFormControlsCollection {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<LoginFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.elements.emailInput.value;
    const password = e.currentTarget.elements.passwordInput.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Beta Chat</span>
        <span className='title'>Log in</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' id='emailInput' />
          <input type='password' placeholder='password' id='passwordInput' />
          <button>Sign in</button>
          {err && <span>Something went wrong.</span>}
        </form>
        <p>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
