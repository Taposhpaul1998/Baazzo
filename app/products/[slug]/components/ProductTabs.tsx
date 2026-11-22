"use client";

import { useState } from "react";
import { FiStar, FiUser, FiSend } from "react-icons/fi";

interface Props {
  description: string;
  attributes: { id: number; name: string; options: string[]; visible: boolean }[];
  sku: string;
  productId: number;
  averageRating: string;
  ratingCount: number;
}

const TABS = ["Description", "Reviews"] as const;
type Tab = (typeof TABS)[number];

// ── Static mock reviews (real reviews WooCommerce API দিয়ে পরে connect করা যাবে) ──
const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Rahim Uddin",
    rating: 5,
    date: "2026-10-12",
    comment:
      "অসাধারণ প্রোডাক্ট! Quality অনেক ভালো। ডেলিভারি সময়মতো পেয়েছি। Baazzo থেকে কিনে সত্যিই খুশি।",
  },
  {
    id: 2,
    name: "Nasrin Akter",
    rating: 4,
    date: "2026-09-28",
    comment:
      "Product টা expected এর চেয়ে ভালো। Build quality solid। একটু দাম বেশি মনে হলেও value for money।",
  },
  {
    id: 3,
    name: "Kamal Hossain",
    rating: 5,
    date: "2026-09-15",
    comment:
      "Best purchase! Already 3 weeks use করছি, কোনো সমস্যা নেই। Highly recommended।",
  },
];

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${star} star`}
          className="transition-transform hover:scale-110"
        >
          <FiStar
            className={`w-6 h-6 transition-colors ${
              star <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "text-slate-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 w-4 shrink-0">{star}</span>
      <FiStar className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-slate-600 w-6 text-right shrink-0">{count}</span>
    </div>
  );
}

export default function ProductTabs({
  description,
  attributes,
  sku,
  productId,
  averageRating,
  ratingCount,
}: Props) {
  const [active, setActive] = useState<Tab>("Description");

  // Review form state
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(0);
  const [formComment, setFormComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Local reviews list (mock + user submitted)
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  const avgNum = parseFloat(averageRating) || 0;
  const totalReviews = ratingCount || reviews.length;

  // Rating distribution (mock)
  const dist: Record<number, number> = { 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!formName.trim()) return setFormError("Please enter your name.");
    if (formRating === 0) return setFormError("Please select a star rating.");
    if (formComment.trim().length < 10)
      return setFormError("Review must be at least 10 characters.");

    setSubmitting(true);
    // Simulate async submit (TODO: connect to WooCommerce reviews API)
    setTimeout(() => {
      setReviews((prev) => [
        {
          id: Date.now(),
          name: formName.trim(),
          rating: formRating,
          date: new Date().toISOString().slice(0, 10),
          comment: formComment.trim(),
        },
        ...prev,
      ]);
      setSubmitted(true);
      setSubmitting(false);
      setFormName("");
      setFormRating(0);
      setFormComment("");
    }, 800);
  }

  // suppress unused warning — productId will be used when connecting real API
  void productId;
  void sku;
  void attributes;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      {/* ── Tab bar ── */}
      <div className="flex border-b border-slate-800">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-3.5 text-sm font-semibold transition-colors relative ${
              active === tab
                ? "text-primary"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
            {tab === "Reviews" && totalReviews > 0 && (
              <span className="ml-1.5 text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                {totalReviews}
              </span>
            )}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="p-5 sm:p-6">

        {/* Description tab */}
        {active === "Description" && (
          description ? (
            <div
              className="prose prose-invert prose-sm max-w-none
                text-slate-300
                [&_h1]:text-white [&_h2]:text-white [&_h3]:text-slate-100
                [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base
                [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold
                [&_h1]:mt-5 [&_h2]:mt-5 [&_h3]:mt-4
                [&_p]:text-slate-400 [&_p]:leading-relaxed [&_p]:mb-3
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-slate-400
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:text-slate-400
                [&_li]:leading-relaxed
                [&_strong]:text-slate-200 [&_strong]:font-semibold
                [&_a]:text-primary [&_a]:hover:underline
                [&_hr]:border-slate-800 [&_hr]:my-4
                [&_table]:w-full [&_table]:text-sm
                [&_th]:text-left [&_th]:p-2.5 [&_th]:border-b [&_th]:border-slate-700 [&_th]:text-slate-300 [&_th]:font-semibold
                [&_td]:p-2.5 [&_td]:border-b [&_td]:border-slate-800 [&_td]:text-slate-400
                [&_tr:last-child_td]:border-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">
              No description available.
            </p>
          )
        )}

        {/* Reviews tab */}
        {active === "Reviews" && (
          <div className="flex flex-col gap-8">

            {/* ── Rating summary ── */}
            <div className="flex flex-col sm:flex-row gap-6 p-5 bg-slate-800/50 rounded-2xl border border-slate-800">
              {/* Overall score */}
              <div className="flex flex-col items-center justify-center gap-1 sm:w-36 shrink-0">
                <span className="text-5xl font-extrabold text-white">
                  {avgNum > 0 ? avgNum.toFixed(1) : (reviews.length > 0 ? "4.7" : "0")}
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(avgNum || 4.7)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500">
                  {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Bar chart */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {[5, 4, 3, 2, 1].map((s) => (
                  <RatingBar
                    key={s}
                    star={s}
                    count={dist[s] ?? 0}
                    total={Object.values(dist).reduce((a, b) => a + b, 0)}
                  />
                ))}
              </div>
            </div>

            {/* ── Review list ── */}
            {reviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-800"
                  >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <FiUser className="w-4 h-4 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Name + date + stars */}
                      <div className="flex items-start justify-between gap-2 flex-wrap mb-1.5">
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            {review.name}
                          </p>
                          <p className="text-xs text-slate-600">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FiStar
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">
                No reviews yet. Be the first to review!
              </p>
            )}

            {/* ── Write a review form ── */}
            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-base font-bold text-white mb-4">
                Write a Review
              </h3>

              {submitted ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <p className="text-sm text-emerald-400 font-medium">
                    Thank you! Your review has been submitted.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rahim Uddin"
                      maxLength={60}
                      className="w-full px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Star rating */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Your Rating
                    </label>
                    <StarPicker value={formRating} onChange={setFormRating} />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Your Review
                    </label>
                    <textarea
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="Share your experience with this product…"
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    <p className="text-xs text-slate-700 mt-1 text-right">
                      {formComment.length}/500
                    </p>
                  </div>

                  {/* Error */}
                  {formError && (
                    <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                      {formError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="self-start flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
