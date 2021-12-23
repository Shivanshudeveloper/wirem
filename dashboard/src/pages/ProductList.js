import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  CircularProgress
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import getUser from 'src/Firebase/getUser';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(1);
  const [User, setUser] = useState({ displayName: '' });
  const [LIMIT] = useState(6);
  useEffect(() => {
    const getProducts = () => {
      const strapi = window.localStorage.getItem('strapi');
      fetch(`http://localhost:1337/products?_limit=${LIMIT}&_start=${LIMIT * page - LIMIT}`, {
        headers: {
          Authorization: `Bearer ${strapi}`
        }
      }).then((res) => res.json()).then((data) => {
        if (data) setProducts(data);
        console.log(data);

        setLoading(false);
      }).catch((err) => console.log(err));

      setLoading(false);
    };

    getProducts();
  }, [page]);
  useEffect(() => {
    const getProductsCount = async () => {
      const strapi = window.localStorage.getItem('strapi');
      console.log(window.localStorage.getItem('strapi'), 'sacdsacfdsacdsacsacsacsacsasacx');
      setUser(await getUser());
      setLoading(true);

      fetch('http://localhost:1337/products/count', {
        headers: {
          Authorization: `Bearer ${strapi}`
        }
      }).then((res) => res.json()).then((res) => {
        setProductsCount(res);
        console.log(res);
        setLoading(false);
      }).catch(() => { console.log(''); setLoading(false); });
    };

    getProductsCount();
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setLoading(true);
    setPage(newPage);
  };

  return (
    <>

      <Helmet>
        <title>Products | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container maxWidth={false}>
          <ProductListToolbar />
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

              {products.map((product) => (
                <Grid
                  key={product.id}
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} user={User} />
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
          >
            <Pagination
              color="primary"
              count={Math.ceil(productsCount / LIMIT)}
              size="medium"
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Container>

      </Box>
    </>
  );
};

export default ProductList;
