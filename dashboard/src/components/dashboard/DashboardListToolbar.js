import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState } from 'react';

const DashboardListToolbar = (props) => {
  const { filteredProductsHandler, products, setTextHandler } = props;
  const [text, setText] = useState('');
  const handleChange = (e) => {
    setTextHandler(e.target.value);
    setText(e.target.value);
    if (e.target.value === '') {
      filteredProductsHandler([]);
      return;
    }
    console.log(e);
    filteredProductsHandler(products.filter((product) => product.productname.toLowerCase().includes(e.target.value.toLowerCase())));
  };
  return (
    <Box {...props}>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                type="text"
                placeholder="Search product"
                variant="outlined"
                value={text}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}

              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
DashboardListToolbar.propTypes = {
  products: PropTypes.object.isRequired,
  filteredProductsHandler: PropTypes.func.isRequired,
  setTextHandler: PropTypes.func.isRequired

};
export default DashboardListToolbar;
