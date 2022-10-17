import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';

const Messages = () => {
  const [messages, setMessages] = useState<DocumentData | null>(null);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className='messages'>
      {messages?.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
