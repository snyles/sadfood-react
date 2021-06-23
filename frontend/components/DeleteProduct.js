import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Product from './Product';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// callback function after delete mutation, cache is apollo cache, payload is returned from mutation
function update(cache, payload) {
  console.log(payload);
  console.log('running update function');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => alert(err.message));
          console.log('Deleting');
        }
      }}
    >
      {children}
    </button>
  );
}
