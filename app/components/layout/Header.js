
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from "next/link";
import NaNavigation from './Navigation';
import Search from './Search';

export default function Header() {
    return (
        <>
            <div className="bg-gray-300 text-gray-700 text-sm px-8 py-2 text-center font-sans font-medium">
                <p>🟢 WhatsApp: +880 1635701781  |  📞 Hotline: +880 1635701781  |  🕒 Customer Support: 10 AM – 9 PM </p>
            </div>
            <div className="px-8 py-5 bg-gray-100">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div>
                        <Link href="/">
                            <Image src="/bazzoLogo.png" alt="Logo" width={150} height={100} />
                        </Link>
                    </div>

                    <Search />

                    <div className="flex space-x-4 text-gray-600">
                        <Link href="https://www.facebook.com/baazzo1" target="_blank" rel="noopener noreferrer"
                            className='hover:text-orange-500 dilay-300 duration-75'>
                            <FontAwesomeIcon icon={faSquareFacebook} className='text-2xl' />
                        </Link>
                        <Link href="/cart" className='hover:text-orange-500 dilay-300 duration-75'>
                            <FontAwesomeIcon icon={faShoppingCart}
                                className='text-2xl' />
                        </Link>
                        <Link href="/login" className='hover:text-orange-500 dilay-300 duration-75'>
                            <FontAwesomeIcon icon={faUser}
                                className='text-2xl' />
                        </Link>

                    </div>
                </div>
                <div className="mt-4">
                    <NaNavigation />
                </div>
            </div>
        </>
    )
}
