"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [menuOpen, setMenuOpen] = useState(false);

  const featuredSneakerId = "be037db4-1afb-4030-b9ce-8e6972f6f249";

  const t = {
    en: {
      welcome: "WELCOME TO SCOREKICKS",
      tagline: "The platform to rate sneakers before you buy them.",
      pair: "PAIR OF THE WEEK",
      activity: "COMMUNITY ACTIVITY",
      trending: "Trending",
      trendingTitle: "Trending sneakers",
      rankingsView: "View rankings",
      score: "Community score",
      view: "View sneaker",
      home: "Home",
      search: "Search",
      profile: "Profile",
      rankings: "Rankings",
      settings: "Settings",
      help: "Help",
    },
    es: {
      welcome: "BIENVENIDO A SCOREKICKS",
      tagline: "La plataforma para calificar sneakers antes de comprarlos.",
      pair: "PAR DE LA SEMANA",
      activity: "ACTIVIDAD DE LA COMUNIDAD",
      trending: "Tendencia",
      trendingTitle: "Sneakers en tendencia",
      rankingsView: "Ver rankings",
      score: "Calificación comunidad",
      view: "Ver sneaker",
      home: "Home",
      search: "Buscar",
      profile: "Perfil",
      rankings: "Rankings",
      settings: "Ajustes",
      help: "Ayuda",
    },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[280px] transform border-r border-white/10 bg-black/95 p-6 backdrop-blur transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white font-bold text-black">
              SK
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">ScoreKicks</p>
              <p className="text-xs text-white/45">Sneaker community</p>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-xl border border-white/10 px-3 py-1 text-sm text-white/70"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <Link href="/rankings" onClick={() => setMenuOpen(false)}>
            <div className="flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-medium text-white/85 transition hover:bg-white/[0.06]">
              {t[lang].rankings}
            </div>
          </Link>

          <Link href="/search" onClick={() => setMenuOpen(false)}>
            <div className="flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-medium text-white/85 transition hover:bg-white/[0.06]">
              {t[lang].search}
            </div>
          </Link>

          <Link href="/profile" onClick={() => setMenuOpen(false)}>
            <div className="flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-medium text-white/85 transition hover:bg-white/[0.06]">
              {t[lang].profile}
            </div>
          </Link>

          <button className="flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-medium text-white/85 transition hover:bg-white/[0.06]">
            {t[lang].settings}
          </button>

          <button className="flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-medium text-white/85 transition hover:bg-white/[0.06]">
            {t[lang].help}
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xl"
            >
              ☰
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white font-bold text-black">
                SK
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">ScoreKicks</p>
                <p className="text-xs text-white/40">Home feed</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("en")}
              className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                lang === "en"
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/[0.03] text-white/70"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                lang === "es"
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/[0.03] text-white/70"
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-28 pt-4">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1600&q=80"
            alt="Sneaker hero"
            className="h-[430px] w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">
              ScoreKicks
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {t[lang].welcome}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              {t[lang].tagline}
            </p>
          </div>
        </div>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                {t[lang].pair}
              </p>
              <h2 className="mt-2 text-3xl font-semibold">New Balance 2002R</h2>
            </div>
            <div className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black">
              8.8
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80"
                alt="Pair of the week"
                className="h-[320px] w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <p className="text-sm text-white/50">{t[lang].score}</p>
                <p className="mt-2 text-4xl font-semibold">8.8</p>

                <Link href={`/sneakers/${featuredSneakerId}`}>
                  <div className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black">
                    {t[lang].view}
                  </div>
                </Link>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                {[
                  ["Comfort", "8.9"],
                  ["Durability", "8.6"],
                  ["Walking", "9.0"],
                  ["Style", "8.7"],
                ].map(([label, value]) => (
                  <div key={label} className="mb-4 last:mb-0">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white/55">{label}</span>
                      <span>{value}</span>
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
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                {t[lang].trending}
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                {t[lang].trendingTitle}
              </h2>
            </div>

            <Link href="/rankings">
              <div className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/5">
                {t[lang].rankingsView}
              </div>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                id: "3c9a40b7-a49d-4a96-a7a6-ff2ad2d84fb2",
                brand: "Nike",
                name: "Jordan 1 Retro High",
                category: "Basketball",
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
              },
              {
                id: "be037db4-1afb-4030-b9ce-8e6972f6f249",
                brand: "New Balance",
                name: "2002R",
                category: "Lifestyle",
                image:
                  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
              },
              {
                id: "c8db1457-429f-41a9-a3e2-65d125311cef",
                brand: "Adidas",
                name: "Samba OG",
                category: "Lifestyle",
                image:
                  "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
              },
            ].map((item) => (
              <Link key={item.id} href={`/sneakers/${item.id}`}>
                <div className="cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 transition hover:border-white/20 hover:bg-black/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[220px] w-full object-cover"
                  />

                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                      {item.brand}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-white/55">{item.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              {t[lang].activity}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Sneaker activity with images
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                user: "Alex",
                textEn: "rated Nike Dunk Low Panda",
                textEs: "calificó Nike Dunk Low Panda",
                score: "8.5",
                image:
                  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
                sneakerId: "3c9a40b7-a49d-4a96-a7a6-ff2ad2d84fb2",
              },
              {
                user: "Maria",
                textEn: "added Adidas Samba to wishlist",
                textEs: "agregó Adidas Samba a wishlist",
                score: "8.4",
                image:
                  "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
                sneakerId: "c8db1457-429f-41a9-a3e2-65d125311cef",
              },
            ].map((item) => (
              <div
                key={item.user + item.score}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35"
              >
                <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                  <img
                    src={item.image}
                    alt={item.user}
                    className="h-[220px] w-full object-cover"
                  />
                  <div className="flex flex-col justify-between p-5 sm:p-6">
                    <div>
                      <p className="text-sm text-white/45">Community update</p>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight">
                        {item.user} {lang === "en" ? item.textEn : item.textEs}
                      </h3>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">
                        Score {item.score}
                      </span>

                      <Link href={`/sneakers/${item.sneakerId}`}>
                        <div className="rounded-2xl border border-white/15 px-4 py-2 text-sm font-medium text-white">
                          {t[lang].view}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-5xl grid-cols-3 px-4 py-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium text-white"
          >
            <span className="text-lg">⌂</span>
            <span>{t[lang].home}</span>
          </Link>

          <Link
            href="/search"
            className="flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium text-white/45"
          >
            <span className="text-lg">⌕</span>
            <span>{t[lang].search}</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium text-white/45"
          >
            <span className="text-lg">◉</span>
            <span>{t[lang].profile}</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}