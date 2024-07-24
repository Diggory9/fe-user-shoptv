const Footer = () => {
    return (
        <footer className="relative w-full bg-gray-100 py-10 border-t-2">
            <div className="w-full px-8 mx-auto max-w-7xl">
                <div className="grid justify-between grid-cols-1 gap-8 md:grid-cols-3">
                    <h5 className="col-span-3 mb-6 font-sans text-xl font-semibold text-center text-gray-800 md:col-span-1 md:mb-0">
                        Shop TV
                    </h5>
                    <div className="grid grid-cols-1 gap-8 md:col-span-2 md:grid-cols-3">
                        <ul className="text-center">
                            <p className="mb-3 font-sans text-sm font-medium text-gray-500">
                                Product
                            </p>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Solutions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Tutorials
                                </a>
                            </li>
                        </ul>
                        <ul className="text-center">
                            <p className="mb-3 font-sans text-sm font-medium text-gray-500">
                                Company
                            </p>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    About us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Press
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    News
                                </a>
                            </li>
                        </ul>
                        <ul className="text-center">
                            <p className="mb-3 font-sans text-sm font-medium text-gray-500">
                                Resource
                            </p>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Newsletter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Events
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-1.5 font-sans text-base font-normal text-gray-700 transition-colors hover:text-gray-900"
                                >
                                    Help center
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-gray-300 md:flex-row md:justify-between">
                    <p className="mb-4 font-sans text-sm font-normal text-center text-gray-500 md:mb-0">
                        © 2024{" "}
                        <a
                            href="https://material-tailwind.com/"
                            className="hover:underline"
                        >
                            ShopTV
                        </a>
                        . All Rights Reserved.
                    </p>
                    <div className="flex gap-4 text-gray-500">
                        <a
                            href="#"
                            className="transition-opacity opacity-80 hover:opacity-100"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="transition-opacity opacity-80 hover:opacity-100"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.1 3.1 0 00-.748-1.15c-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zm-1.354 4.246a.459.459 0 00-.457.458v6.978a.459.459 0 00.457.458h6.978a.459.459 0 00.457-.458V8.506a.459.459 0 00-.457-.458h-6.978zm3.488 1.064a2.424 2.424 0 100 4.847 2.424 2.424 0 000-4.847zm0 1.064a1.36 1.36 0 110 2.722 1.36 1.36 0 010-2.722zm3.018-1.96a.561.561 0 100 1.122.561.561 0 000-1.122z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="transition-opacity opacity-80 hover:opacity-100"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.478 2 2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
