import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Find Your Perfect Ride for Any Adventure
                    </h1>
                    <p className="text-xl mb-8 text-blue-100">
                        Premium car rental service with a wide range of vehicles
                        to suit your needs. Book easily and hit the road in
                        minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/cars"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-center transition-colors"
                        >
                            Browse Cars
                        </Link>
                        <Link
                            to="/login"
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium text-center transition-colors"
                        >
                            Sign Up Now
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full z-0 opacity-20 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Car silhouette"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
}
