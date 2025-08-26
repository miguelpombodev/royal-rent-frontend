export type CardType = {
    type: "visa" | "mastercard" | "amex" | "discover" | "generic";
    tier: "standard" | "platinum" | "black";
};

export type CreditCardDisplayProps = {
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvv?: string;
};

export interface BookingData {
    carId: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

export interface StripePaymentFormProps {
    totalPrice: number;
    bookingData: BookingData;
    cardHolderData: CreditCardDisplayProps;
    setCardHolderData: React.Dispatch<
        React.SetStateAction<CreditCardDisplayProps>
    >;
    onSuccess: () => void;
    onBack: () => void;
}
