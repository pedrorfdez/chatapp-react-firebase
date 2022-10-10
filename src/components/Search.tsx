import React from 'react';

const Search = () => {
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Find a user' />
      </div>
      <div className='userChat'>
        <img
          src='https://images.pexels.com/photos/236588/pexels-photo-236588.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
          alt=''
        />
        <div className='userChatInfo'>
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
