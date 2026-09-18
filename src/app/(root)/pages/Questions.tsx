import React, { useState } from "react";
import { Plus } from "lucide-react"; 
import PlantGrowthAnimation from "./components/Plantgrowthanimation";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    id: "sustainable",
    question: "Does Agrovia support sustainable farming?",
    answer:
      "Yes. Agrovia is built around resource-efficient practices, helping you cut water and input waste while keeping soil healthy for the long run.",
  },
  {
    id: "multiple-fields",
    question: "Can I monitor multiple fields at once?",
    answer:
      "Absolutely. Agrovia allows you to manage and track multiple fields from a single dashboard for better control and visibility.",
  },
  {
    id: "get-started",
    question: "How do I get started with Agrovia?",
    answer:
      "Create an account, add your first field, and connect any sensors you already have. Most farmers are up and running in under fifteen minutes.",
  },
  {
    id: "non-technical",
    question: "Is Agrovia easy to use for non-technical farmers?",
    answer:
      "Yes, the interface was designed with everyday farmers in mind. No special training is needed to read your dashboard or set up alerts.",
  },
  {
    id: "reduce-costs",
    question: "Can Agrovia help reduce farming costs?",
    answer:
      "By showing you exactly when and where to water, fertilize, or treat crops, Agrovia helps cut down on wasted inputs and unnecessary labor.",
  },
];

export default function Questions() {
  const [openId, setOpenId] = useState<string | null>("multiple-fields");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 pb-56 pt-20 sm:px-10 sm:pb-64">
      {/* Background layer: full-bleed, pinned to the bottom, behind everything */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <PlantGrowthAnimation />
      </div>

      {/* Foreground content, sits above the animation */}
      <div className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
            Common Farmer{" "}
            <span className="font-serif italic font-normal">Questions</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-stone-500">
            Got questions? We've got answers to help you get the most out of
            Agrovia.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                onClick={() => toggle(faq.id)}
                className="cursor-pointer rounded-2xl bg-stone-100 px-6 py-5 transition-colors"
              >
                <div className="flex items-center justify-between gap-6">
                  <h3 className="text-lg font-medium text-emerald-950 sm:text-xl">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      isOpen ? "bg-emerald-900" : "bg-white"
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-45 text-white" : "rotate-0 text-emerald-950"
                      }`}
                    />
                  </span>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-14 text-base leading-relaxed text-stone-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}