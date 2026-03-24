"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [overall, setOverall] = useState("8.8");
  const [comfort, setComfort] = useState("8.8");
  const [style, setStyle] = useState("8.9");
  const [durability, setDurability] = useState("8.6");
  const [walking, setWalking] = useState("9.0");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async () => {
    const { data: review, error: reviewError } = await supabase
      .from("reviews")
      .insert({
        sneaker_id: id,
        user_id: "98aa55c7-ec6c-4a8b-9ed7-be50626f4fe8",
        review_text: reviewText,
        overall_score: Number(overall),
        is_verified_owner: false,
      })
      .select()
      .single();

    if (reviewError) {
      console.error(reviewError);

      if (
        reviewError.message.includes("reviews_user_id_sneaker_id_key") ||
        reviewError.message.includes("duplicate key value")
      ) {
        alert("You already reviewed this sneaker.");
      } else {
        alert(`Error saving review: ${reviewError.message}`);
      }

      return;
    }

    const { error: scoreError } = await supabase
      .from("review_scores")
      .insert({
        review_id: review.id,
        comfort: Number(comfort),
        durability: Number(durability),
        walking: Number(walking),
        style: Number(style),
      });

    if (scoreError) {
      console.error(scoreError);
      alert(`Error saving scores: ${scoreError.message}`);
      return;
    }

    router.push(`/sneakers/${id}`);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl p-6 md:p-10">
        <Link
          href={`/sneakers/${id}`}
          className="mb-6 inline-block rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          ← Back to sneaker
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-zinc-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            ScoreKicks
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Write review
          </h1>

          <p className="mt-3 text-sm leading-7 text-white/60">
            Rate this sneaker by category and leave your review.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <label className="mb-2 block text-sm text-white/50">
                Overall score
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={overall}
                onChange={(e) => setOverall(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <label className="mb-2 block text-sm text-white/50">
                Comfort
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={comfort}
                onChange={(e) => setComfort(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <label className="mb-2 block text-sm text-white/50">
                Style
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <label className="mb-2 block text-sm text-white/50">
                Durability
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={durability}
                onChange={(e) => setDurability(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:col-span-2">
              <label className="mb-2 block text-sm text-white/50">
                Walking
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={walking}
                onChange={(e) => setWalking(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <label className="mb-3 block text-sm text-white/50">
              Your review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write what you liked, what you did not like, and who this sneaker is best for..."
              className="min-h-[160px] w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-white/30"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleSubmit}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Submit review
            </button>

            <Link
              href={`/sneakers/${id}`}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}