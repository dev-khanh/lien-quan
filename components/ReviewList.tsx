import { Star } from "lucide-react";

export function ReviewList({ reviews }: { reviews: { id: string; customerName: string; rating: number; comment: string }[] }) {
  if (reviews.length === 0) return <p className="rounded-lg bg-white/80 p-4 text-sm font-semibold text-purple-900">Chưa có đánh giá được duyệt.</p>;
  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg bg-white p-4 shadow-game">
          <div className="flex items-center justify-between gap-3">
            <strong>{review.customerName}</strong>
            <span className="flex text-amber-500">
              {Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
