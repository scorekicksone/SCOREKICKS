import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Rankings() {
  const { data: sneakers, error } = await supabase
    .from("sneakers")
    .select("*");

  if (error) {
    return (
      <div className="min-h-screen bg-black p-10 text-white">
        Error loading sneakers
      </div>
    );
  }

  const sneakersWithScores = await Promise.all(
    (sneakers || []).map(async (sneaker) => {
      const { data: reviews } = await supabase
        .from("reviews")
        .select("overall_score")
        .eq("sneaker_id", sneaker.id);

      const reviewCount = reviews?.length || 0;

      const averageScore =
        reviewCount > 0
          ? (
              reviews.reduce(
                (sum, review) => sum + Number(review.overall_score),
                0
              ) / reviewCount
            ).toFixed(1)
          : "0.0";

      return {
        ...sneaker,
        averageScore,
        reviewCount,
      };
    })
  );

  const rankedSneakers = sneakersWithScores.sort(
    (a, b) => Number(b.averageScore) - Number(a.averageScore)
  );

  return (
    <div className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">
          ScoreKicks
        </p>

        <h1 className="mb-8 text-4xl font-semibold tracking-tight">
          Top Sneakers
        </h1>

        <div className="space-y-4">
          {rankedSneakers.map((sneaker, index) => (
            <Link key={sneaker.id} href={`/sneakers/${sneaker.id}`}>
              <div className="cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/70 transition hover:border-white/20 hover:bg-zinc-900">
                <div className="grid items-center md:grid-cols-[100px_120px_1fr_auto]">
                  <div className="flex h-full min-h-[120px] items-center justify-center text-3xl font-bold text-white/30">
                    #{index + 1}
                  </div>

                  <div className="mx-4 h-[90px] w-[120px] overflow-hidden rounded-xl bg-zinc-800 md:mx-0">
                    {sneaker.main_image_url ? (
                      <img
                        src={sneaker.main_image_url}
                        alt={sneaker.full_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                      {sneaker.brand}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                      {sneaker.full_name}
                    </h2>

                    <p className="mt-2 text-sm text-white/55">
                      {sneaker.category || "No category"}
                    </p>

                    <p className="mt-2 text-xs text-white/35">
                      {sneaker.reviewCount} review
                      {sneaker.reviewCount === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-5">
                    <div className="rounded-2xl bg-white px-4 py-3 text-center text-black">
                      <p className="text-xs font-medium uppercase tracking-[0.18em]">
                        Score
                      </p>
                      <p className="text-2xl font-bold">
                        {sneaker.averageScore}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}