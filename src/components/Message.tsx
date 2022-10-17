import { Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const handleElapsedTime = (currentTime: Timestamp) => {
    var storedDate = currentTime.toDate();
    var nowDate = new Date();
    var elapsedTime = nowDate.getTime() - storedDate.getTime();
    if (elapsedTime <= 60000) {
      return Math.round(elapsedTime / 1000) + 'sec ago';
    } else if (elapsedTime <= 3600000) {
      return Math.round(elapsedTime / (1000 * 60)) + 'min ago';
    } else if (elapsedTime <= 86400000) {
      return Math.round(elapsedTime / (1000 * 60 * 60)) + 'h ago';
    } else {
      return Math.round(elapsedTime / (1000 * 60 * 60 * 24)) + 'days ago';
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className='messageInfo'>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=''
        />
        <span>{handleElapsedTime(message.date)}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='' />}
      </div>
    </div>
  );
};

export default Message;
