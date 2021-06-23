// custom setting for allProducts query specified in withData

import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    // first asks read function for items
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items in cache
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // if there are items, less items than requested, on last page
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // not in cache? get from network keystone database
        return false;
      }
      // are they in cache? return items
      if (items.length) {
        return items;
      }

      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs the Apollo client comes back from network with products
      // how should they be merged with cache
      const merged = existing ? existing.slice(0) : [];
      // slot fetched items into correct spots in array
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // return merged items from the cache
      return merged;
    },
  };
}
