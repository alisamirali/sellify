import { useQueryState } from "nuqs";

import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const sortValues = ["curated", "trending", "hot_and_new"] as const;

export const params = {
  minPrice: parseAsString.withOptions({ clearOnDefault: true }),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }),
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true,
  }),
  sort: parseAsStringLiteral(sortValues).withDefault("curated").withOptions({
    clearOnDefault: true,
  }),
};

export function useProductsFilters() {
  const [minPrice, setMinPrice] = useQueryState("minPrice", params.minPrice);
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", params.maxPrice);
  const [tags, setTags] = useQueryState("tags", params.tags);
  const [sort, setSort] = useQueryState("sort", params.sort);

  return {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    tags,
    setTags,
    sort,
    setSort,
  };
}
