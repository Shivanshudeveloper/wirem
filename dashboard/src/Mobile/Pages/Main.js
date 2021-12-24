import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  TextField,
  Typography, Button, Stack, Paper, Snackbar, Alert
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  m: 5,
  color: theme.palette.text.secondary,
}));
const Main = () => {
  const [OTP, setOTP] = useState('');
  const [alert, setAlert] = useState({ success: null, message: '' });
  const [open, setOpen] = useState(false);
  const sendMesage = (data) => {
    setAlert({ success: true, message: 'Message Sent' });
    setOpen(true);
    setOTP('');
    console.log(data);
  };
  const handleSubmit = async () => {
    console.log(OTP);
    try {
      const res = await axios.get(`http://localhost:1337/details/otp/${OTP}`);
      if (res.data.length > 0) {
        sendMesage(res.data);
      } else {
        setAlert({ success: false, message: 'Not Found' });
      }
    } catch (err) {
      console.log(err);
      setAlert({ success: false, message: 'Not Found' });
    }
  };
  useEffect(() => {
    if (alert.message !== '') {
      setOpen(true);
    }
  }, [alert]);
  const handleClose = () => {
    setOpen(false);
    setAlert({ success: null, message: '' });
  };
  return (
    <>
      <Helmet>
        <title>Mobile | Material Kit</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        {' '}
        <Typography
          align="center"
          color="textPrimary"
          variant="h3"
          sx={{ mb: 5 }}
        >
          Enter OTP
        </Typography>

        <Container maxWidth="md">

          <Stack spacing={5}>
            <Item>
              {' '}
              <TextField value={OTP} onChange={(e) => setOTP(e.target.value)} id="outlined-basic" label="OTP" variant="outlined" />

              <Button onClick={handleSubmit} sx={{ mt: 2 }} variant="contained">
                Submit
              </Button>
            </Item>

          </Stack>
        </Container>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.success ? 'success' : 'error'} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;
