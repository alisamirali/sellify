import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const MAX_RATING = 5;
const MIN_RATING = 0;

type StarRatingProps = {
  rating: number;
  className?: string;
  iconsClassName?: string;
  text?: string;
};

export function StarRating({
  rating,
  className,
  iconsClassName,
  text,
}: StarRatingProps) {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));

  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            iconsClassName
          )}
        />
      ))}

      {text && <p className="text-base font-medium">{text}</p>}
    </div>
  );
}
