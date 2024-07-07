import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setMessage(data.message));

    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.users));
  }, []);

  return (
    <div>
      <div>{message}</div>
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;