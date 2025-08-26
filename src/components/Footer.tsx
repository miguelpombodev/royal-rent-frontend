import { Link } from "react-router-dom";
import {
    Crown,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-white mb-4"
                        >
                            <Crown size={28} strokeWidth={2} />
                            <span className="text-xl font-bold">RoyalRent</span>
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Premium car rental service providing you with the
                            best vehicles for your needs.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cars"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Cars
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Car Categories
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/cars?category=sedan"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Sedan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cars?category=suv"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    SUV
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cars?category=luxury"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Luxury
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cars?category=convertible"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Convertible
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cars?category=electric"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Electric
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin
                                    size={20}
                                    className="text-gray-400 flex-shrink-0 mt-1"
                                />
                                <span className="text-gray-400">
                                    123 Rental Street, Car City, 10001
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-gray-400" />
                                <span className="text-gray-400">
                                    +1 (555) 123-4567
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-gray-400" />
                                <span className="text-gray-400">
                                    info@RoyalRent.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} RoyalRent. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
