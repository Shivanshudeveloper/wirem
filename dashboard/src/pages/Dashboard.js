import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography
} from '@material-ui/core';
import DashboardCard from 'src/components/dashboard/DashboardCard';
import getUser from 'src/Firebase/getUser';
import DashboardListToolbar from 'src/components/dashboard/DashboardListToolbar';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [User, setUser] = useState({ displayName: '' });
  const [text, setText] = useState('');
  useEffect(() => {
    const getDetails = async () => {
      setUser(await getUser());
      const strapi = window.localStorage.getItem('strapi');
      fetch('http://localhost:1337/details/me', {
        headers: {
          Authorization: `Bearer ${strapi}`
        }
      }).then((res) => res.json()).then((data) => {
        if (data.error !== 'Unauthorized') setProducts(data);
        console.log(data);

        setLoading(false);
      }).catch((err) => console.log(err));

      setLoading(false);
    };

    getDetails();
  }, []);
  const filteredProductsHandler = (filtered) => {
    console.log(filtered);
    setFilteredProducts(filtered);
  };
  const setTextHandler = (tex) => {
    setText(tex);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container maxWidth={false}>
          <DashboardListToolbar products={products} setTextHandler={setTextHandler} filteredProductsHandler={filteredProductsHandler} />
          <Box sx={{ pt: 3 }}>
            {' '}
            {loading && (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'Translate(-50%,-50%)'

              }}
              >
                <CircularProgress
                  size={104}
                />
              </Box>
            )}
            <Grid
              container
              spacing={3}
            >
              {filteredProducts.length === 0 && text !== '' ? (
                <div style={{
                  position: 'absolute', top: '50%', left: '50%'
                }}
                >
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Not Found
                  </Typography>
                </div>
              ) : null}
              {(filteredProducts.length === 0 && text === '') ? products.map((product) => (
                <Grid
                  key={product.id}
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <DashboardCard product={product} user={User} />
                </Grid>
              )) : filteredProducts.map((product) => (
                <Grid
                  key={product.id}
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <DashboardCard product={product} user={User} />
                </Grid>
              ))}

            </Grid>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
