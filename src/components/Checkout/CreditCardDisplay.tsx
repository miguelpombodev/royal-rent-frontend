import React, { useEffect, useState } from "react";
import { CreditCard as CreditCardIcon } from "lucide-react";
type CardType = {
    type: "visa" | "mastercard" | "amex" | "discover" | "generic";
    tier: "standard" | "platinum" | "black";
};
type CreditCardDisplayProps = {
    cardNumber: string;
    cardName: string;
    cardExpiry: string;
};
const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
    cardNumber,
    cardName,
    cardExpiry,
}) => {
    const [cardType, setCardType] = useState<CardType>({
        type: "generic",
        tier: "standard",
    });
    const [isFlipped, setIsFlipped] = useState(false);
    // Detect card type based on number
    useEffect(() => {
        if (!cardNumber) {
            setCardType({
                type: "generic",
                tier: "standard",
            });
            return;
        }
        // Remove spaces for checking
        const number = cardNumber.replace(/\s+/g, "");
        let type: CardType["type"] = "generic";
        let tier: CardType["tier"] = "standard";
        // Check card provider
        if (/^4/.test(number)) {
            type = "visa";
        } else if (/^(5[1-5]|2[2-7][2-9][0-9])/.test(number)) {
            type = "mastercard";
        } else if (/^3[47]/.test(number)) {
            type = "amex";
        } else if (/^(6011|65|64[4-9])/.test(number)) {
            type = "discover";
        }
        // Simulate premium card detection
        // In a real app, this would be based on BIN ranges provided by the card issuer
        if (/^4000(1|2|3)/.test(number)) {
            tier = "platinum";
        } else if (/^4000(8|9)/.test(number)) {
            tier = "black";
        } else if (/^5[1-5]9/.test(number)) {
            tier = "platinum";
        } else if (/^5[1-5]8/.test(number)) {
            tier = "black";
        }
        setCardType({
            type,
            tier,
        });
    }, [cardNumber]);
    const getCardBackground = () => {
        if (cardType.tier === "black") {
            return "bg-gradient-to-br from-gray-900 to-gray-800";
        } else if (cardType.tier === "platinum") {
            return "bg-gradient-to-br from-gray-400 to-gray-300";
        } else {
            switch (cardType.type) {
                case "visa":
                    return "bg-gradient-to-br from-blue-600 to-blue-800";
                case "mastercard":
                    return "bg-gradient-to-br from-red-600 to-orange-600";
                case "amex":
                    return "bg-gradient-to-br from-blue-400 to-blue-600";
                case "discover":
                    return "bg-gradient-to-br from-orange-500 to-orange-700";
                default:
                    return "bg-gradient-to-br from-gray-600 to-gray-800";
            }
        }
    };
    const getCardLogo = () => {
        switch (cardType.type) {
            case "visa":
                return (
                    <div className="text-white text-lg font-bold italic">
                        VISA
                    </div>
                );
            case "mastercard":
                return (
                    <div className="flex">
                        <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
                        <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80 -ml-4"></div>
                    </div>
                );
            case "amex":
                return <div className="text-white text-lg font-bold">AMEX</div>;
            case "discover":
                return (
                    <div className="text-white text-lg font-bold">DISCOVER</div>
                );
            default:
                return <CreditCardIcon size={28} className="text-white" />;
        }
    };
    const formatCardNumber = (number: string) => {
        // Remove all non-digits
        const digits = number.replace(/\D/g, "");
        // Handle Amex format (4-6-5)
        if (cardType.type === "amex") {
            const part1 = digits.slice(0, 4);
            const part2 = digits.slice(4, 10);
            const part3 = digits.slice(10, 15);
            return [part1 || "****", part2 ? part2 : "******", part3 || "*****"]
                .filter(Boolean)
                .join(" ");
        }
        // Standard format (4-4-4-4)
        const parts = [];
        for (let i = 0; i < 16; i += 4) {
            parts.push(digits.slice(i, i + 4) || "****");
        }
        return parts.join(" ");
    };
    return (
        <div className="perspective-1000 mb-8 max-w-md mx-auto">
            <div
                className={`relative w-full h-56 transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front of card */}
                <div
                    className={`absolute w-full h-full rounded-xl p-6 shadow-lg backface-hidden ${getCardBackground()}`}
                >
                    <div className="flex justify-between items-start h-full flex-col">
                        <div className="w-full flex justify-between">
                            <div className="w-12 h-12">
                                <div className="w-full h-full rounded-full bg-yellow-400 opacity-80"></div>
                            </div>
                            <div>{getCardLogo()}</div>
                        </div>
                        <div className="w-full mb-4">
                            <div className="text-gray-200 text-sm mb-1">
                                Card Number
                            </div>
                            <div className="text-white text-xl tracking-wider font-medium">
                                {formatCardNumber(cardNumber || "")}
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <div>
                                <div className="text-gray-200 text-xs">
                                    Card Holder
                                </div>
                                <div className="text-white font-medium truncate max-w-[150px]">
                                    {cardName || "YOUR NAME"}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-200 text-xs">
                                    Expires
                                </div>
                                <div className="text-white font-medium">
                                    {cardExpiry || "MM/YY"}
                                </div>
                            </div>
                        </div>
                        {cardType.tier !== "standard" && (
                            <div className="absolute top-3 right-6">
                                <div
                                    className={`text-xs ${
                                        cardType.tier === "black"
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } uppercase font-bold`}
                                >
                                    {cardType.tier}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Back of card */}
                <div
                    className={`absolute w-full h-full rounded-xl shadow-lg backface-hidden rotate-y-180 ${getCardBackground()}`}
                >
                    <div className="w-full h-12 bg-black mt-6"></div>
                    <div className="px-6 mt-4">
                        <div className="bg-gray-200 h-10 w-full flex items-center justify-end px-4">
                            <div className="text-gray-800 tracking-widest">
                                CVV
                            </div>
                        </div>
                        <div className="mt-4 text-white text-xs">
                            <p>
                                This card is property of the issuing bank. Use
                                of this card constitutes acceptance of the
                                cardholder agreement.
                            </p>
                        </div>
                        <div className="mt-4">{getCardLogo()}</div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
                Click the card to flip it
            </div>
        </div>
    );
};
export default CreditCardDisplay;
