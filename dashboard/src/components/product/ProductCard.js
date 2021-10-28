import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
  Snackbar,
  DialogActions, styled, Dialog
} from '@material-ui/core';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        />
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const ProductCard = ({ product, user, ...rest }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const postHandler = async () => {
    try {
      const strapi = localStorage.getItem('strapi');
      const res = await fetch('http://localhost:1337/details/me', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${strapi}`
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          productname: product.Name,
          amount: product.amount,
          description: product.description
        })
      });
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
    setOpenDetailsDialog(false);
  };
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
            {product.Name}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
          >
            {product.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        <Box sx={{ p: 2, }}>
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: 'space-between' }}
          >

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
                  {product.amount}

                </h3>
              </Typography>
            </Grid>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setOpenDialog(true)}
            >
              Continue with product
            </Button>

          </Grid>

        </Box>
      </Card>
      <BootstrapDialog
        onClose={() => setOpenDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenDialog(false)}>
          <h2>
            {' '}
            {product.Name}
          </h2>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {product.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenDialog(false)}>
            close
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => { setOpenDialog(false); setOpenDetailsDialog(true); }}
          >
            Continue
          </Button>
        </DialogActions>

      </BootstrapDialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        ContentProps={{
          sx: {
            position: 'relative',
            marginTop: '25%',
            backgroundColor: 'white',
            color: 'black',
            display: 'flex',
            justifySelf: 'start'
          }
        }}
        open={openDetailsDialog}
        autoHideDuration={1000}
        onClose={() => {}}
        message={(

          <Box sx={{
            p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          >
            <Grid
              container
              spacing={1}
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography gutterBottom>
                <h3>
                  {user.displayName}
                </h3>
              </Typography>
              <Typography gutterBottom>
                <h3>

                  {user.email}

                </h3>
              </Typography>
              <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <DialogContent dividers>
                  <Typography gutterBottom>
                    {product.Name}
                  </Typography>
                </DialogContent>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    {product.description}
                  </Typography>
                </DialogContent>
              </Grid>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <LocalOfferIcon color="action" />

                <Typography
                  color="black"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  <h3>
                    Amount&nbsp;&nbsp;&nbsp;
                    {product.amount}

                  </h3>
                </Typography>
              </Grid>
            </Grid>
            <Button
              sx={{ width: '50%' }}
              color="primary"
              variant="contained"
              onClick={() => postHandler()}
            >
              Submit
            </Button>
          </Box>
)}
        action={(
          <Box sx={{
            p: 0, position: 'absolute', top: '0%', right: '0%'
          }}
          >
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => { setOpenDetailsDialog(false); }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

          </Box>
        )}
      />

    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired,

};

export default ProductCard;
