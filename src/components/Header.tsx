// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
import useUserStore from "@/store/authStore";
import { Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useUserStore();

    const handleLogout = () => {
        // logout()
        navigate("/");
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                {/* Left side */}
                <div className="flex justify-between items-center">
                    {/* <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-36 p-1 md:hidden"
                        ></PopoverContent>
                    </Popover> */}

                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-blue-600"
                    >
                        <Crown size={28} strokeWidth={2} />
                        <span className="text-xl font-bold">RoyalRent</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/cars"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Cars
                        </Link>
                        {isAuthenticated ? (
                            <div className="relative group">
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <img
                                        src={user?.avatar}
                                        alt={user?.userName}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-gray-700">
                                        {user?.userName}
                                    </span>
                                </div>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

// {isAuthenticated ? (
//   <div className="relative group">
//     <div className="flex items-center space-x-2 cursor-pointer">
//       <img
//         src={avatar}
//         alt={name}
//         className="w-8 h-8 rounded-full object-cover"
//       />
//       <span className="text-gray-700">{name}</span>
//     </div>
//     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
//       <Link
//         to="/profile"
//         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//       >
//         My Profile
//       </Link>
//       <button
//         onClick={handleLogout}
//         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//       >
//         Logout
//       </button>
//     </div>
//   </div>
// ) : (
