// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

interface ProductsProps {
  id: string;
  cover: string;
  name: string;
  price: number;
  priceSale: number | null;
  colors: string[];
  status: string | undefined;
}
interface ProductListProps {
  products: ProductsProps[];
}
export default function ProductList({ products, ...other }: ProductListProps) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product: ProductsProps) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
