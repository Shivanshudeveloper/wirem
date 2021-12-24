import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
} from '@material-ui/core';
import { useLocation } from 'react-router';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const payNow = async () => {
    const ot = Math.floor(100000 + Math.random() * 900000);
    const paymentUrl = `http://localhost:5000/geturl?amt=${location.state.amount}&name=${location.state.name}&emailId=${location.state.email}&productname=${location.state.productname}&description=${location.state.description}&otp=${ot}`;
    const res = await axios.post(
      'http://localhost:1337/details/me',
      {
        name: location.state.name,
        email: location.state.email,
        productname: location.state.productname,
        otp: ot,
        amount: location.state.amount,
        description: location.state.description,
        paymentUrl
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('strapi')}`,
        },
      }
    );
    console.log(res);
    window.location.href = 'http://localhost:3000/app/products';
    // fetch('http://localhost:5000/geturl', {
    //   method: 'post',
    //   body: JSON.stringify(body),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // console.log('parsed json', json);
    //     console.log(json);
    //     window.location.href = json;
    //   });
  };
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
