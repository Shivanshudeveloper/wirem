import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Alert,
  AlertTitle, TextField, IconButton, Tooltip
} from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import { useState, useEffect } from 'react';

const DashboardCard = ({ product, user, ...rest }) => {
  const [details] = useState(product);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }, [showAlert]);
  console.log(details);
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        {...rest}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          />
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {details.productname}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {details.description}
          </Typography>
          <Box sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-arround', backgroundColor: 'gray', width: '40%', border: '1px solid gray', borderRadius: 1, boxShadow: 2, p: 0.5, mt: 2
          }}
          >
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
              sx={{ color: 'white', fontWeight: 800 }}
            >
              OTP:
            </Typography>
            <Typography
              sx={{ ml: 2, color: 'white' }}
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
            >

              {details.otp}
            </Typography>

          </Box>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        <Box sx={{ p: 2 }}>
          <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <LocalOfferIcon color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                <h3>
                  Amount&nbsp;&nbsp;&nbsp;
                  {details.amount}
                </h3>
              </Typography>
            </Grid>

            {details.Status === 'Completed' ? (
              <Alert severity="success">
                <AlertTitle>{details.Status}</AlertTitle>
              </Alert>
            ) : (
              <Alert severity="info">
                <AlertTitle>{details.Status}</AlertTitle>
              </Alert>
            )}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <TextField sx={{ width: '80%' }} disabled value={details.paymentUrl} id="outlined-basic" label="Link" variant="outlined" />
          <Tooltip title="Copy">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(details.paymentUrl);
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>

      </Card>
    </>
  );
};
DashboardCard.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired
};

export default DashboardCard;
