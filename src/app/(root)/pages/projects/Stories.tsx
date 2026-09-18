"use client"
import React, { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
 
interface Testimonial {
  id: string;
  brand: string;
  quote: string;
  name: string;
  role: string;
  image: string;
}
 
const testimonials: Testimonial[] = [
  {
    id: "agrofield",
    brand: "AgroField",
    quote:
      "The platform was easy to implement and delivered value fast. Within the first month, we improved irrigation planning and reduced input costs significantly.",
    name: "Michael Thompson",
    role: "AgroField, Iowa",
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "cropsense",
    brand: "CropSense",
    quote:
      "Real-time field data completely changed how we manage our crops. We're making smarter decisions and seeing healthier yields season after season.",
    name: "Sarah Williams",
    role: "CropSense, California",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "terragrow",
    brand: "TerraGrow",
    quote:
      "Soil health monitoring used to take days of guesswork. Now we get answers in minutes and our fields have never looked better.",
    name: "Daniel Reyes",
    role: "TerraGrow, Nebraska",
    image:
      "https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "fieldlogic",
    brand: "FieldLogic",
    quote:
      "Coordinating our whole crew used to be chaos during harvest. The scheduling tools alone paid for the subscription in the first season.",
    name: "Priya Nair",
    role: "FieldLogic, Texas",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "farmsync",
    brand: "FarmSync",
    quote:
      "We finally have one place to track equipment, weather, and yield history. It feels like the tool was built by people who actually farm.",
    name: "James Okafor",
    role: "FarmSync, Ohio",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop",
  },
];
 
export default function Stories() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeBrand, setActiveBrand] = useState(testimonials[0].brand);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });
 
  // Keep the brand pill row in sync with whichever card is closest to the
  // left edge of the scroller as the user drags or scrolls.
  const syncActiveBrand = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    let closest = cards[0];
    let closestDist = Infinity;
    cards.forEach((card) => {
      const dist = Math.abs(card.offsetLeft - el.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = card;
      }
    });
    const brand = closest?.dataset.brand;
    if (brand) setActiveBrand(brand);
  }, []);
 
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncActiveBrand, { passive: true });
    return () => el.removeEventListener("scroll", syncActiveBrand);
  }, [syncActiveBrand]);
 
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };
 
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
  };
 
  const endDrag = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    setIsDragging(false);
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* no-op */
      }
    }
  };
 
  // Suppress the "Read more" click that would otherwise fire right after a drag.
  const onCardClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
 
  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 400;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };
 
  const scrollToBrand = (brand: string) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`[data-brand="${brand}"]`);
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  };
 
  return (
    <section className="w-full bg-white px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-1.5 text-sm text-stone-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
              Testimonials
            </span>
            <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-emerald-950 sm:text-6xl">
              Real Stories Shared
              <br />
              <span className="font-serif italic font-normal">by Our Farmers</span>
            </h2>
          </div>
          {/* <p className="max-w-sm text-lg text-start   leading-relaxed text-stone-500  ">
            Hear directly from farmers who use our solutions every day and see
            real impact across their fields and harvests.
          </p> */}
        </div>
 
        {/* Scroller */}
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onCardClickCapture}
          className={`no-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-2 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {testimonials.map((t) => (
            <article
              key={t.id}
              data-card
              data-brand={t.brand}
              className="grid w-[90vw] shrink-0 snap-start grid-cols-[1fr_auto] items-stretch gap-6 rounded-3xl bg-stone-100 p-6 sm:w-[720px]"
            >
              <div className="flex flex-col justify-between py-1">
                <Quote
                  className="mb-4 h-7 w-7 fill-stone-300 text-stone-300"
                  strokeWidth={0}
                />
                <p className="text-lg leading-snug text-emerald-950">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-end justify-between  ">
                  <div>
                    <p className="font-medium text-emerald-950">{t.name}</p>
                    <p className="text-sm text-stone-500">{t.role}</p>
                  </div>
                  {/* <a
                    href="#"
                    draggable={false}
                    className="flex shrink-0  items-center gap-1 text-sm text-stone-500 transition hover:text-emerald-800"
                  >
                    Read more
                    <ChevronRight className="h-4 w-4" />
                  </a> */}
                </div>
              </div>
              <img
                src={t.image}
                alt={t.name}
                draggable={false}
                className="h-72 w-56 rounded-2xl object-cover sm:w-72"
              />
            </article>
          ))}
        </div>
 
        {/* Footer: brand pills + arrows */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            {testimonials.map((t) => (
              <button
                key={t.id}
                onClick={() => scrollToBrand(t.brand)}
                className={`text-sm transition ${
                  activeBrand === t.brand
                    ? "font-semibold text-emerald-950"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {t.brand}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-emerald-950 transition hover:bg-stone-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-900 text-white transition hover:bg-emerald-800"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
 
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
 
