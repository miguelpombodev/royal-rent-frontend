const BRLCurrencyOptions = {
    region: "pt-BR",
    currencyName: "BRL",
};

export function convertCurrencyToBRL(value: number) {
    const formatter = Intl.NumberFormat(BRLCurrencyOptions.region, {
        style: "currency",
        currency: BRLCurrencyOptions.currencyName,
    });

    return formatter.format(value);
}
