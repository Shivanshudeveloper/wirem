import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  CircularProgress
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:1337/products?_limit=6&_start=${6 * page - 6}`);
        const data = await res.json();
        setProducts(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getProducts();
  }, [page]);
  useEffect(() => {
    const getProductsCount = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:1337/products/count');
        const data = await res.json();
        setProductsCount(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getProductsCount();
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  if (loading) {
    return (
      <>
        <CircularProgress size={14} />
      </>
    );
  }
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
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} />
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
              count={Math.ceil(productsCount / 6)}
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
