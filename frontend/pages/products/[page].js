import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductsPage({ query }) {
  return (
    <div>
      <Pagination page={query.page} />
      <Products />
      <Pagination page={query.page} />
    </div>
  );
}
