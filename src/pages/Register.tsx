import React, { useState } from 'react';
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<RegisterFormElement>) => {
    e.preventDefault();
    const displayName = e.currentTarget.elements.displayNameInput.value;
    const email = e.currentTarget.elements.emailInput.value;
    const password = e.currentTarget.elements.passwordInput.value;
    const file = e.currentTarget.elements.fileInput.files![0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'userChats', res.user.uid), {});
          navigate('/');
        });
      });
    } catch (error) {
      console.log(error);

      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Beta Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type='text'
            placeholder='display name'
            id='displayNameInput'
          />
          <input required type='email' placeholder='email' id='emailInput' />
          <input
            required
            type='password'
            placeholder='password'
            id='passwordInput'
          />
          <input
            required
            type='file'
            style={{ display: 'none' }}
            id='fileInput'
          />
          <label htmlFor='fileInput'>
            <img src={Add} alt='' />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong.</span>}
        </form>
        <p>
          You do have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
