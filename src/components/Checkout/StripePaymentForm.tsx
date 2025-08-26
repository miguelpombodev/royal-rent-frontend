import React, { useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { CreditCard, User, Calendar, Lock } from "lucide-react";

interface BookingData {
    carId: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

interface StripePaymentFormProps {
    totalPrice: number;
    bookingData: BookingData;
    onSuccess: () => void;
    onBack: () => void;
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: "16px",
            color: "#424770",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#9e2146",
        },
    },
};

export default function StripePaymentForm({
    totalPrice,
    bookingData,
    onSuccess,
    onBack,
}: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardholderName, setCardholderName] = useState(
        bookingData.customerName
    );

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch("/api/payment/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
                body: JSON.stringify({
                    carId: bookingData.carId,
                    startDate: bookingData.startDate,
                    endDate: bookingData.endDate,
                    totalAmount: totalPrice * 100,
                    customerName: bookingData.customerName,
                    customerEmail: bookingData.customerEmail,
                    customerPhone: bookingData.customerPhone,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create payment intent");
            }

            const { clientSecret, bookingId } = await response.json();

            const cardNumberElement = elements.getElement(CardNumberElement);

            if (!cardNumberElement) {
                throw new Error("Card element not found");
            }

            const { error: stripeError, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardNumberElement,
                        billing_details: {
                            name: cardholderName,
                            email: bookingData.customerEmail,
                            phone: bookingData.customerPhone,
                        },
                    },
                });

            if (stripeError) {
                setError(
                    stripeError.message || "An error occurred during payment"
                );
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                const confirmResponse = await fetch(
                    "/api/payment/confirm-payment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "authToken"
                            )}`,
                        },
                        body: JSON.stringify({
                            paymentIntentId: paymentIntent.id,
                            bookingId: bookingId,
                        }),
                    }
                );

                if (confirmResponse.ok) {
                    onSuccess();
                } else {
                    throw new Error("Failed to confirm booking");
                }
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred"
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Payment Error
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="cardholderName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Cardholder Name
                    </label>
                    <div className="relative">
                        <input
                            id="cardholderName"
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John Doe"
                            required
                        />
                        <User
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                    </label>
                    <div className="relative">
                        <div className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                        <CreditCard
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                        </label>
                        <div className="relative">
                            <div className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                                <CardExpiryElement
                                    options={CARD_ELEMENT_OPTIONS}
                                />
                            </div>
                            <Calendar
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                        </label>
                        <div className="relative">
                            <div className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                                <CardCvcElement
                                    options={CARD_ELEMENT_OPTIONS}
                                />
                            </div>
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                        <Lock size={16} className="text-blue-600 mt-0.5" />
                        <div className="ml-2">
                            <p className="text-sm text-blue-700">
                                Your payment information is secure and
                                encrypted. We never store your card details on
                                our servers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isProcessing}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isProcessing && (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        )}
                        {isProcessing ? "Processing..." : `Pay $${totalPrice}`}
                    </button>
                </div>
            </form>
        </div>
    );
}
