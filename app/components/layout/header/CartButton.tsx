import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface CartButtonProps {
  itemCount?: number;
  totalPrice?: string;
  isMobile?: boolean;
}

export default function CartButton({
  itemCount = 0,
  totalPrice = "৳ 0.00",
  isMobile = false,
}: CartButtonProps) {
  if (isMobile) {
    return (
      <Link
        href="/cart"
        aria-label={`Shopping cart with ${itemCount} items`}
        className="relative p-2 text-slate-700 hover:text-primary transition-colors flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
        {/* Top-Right Badge */}
        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-sm">
          {itemCount}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 group"
    >
      <div className="relative">
        <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
        {/* Top-Right Badge */}
        <span className="absolute -top-2.5 -right-2.5 bg-dark-base text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          {itemCount}
        </span>
      </div>
      <span className="hidden sm:inline font-semibold">{totalPrice}</span>
    </Link>
  );
}
