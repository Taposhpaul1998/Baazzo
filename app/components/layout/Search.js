import Button from '../ui/Button';

export default function SearchForm() {
    return (
        <form
            action="/search"
            method="GET"
            role="search"
            className="flex w-full max-w-xl items-center overflow-hidden rounded-full border border-gray-300 bg-white transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100"
        >
            <input
                type="search"
                name="q"
                placeholder="Search products..."
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />

            <Button
                type="submit"
                aria-label="Search"
                className="flex h-11 w-14 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            </Button>
        </form>
    );
}
