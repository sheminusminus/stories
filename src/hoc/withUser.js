import React from 'react';

const withUser = (Component) => {
  const ComponentWithUser = (props) => {
    const userId = localStorage.getItem('user.id');
    const userName = localStorage.getItem('user.name');

    const user = Boolean(userId && userName)
      ? { id: userId, name: userName }
      : undefined;

    return (
      <Component
        user={user}
        {...props}
      />
    );
  };

  return ComponentWithUser;
};

export default withUser;
