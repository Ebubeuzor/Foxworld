// src/GoogleCallback.js

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axoisClient';

function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate(); 

  const { setUser, setToken } = useStateContext();

  useEffect(() => {
    fetchGoogleCallback();
  }, []);

  const fetchGoogleCallback = () => {
    axiosClient
      .get(`/auth/callback${location.search}`)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.access_token);
        navigate('/'); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return null;
}

export default GoogleCallback;
