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
  DialogActions, styled, Dialog
} from '@material-ui/core';
import { useState } from 'react';

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
const ProductCard = ({ product, ...rest }) => {
  const [openDialog, setOpenDialog] = useState(false);

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
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: 'space-between' }}
          >

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
            onClick={() => setOpenDialog(true)}
          >
            Continue
          </Button>
        </DialogActions>

      </BootstrapDialog>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,

};

export default ProductCard;
