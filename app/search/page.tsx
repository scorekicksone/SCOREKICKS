"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Sneaker = {
  id: string;
  brand: string;
  model: string;
  full_name: string;
  category: string | null;
  main_image_url: string | null;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSneakers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("sneakers")
        .select("id, brand, model, full_name, category, main_image_url")
        .ilike("full_name", `%${query}%`);

      if (error) {
        console.error(error);
        setResults([]);
        setLoading(false);
        return;
      }

      setResults((data as Sneaker[]) || []);
      setLoading(false);
    };

    fetchSneakers();
  }, [query]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl p-6 md:p-10">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">
          ScoreKicks
        </p>

        <h1 className="mb-8 text-4xl font-semibold tracking-tight">
          Search Sneakers
        </h1>

        <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-3">
          <input
            type="text"
            placeholder="Search for Jordan, Samba, 2002R..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 py-3 text-lg text-white outline-none placeholder:text-white/30"
          />
        </div>

        {!query && (
          <div className="rounded-[1.75rem] border border-white/10 bg-zinc-900/50 p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-white/40">
              Suggested searches
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {["Jordan", "Samba", "2002R", "Nike", "Adidas"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/5"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <p className="mt-6 text-white/50">Searching sneakers...</p>
        )}

        {!loading && query && results.length === 0 && (
          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-zinc-900/50 p-6 text-white/60">
            No sneakers found for "{query}"
          </div>
        )}

        <div className="mt-6 space-y-4">
          {results.map((sneaker) => (
            <Link key={sneaker.id} href={`/sneakers/${sneaker.id}`}>
              <div className="cursor-pointer rounded-[1.75rem] border border-white/10 bg-zinc-900/70 p-4 transition hover:border-white/20 hover:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl bg-zinc-800">
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

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                      {sneaker.brand}
                    </p>
                    <h2 className="mt-1 truncate text-xl font-semibold tracking-tight">
                      {sneaker.full_name}
                    </h2>
                    <p className="mt-1 text-sm text-white/55">
                      {sneaker.category || "No category"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}