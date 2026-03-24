"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"owned" | "wishlist">("owned");

  const ownedSneakers = [
    {
      id: "3c9a40b7-a49d-4a96-a7a6-ff2ad2d84fb2",
      name: "Jordan 1 Retro High",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "be037db4-1afb-4030-b9ce-8e6972f6f249",
      name: "New Balance 2002R",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "c8db1457-429f-41a9-a3e2-65d125311cef",
      name: "Adidas Samba OG",
      image:
        "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const wishlistSneakers = [
    {
      id: "wishlist-1",
      name: "Nike Dunk Low Panda",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "wishlist-2",
      name: "ASICS Gel Kayano",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "wishlist-3",
      name: "Nike Vomero 5",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const sneakersToShow =
    activeTab === "owned" ? ownedSneakers : wishlistSneakers;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl p-6 md:p-10">
        <div className="mb-8 flex items-start gap-6">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover md:h-32 md:w-32"
          />

          <div className="flex-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">AlexJ</h1>
                <p className="mt-1 text-sm text-white/50">@alexscorekicks</p>
              </div>

              <div className="flex gap-6 text-sm md:text-base">
                <div>
                  <span className="font-semibold text-white">27</span>{" "}
                  <span className="text-white/50">owned</span>
                </div>
                <div>
                  <span className="font-semibold text-white">14</span>{" "}
                  <span className="text-white/50">wishlist</span>
                </div>
                <div>
                  <span className="font-semibold text-white">128</span>{" "}
                  <span className="text-white/50">followers</span>
                </div>
                <div>
                  <span className="font-semibold text-white">84</span>{" "}
                  <span className="text-white/50">following</span>
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Sneaker collector. Comfort, style, daily wear and underrated pairs.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Best category
                </p>
                <p className="mt-1 text-sm font-medium">Daily wear</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Profile score
                </p>
                <p className="mt-1 text-sm font-medium">8.9</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Ranking
                </p>
                <p className="mt-1 text-sm font-medium">Top 12%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setActiveTab("owned")}
            className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "owned"
                ? "bg-white text-black"
                : "border border-white/10 bg-zinc-900/70 text-white/75"
            }`}
          >
            Owned
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "wishlist"
                ? "bg-white text-black"
                : "border border-white/10 bg-zinc-900/70 text-white/75"
            }`}
          >
            Wishlist
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {sneakersToShow.map((sneaker) => (
            <Link
              key={sneaker.id}
              href={
                sneaker.id.startsWith("wishlist")
                  ? "/search"
                  : `/sneakers/${sneaker.id}`
              }
            >
              <div className="cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/70 transition hover:border-white/20 hover:bg-zinc-900">
                <img
                  src={sneaker.image}
                  alt={sneaker.name}
                  className="h-[260px] w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {sneaker.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}