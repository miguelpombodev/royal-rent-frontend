import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Calendar,
    CreditCard,
    Users,
    Fuel,
    Zap,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";
import CreditCardDisplay from "../../components/Checkout/CreditCardDisplay";
import useUserStore from "@/store/authStore";
import { cars } from "@/mock/cars.mock";

export default function CheckoutPage() {
    const { carId } = useParams<{
        carId: string;
    }>();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useUserStore();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    // Credit card form state
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    // Get car details
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
    // Set default dates
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        setStartDate(formatDate(today));
        setEndDate(formatDate(tomorrow));
    }, []);
    // Calculate total days and price
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
    const formatDate = (date: Date): string => {
        return date.toISOString().split("T")[0];
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            // Process payment
            setIsProcessing(true);
            // Simulate payment processing
            setTimeout(() => {
                setIsProcessing(false);
                setIsComplete(true);
            }, 2000);
        }
    };
    // Format card number with spaces
    const formatCardNumberInput = (value: string) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "");
        // Limit to 16 digits (or 15 for Amex)
        const isAmex = /^3[47]/.test(digits);
        const maxLength = isAmex ? 15 : 16;
        const truncated = digits.substring(0, maxLength);
        // Format with spaces
        let formatted = "";
        if (isAmex) {
            // Format as 4-6-5 for Amex
            for (let i = 0; i < truncated.length; i++) {
                if (i === 4 || i === 10) formatted += " ";
                formatted += truncated[i];
            }
        } else {
            // Format as 4-4-4-4 for others
            for (let i = 0; i < truncated.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += " ";
                formatted += truncated[i];
            }
        }
        return formatted;
    };
    // Format expiry date as MM/YY
    const formatExpiryDate = (value: string) => {
        const digits = value.replace(/\D/g, "");
        const truncated = digits.substring(0, 4);
        if (truncated.length > 2) {
            return truncated.substring(0, 2) + "/" + truncated.substring(2);
        }
        return truncated;
    };
    // Handle card number input
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumberInput(e.target.value);
        setCardNumber(formatted);
    };
    // Handle expiry date input
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        setCardExpiry(formatted);
    };
    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/login");
        }
    }, [isAuthenticated, loading, navigate]);
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
                                {user?.email}.
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
                        {/* Checkout Form */}
                        <div className="flex-grow">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h1 className="text-2xl font-bold mb-6">
                                    Checkout
                                </h1>
                                {/* Step indicator */}
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
                                <form onSubmit={handleSubmit}>
                                    {step === 1 && (
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
                                                        type="text"
                                                        defaultValue={
                                                            user?.userName || ""
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
                                                        type="email"
                                                        defaultValue={
                                                            user?.email || ""
                                                        }
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                                        type="tel"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <h2 className="text-lg font-semibold">
                                                Payment Method
                                            </h2>
                                            <div className="space-y-4">
                                                <div
                                                    className={`border rounded-md p-4 cursor-pointer ${
                                                        paymentMethod ===
                                                        "credit"
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-300"
                                                    }`}
                                                    onClick={() =>
                                                        setPaymentMethod(
                                                            "credit"
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id="credit"
                                                            name="paymentMethod"
                                                            checked={
                                                                paymentMethod ===
                                                                "credit"
                                                            }
                                                            onChange={() =>
                                                                setPaymentMethod(
                                                                    "credit"
                                                                )
                                                            }
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <label
                                                            htmlFor="credit"
                                                            className="ml-2 block text-sm font-medium text-gray-700"
                                                        >
                                                            Credit Card
                                                        </label>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`border rounded-md p-4 cursor-pointer ${
                                                        paymentMethod ===
                                                        "paypal"
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-300"
                                                    }`}
                                                    onClick={() =>
                                                        setPaymentMethod(
                                                            "paypal"
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id="paypal"
                                                            name="paymentMethod"
                                                            checked={
                                                                paymentMethod ===
                                                                "paypal"
                                                            }
                                                            onChange={() =>
                                                                setPaymentMethod(
                                                                    "paypal"
                                                                )
                                                            }
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <label
                                                            htmlFor="paypal"
                                                            className="ml-2 block text-sm font-medium text-gray-700"
                                                        >
                                                            PayPal
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {paymentMethod === "credit" && (
                                                <div className="space-y-4 mt-4">
                                                    {/* Credit Card Display Component */}
                                                    <CreditCardDisplay
                                                        cardNumber={cardNumber}
                                                        cardName={cardName}
                                                        cardExpiry={cardExpiry}
                                                    />
                                                    <div>
                                                        <label
                                                            htmlFor="cardNumber"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Card Number
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                id="cardNumber"
                                                                type="text"
                                                                placeholder="1234 5678 9012 3456"
                                                                value={
                                                                    cardNumber
                                                                }
                                                                onChange={
                                                                    handleCardNumberChange
                                                                }
                                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                required
                                                                maxLength={19} // 16 digits + 3 spaces
                                                            />
                                                            <CreditCard
                                                                size={18}
                                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Try these prefixes
                                                            for different card
                                                            types:
                                                            <br />• Visa: 4... •
                                                            Mastercard: 51-55...
                                                            • Amex: 34 or 37...
                                                            • Premium cards:
                                                            4000...
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label
                                                                htmlFor="expiry"
                                                                className="block text-sm font-medium text-gray-700 mb-1"
                                                            >
                                                                Expiry Date
                                                            </label>
                                                            <input
                                                                id="expiry"
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                value={
                                                                    cardExpiry
                                                                }
                                                                onChange={
                                                                    handleExpiryChange
                                                                }
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                required
                                                                maxLength={5} // MM/YY
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="cvv"
                                                                className="block text-sm font-medium text-gray-700 mb-1"
                                                            >
                                                                CVV
                                                            </label>
                                                            <input
                                                                id="cvv"
                                                                type="text"
                                                                placeholder="123"
                                                                value={cardCvv}
                                                                onChange={(e) =>
                                                                    setCardCvv(
                                                                        e.target.value
                                                                            .replace(
                                                                                /\D/g,
                                                                                ""
                                                                            )
                                                                            .substring(
                                                                                0,
                                                                                4
                                                                            )
                                                                    )
                                                                }
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                required
                                                                maxLength={4} // 3 for Visa/MC, 4 for Amex
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="nameOnCard"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Name on Card
                                                        </label>
                                                        <input
                                                            id="nameOnCard"
                                                            type="text"
                                                            placeholder="John Doe"
                                                            value={cardName}
                                                            onChange={(e) =>
                                                                setCardName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="mt-8 flex justify-between">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setStep(step - 1)
                                                }
                                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                            >
                                                Back
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={isProcessing}
                                            className={`${
                                                step === 1 ? "ml-auto" : ""
                                            } bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center ${
                                                isProcessing
                                                    ? "opacity-70 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            {isProcessing && (
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                            )}
                                            {step === 1
                                                ? "Continue to Payment"
                                                : "Complete Booking"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* Order Summary */}
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
