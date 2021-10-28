import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Alert,
  AlertTitle
} from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
          height: '100%'
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
                <AlertTitle>Pending</AlertTitle>
              </Alert>
            )}
          </Grid>
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
