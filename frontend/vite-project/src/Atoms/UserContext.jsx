import { createContext } from 'react';

export const UserContext = createContext({
  currentUser: null,
  loading: true
});