import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../config/firebase';

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Beta Chat</span>
      <div className='user'>
        <img
          src='https://images.pexels.com/photos/236588/pexels-photo-236588.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
          alt=''
        />
        <span>John</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
