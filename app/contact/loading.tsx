import PageLoader from "@/app/components/ui/PageLoader";

/**
 * Next.js route-level loading file for /contact.
 * Automatically shown while the page is loading.
 * Uses the YouTube-style PageLoader — same style for all future pages.
 */
export default function ContactLoading() {
  return <PageLoader />;
}
