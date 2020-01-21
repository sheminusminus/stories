import React from 'react';
import shortId from 'shortid';

const SetUser = (props) => {
  const [name, setName] = React.useState(localStorage.getItem('user.name') || '');
  const [id, setId] = React.useState(localStorage.getItem('user.id'));

  if (!id) {
    const genId = shortId.generate();
    setId(genId);
    localStorage.setItem('user.id', genId);
  }

  return (
    <input
      type="text"
      value={name}
      onChange={(evt) => {
        const { value } = evt.target;
        setName(value);
        localStorage.setItem('user.name', value);
      }}
      {...props}
    />
  );
};

export default SetUser;
