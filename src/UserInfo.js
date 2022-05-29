import React, { useEffect, useState } from 'react';
import {getList} from './list';

function UserInfo() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getList().then(items => {
        setList(items);
      })
      mounted = false;
    }
  }, [])

  return (
    <div className="app-main">
        <div className="container">
        <h2>User informations</h2>
        <p>{list.login}</p>
        <p>{list.level}</p>
        </div>
    </div>
  );
}

export default UserInfo;