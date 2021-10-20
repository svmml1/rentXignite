import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
  } from 'react';

  import { api } from '../services/api'; 

  interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
  }
