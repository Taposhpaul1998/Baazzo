import FooterNavigation from "./FooterNavigation";

export default function Footer() {
    return (
        <div>
            <div className="bg-gray-900 px-8 py-15 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center md:text-left text-gray-300 text-sm font-normal font-sans">
                    <h3 className="text-lg font-heading font-medium text-gray-100">Contact us</h3>
                    <div className=" mt-2 space-y-1">
                        <p>Phone: 01635701781</p>
                        <p>Email: support@baazzo.com</p>
                    </div>
                    <p className="mt-3">
                        236/2 commissioner goli, East Nakhalpara, Tejgoan, Dhaka 1215, Dhaka, Dhaka Division, Bangladesh
                    </p>
                </div>
                <div>
                    <FooterNavigation />
                </div>
                <div className="w-full overflow-hidden rounded-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29210.85986664403!2d90.37629065522049!3d23.770281223229393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s236%2F2%20commissioner%20goli%2C%20East%20Nakhalpara%2C%20Tejgoan%2C%20Dhaka%201215%2C%20Dhaka%2C%20Dhaka%20Division%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1793621698447!5m2!1sen!2sbd"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title="Baazzo Office Location"
                    />
                </div>
            </div>
            <div className="bg-gray-100 text-center">
                <p className="text-center text-gray-600 text-sm py-4 font-sans font-medium">© 2026 Baazzo. All rights reserved.</p>
            </div>
        </div>
    )
}
