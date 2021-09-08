import React, { createContext, useReducer } from 'react';
import users from '../data/users';

const initialState = { users };
const UsersContext = createContext({});

const actions = {
  DELETE_USER(state, action) {
    const userId = action.payload.id;
    return {
      ...state,
      users: state.users.filter(user => user.id !== userId),
    };
  },
  CREATE_USER(state, action) {
    const id =
      1 + state.users.reduce((acc, curr) => (acc.id > curr.id ? acc : curr)).id;

    const newUser = { ...action.payload, id };

    return {
      ...state,
      users: [...state.users, newUser],
    };
  },
  UPDATE_USER(state, action) {
    const updatedUser = action.payload;
    const updatedUsers = state.users.map(user =>
      user.id !== updatedUser.id ? user : updatedUser,
    );
    return {
      ...state,
      users: updatedUsers,
    };
  },
};

export const UsersProvider = props => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
