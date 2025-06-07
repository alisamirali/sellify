import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

type TagsFilterProps = {
  value: string[] | null;
  onChange: (tags: string[]) => void;
};

export function TagsFilter({ value, onChange }: TagsFilterProps) {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  const onClick = (tag: string) => {
    const currentTags = value || [];

    if (currentTags.includes(tag)) {
      // Remove the tag if it's already selected
      onChange(currentTags.filter((t) => t !== tag));
    } else {
      // Add the tag if it's not already selected
      onChange([...currentTags, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 p-1">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              key={tag.id}
              onClick={() => onClick(tag.name)}
              className="flex items-center justify-between cursor-pointer"
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={value?.includes(tag.name) || false}
                onCheckedChange={() => onClick(tag.name)}
              />
            </div>
          ))
        )
      )}

      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium cursor-pointer justify-start text-start disabled:opacity-50"
        >
          Load more...
        </button>
      )}
    </div>
  );
}
