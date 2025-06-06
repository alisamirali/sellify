import { parseAsString, useQueryState } from "nuqs";

export function useProductsFilters() {
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsString.withOptions({ clearOnDefault: true })
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsString.withOptions({ clearOnDefault: true })
  );

  return { minPrice, setMinPrice, maxPrice, setMaxPrice };
}
