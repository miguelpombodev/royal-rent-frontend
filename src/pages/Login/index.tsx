import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
import useUserStore from "@/store/authStore";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            const success = await login(email, password);
            if (success) {
                navigate("/");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred during login");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const success = await loginWithGoogle();
            if (success) {
                navigate("/");
            }
        } catch (err) {
            setError("An error occurred during Google login");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-600 text-white p-3 rounded-full">
                            <Car size={24} />
                        </div>
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
                        {isLogin
                            ? "Sign in to your account"
                            : "Create a new account"}
                    </h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-medium mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading
                                    ? "Processing..."
                                    : isLogin
                                    ? "Sign In"
                                    : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 24 24"
                                >
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path
                                            fill="#4285F4"
                                            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                        />
                                    </g>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            {isLogin
                                ? "Need an account? Sign up"
                                : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
