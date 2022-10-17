import { useState } from 'react';
// material
import { Container, Stack, Typography, TablePagination } from '@mui/material';
// components
import Page from '@/Components/Global/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from '@/Components/Admin/Products';
// mock
//import PRODUCTS from '@/Components/Global/_mock/products';
import { getAllProductDispatch } from '@/redux/slice/product';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import LoadingPage from '../Loading';
import { useEffectOnce, useUpdateEffect } from '@/customHooks';
import { IProductInfo } from '@/interfaces/redux.interface';
// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const [productList, setProductList] = useState<IProductInfo[] | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);
  const [page, setPage] = useState<number>(0);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleSortBy = (sortBy: string) => {
    //console.log('value', sortBy);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffectOnce(() => {
    dispatch(getAllProductDispatch());
  });

  useUpdateEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Page title="Dashboard: Products">
          <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Products
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProductFilterSidebar
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
                <ProductSort onSortBy={handleSortBy} />
              </Stack>
            </Stack>

            <ProductList
              products={
                productList &&
                productList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              }
            />
            <ProductCartWidget />
            <TablePagination
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={productList ? productList.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Page>
      )}
    </>
  );
}
