import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Calendar,
    Users,
    Fuel,
    Zap,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "@/components/Checkout/StripePaymentForm";
import useUserStore from "@/store/authStore";
import { cars } from "@/mock/cars.mock";
import type { BookingData } from "@/components/Checkout/checkout.interface";
const stripePromise = loadStripe(
    "pk_test_51RrLP6K8lkx1ecppfmb69GNpIPwp8bMAALFWmsugR80V5WBrcrvtu2uuUhpB6nRbfkUiFygZjPGOfQrpRghfyiml00c7vAqRlj"
);

export default function CheckoutPage() {
    const { carId } = useParams<{ carId: string }>();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useUserStore();

    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const [step, setStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    useEffect(() => {
        if (carId) {
            const foundCar = cars.find((c) => c.id === carId);
            if (foundCar) {
                setCar(foundCar);
                setTotalPrice(foundCar.price);
            } else {
                navigate("/cars");
            }
        }
        setLoading(false);
    }, [carId, navigate]);

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        setStartDate(formatDate(today));
        setEndDate(formatDate(tomorrow));
    }, []);

    useEffect(() => {
        if (user) {
            setCustomerName(user.userName || "");
            setCustomerEmail(user.email || "");
        }
    }, [user]);

    useEffect(() => {
        if (startDate && endDate && car) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setTotalDays(diffDays || 1);
            setTotalPrice(car.price * (diffDays || 1));
        }
    }, [startDate, endDate, car]);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/login");
        }
    }, [isAuthenticated, loading, navigate]);

    const formatDate = (date: Date): string => {
        return date.toISOString().split("T")[0];
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        setCustomerName(formData.get("name") as string);
        setCustomerPhone(formData.get("phone") as string);

        setStep(2);
    };

    const handlePaymentSuccess = () => {
        setIsComplete(true);
    };

    const bookingData: BookingData = {
        carId: carId!,
        startDate,
        endDate,
        totalDays,
        totalPrice,
        customerName,
        customerEmail,
        customerPhone,
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isComplete) {
        return (
            <div className="bg-gray-50 min-h-screen w-full py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                <CheckCircle
                                    size={32}
                                    className="text-green-600"
                                />
                            </div>
                            <h1 className="text-2xl font-bold mb-4">
                                Booking Confirmed!
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Your rental has been successfully booked. A
                                confirmation email has been sent to{" "}
                                {customerEmail}.
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                                <h3 className="font-semibold mb-2">
                                    {car?.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div>Pickup Date: {startDate}</div>
                                    <div>Return Date: {endDate}</div>
                                    <div>Total Days: {totalDays}</div>
                                    <div>Total Price: ${totalPrice}</div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/profile"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    View My Bookings
                                </Link>
                                <Link
                                    to="/"
                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen w-full py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <Link
                        to="/cars"
                        className="inline-flex items-center text-blue-600 mb-6 hover:underline"
                    >
                        <ArrowLeft size={18} className="mr-1" />
                        Back to cars
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-grow">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h1 className="text-2xl font-bold mb-6">
                                    Checkout
                                </h1>

                                <div className="flex mb-8">
                                    <div className="flex-1">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                                                step >= 1
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            1
                                        </div>
                                        <div className="text-xs text-center mt-1">
                                            Rental Details
                                        </div>
                                    </div>
                                    <div className="flex-1 relative">
                                        <div className="absolute top-4 w-full">
                                            <div
                                                className={`h-0.5 ${
                                                    step >= 2
                                                        ? "bg-blue-600"
                                                        : "bg-gray-200"
                                                }`}
                                            ></div>
                                        </div>
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto relative z-10 ${
                                                step >= 2
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            2
                                        </div>
                                        <div className="text-xs text-center mt-1">
                                            Payment
                                        </div>
                                    </div>
                                    <div className="flex-1 relative">
                                        <div className="absolute top-4 w-full">
                                            <div
                                                className={`h-0.5 ${
                                                    step >= 3
                                                        ? "bg-blue-600"
                                                        : "bg-gray-200"
                                                }`}
                                            ></div>
                                        </div>
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto relative z-10 ${
                                                step >= 3
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            3
                                        </div>
                                        <div className="text-xs text-center mt-1">
                                            Confirmation
                                        </div>
                                    </div>
                                </div>

                                {step === 1 && (
                                    <form onSubmit={handleStep1Submit}>
                                        <div className="space-y-6">
                                            <h2 className="text-lg font-semibold">
                                                Rental Period
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        htmlFor="startDate"
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                    >
                                                        Pickup Date
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            id="startDate"
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) =>
                                                                setStartDate(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            min={formatDate(
                                                                new Date()
                                                            )}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                        <Calendar
                                                            size={18}
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="endDate"
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                    >
                                                        Return Date
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            id="endDate"
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) =>
                                                                setEndDate(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            min={
                                                                startDate ||
                                                                formatDate(
                                                                    new Date()
                                                                )
                                                            }
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                        <Calendar
                                                            size={18}
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h2 className="text-lg font-semibold pt-4">
                                                Personal Information
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        defaultValue={
                                                            customerName
                                                        }
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={customerEmail}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                                        required
                                                        readOnly
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Continue to Payment
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-lg font-semibold">
                                            Payment
                                        </h2>

                                        <Elements stripe={stripePromise}>
                                            <StripePaymentForm
                                                totalPrice={totalPrice}
                                                bookingData={bookingData}
                                                onSuccess={handlePaymentSuccess}
                                                onBack={() => setStep(1)}
                                            />
                                        </Elements>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-semibold mb-4">
                                    Rental Summary
                                </h2>
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={car?.image}
                                        alt={car?.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            {car?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {car?.category
                                                .charAt(0)
                                                .toUpperCase() +
                                                car?.category.slice(1)}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex items-center">
                                        <Users
                                            size={16}
                                            className="text-gray-500 mr-2"
                                        />
                                        <span>{car?.seats} seats</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Zap
                                            size={16}
                                            className="text-gray-500 mr-2"
                                        />
                                        <span>{car?.transmission}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Fuel
                                            size={16}
                                            className="text-gray-500 mr-2"
                                        />
                                        <span>{car?.fuelType}</span>
                                    </div>
                                </div>
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Dates
                                        </span>
                                        <span className="text-sm">
                                            {startDate} to {endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Duration
                                        </span>
                                        <span>
                                            {totalDays} day
                                            {totalDays !== 1 ? "s" : ""}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Daily Rate
                                        </span>
                                        <span>${car?.price}/day</span>
                                    </div>
                                </div>
                                <div className="border-t mt-4 pt-4">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
