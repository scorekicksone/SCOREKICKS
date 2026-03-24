import Link from "next/link";
import { supabase } from "@/lib/supabase";

type SneakerPageProps = {
  params: Promise<{ id: string }>;
};

type ReviewScoreKey =
  | "comfort"
  | "durability"
  | "walking"
  | "style"
  | "daily_use"
  | "value";

export default async function SneakerPage({ params }: SneakerPageProps) {
  const { id } = await params;

  const { data: sneaker, error } = await supabase
    .from("sneakers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !sneaker) {
    return (
      <div className="min-h-screen bg-black p-10 text-white">
        <Link
          href="/rankings"
          className="mb-6 inline-block rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70"
        >
          ← Back to rankings
        </Link>
        <h1 className="text-3xl font-bold">Sneaker not found</h1>
      </div>
    );
  }

  const { data: reviewsData } = await supabase
    .from("reviews")
    .select(
      `
      id,
      review_text,
      overall_score,
      is_verified_owner,
      created_at,
      user_id,
      profiles (
        username,
        full_name
      ),
      review_scores (
        comfort,
        durability,
        walking,
        style,
        daily_use,
        value
      )
    `
    )
    .eq("sneaker_id", id)
    .order("created_at", { ascending: false });

  const reviews: any[] = reviewsData || [];

  const averageOverall =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.overall_score), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const averageStat = (key: ReviewScoreKey) => {
    const validScores = reviews
      .map((review) => review.review_scores?.[0]?.[key])
      .filter((value) => value !== null && value !== undefined)
      .map((value) => Number(value));

    if (validScores.length === 0) return "0.0";

    const avg =
      validScores.reduce((sum, value) => sum + value, 0) / validScores.length;

    return avg.toFixed(1);
  };

  const statCards = [
    ["Comfort", averageStat("comfort")],
    ["Durability", averageStat("durability")],
    ["Walking", averageStat("walking")],
    ["Style", averageStat("style")],
  ];

  const breakdownCards = [
    ["Comfort", averageStat("comfort")],
    ["Style", averageStat("style")],
    ["Durability", averageStat("durability")],
    ["Walking", averageStat("walking")],
    ["Daily use", averageStat("daily_use")],
    ["Value", averageStat("value")],
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl p-6 md:p-10">
        <Link
          href="/rankings"
          className="mb-6 inline-block rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          ← Back to rankings
        </Link>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900">
            {sneaker.main_image_url ? (
              <img
                src={sneaker.main_image_url}
                alt={sneaker.full_name}
                className="h-[420px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white/25">
                <span className="text-lg">Sneaker image coming soon</span>
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              {sneaker.brand}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {sneaker.full_name}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-2xl bg-white px-5 py-3 text-black">
                <p className="text-xs uppercase tracking-[0.18em]">Score</p>
                <p className="text-3xl font-bold">{averageOverall}</p>
              </div>

              <div className="rounded-2xl border border-white/10 px-5 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Category
                </p>
                <p className="text-lg font-medium">
                  {sneaker.category || "Unknown"}
                </p>
              </div>
            </div>

            <div className="mt-4 text-sm text-white/50">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/45">Model</p>
                <p className="mt-1 text-lg font-medium">{sneaker.model}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/45">Silhouette</p>
                <p className="mt-1 text-lg font-medium">
                  {sneaker.silhouette || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/45">Release year</p>
                <p className="mt-1 text-lg font-medium">
                  {sneaker.release_year || "Unknown"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black">
                Add to wishlist
              </button>

              <button className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white">
                Mark as owned
              </button>

              <Link
                href={`/sneakers/${id}/review`}
                className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white"
              >
                Rate sneaker
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-zinc-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Community stats
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {statCards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <p className="text-sm text-white/45">{label}</p>
                <p className="mt-2 text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-zinc-900/60 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Reviews
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Community reviews
              </h2>
            </div>

            <Link
              href={`/sneakers/${id}/review`}
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/5"
            >
              Write review
            </Link>
          </div>

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5 text-white/60">
                No reviews yet. Be the first to rate this sneaker.
              </div>
            ) : (
              reviews.map((review) => {
                const profile: any =
                  Array.isArray(review.profiles) && review.profiles.length > 0
                    ? review.profiles[0]
                    : review.profiles;

                const username =
                  profile?.username || profile?.full_name || "Anonymous";

                return (
                  <div
                    key={review.id}
                    className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">{username}</p>
                        <p className="text-sm text-white/45">
                          {review.is_verified_owner
                            ? "Verified owner"
                            : "Community member"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-2 text-black">
                        <p className="text-xs uppercase tracking-[0.18em]">
                          Score
                        </p>
                        <p className="text-xl font-bold">
                          {Number(review.overall_score).toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-white/70">
                      {review.review_text || "No written review provided."}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-zinc-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Rating breakdown
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {breakdownCards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm text-white/45">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-white"
                    style={{ width: `${Number(value) * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}