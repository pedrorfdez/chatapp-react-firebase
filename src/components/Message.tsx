import React from 'react';

const Message = () => {
  return (
    <div className='message owner'>
      <div className='messageInfo'>
        <img
          src='https://images.pexels.com/photos/236588/pexels-photo-236588.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
          alt=''
        />
        <span>Just now</span>
      </div>
      <div className='messageContent'>
        <p>hello</p>
        <img
          src='https://images.pexels.com/photos/236588/pexels-photo-236588.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
          alt=''
        />
      </div>
    </div>
  );
};

export default Message;
