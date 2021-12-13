import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
} from '@material-ui/core';
import { useLocation } from 'react-router';

const Payment = () => {
  const location = useLocation();
  function payNow() {
    const body = {
      amt: location.state.amount,
      name: location.state.name,
      emailId: location.state.email,
      productname: location.state.productname,
      description: location.state.description,
      strapi: localStorage.getItem('strapi')
    };
    fetch('http://localhost:5000/geturl', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log('parsed json', json);
        console.log(json);
        window.location.href = json;
      });
  }
  useEffect(() => {
    payNow();
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment | Material Kit</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        loading....
      </Box>
    </>

  );
};

export default Payment;
