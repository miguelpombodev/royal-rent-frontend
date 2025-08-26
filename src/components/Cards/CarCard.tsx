import React from "react";
import { Link } from "react-router-dom";
import { Users, Fuel, Zap } from "lucide-react";
import { convertCurrencyToBRL } from "@/utils/currency.utils";

type CarCardProps = {
    name: string;
    category: string;
    price: number;
    image: string;
    seats: number;
    transmission: string;
    fuelType: string;
    description: string;
    featured?: boolean;
};

const CarCard: React.FC<CarCardProps> = ({
    name,
    category,
    price,
    image,
    seats,
    transmission,
    fuelType,
    description,
    featured,
}) => {
    return (
        <>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .shimmer-effect::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(59, 130, 246, 0.3),
                        transparent
                    );
                    transform: translateX(-100%);
                    animation: shimmer 2s infinite;
                    border-radius: inherit;
                }
            `}</style>

            <div
                className={`bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 relative ${
                    featured ? "border-2 border-blue-500 shimmer-effect" : ""
                }`}
            >
                <div className="relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-48 object-scale-down"
                    />
                    {featured && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                        </div>
                    )}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{name}</h3>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-blue-600 font-bold">
                            {convertCurrencyToBRL(price)}
                            <span className="text-gray-500 font-normal text-sm">
                                /day
                            </span>
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            <span>{seats} seats</span>
                        </div>
                        <div className="flex items-center">
                            <Zap size={16} className="mr-1" />
                            <span>{transmission}</span>
                        </div>
                        <div className="flex items-center">
                            <Fuel size={16} className="mr-1" />
                            <span>{fuelType}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {description}
                    </p>
                    <Link
                        to={`/checkout/${name}`}
                        className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Rent Now
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CarCard;
