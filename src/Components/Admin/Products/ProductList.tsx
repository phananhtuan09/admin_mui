// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { IProductInfo } from '@/interfaces/redux.interface';
// ----------------------------------------------------------------------

interface ProductListProps {
  products: IProductInfo[] | null;
}
export default function ProductList({ products, ...other }: ProductListProps) {
  return (
    <Grid container spacing={3} {...other}>
      {products &&
        products.map((product: IProductInfo) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))}
    </Grid>
  );
}
