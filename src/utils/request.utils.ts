export function stringifyQueryParams(obj?: object): string | undefined {
    if (!obj) return;

    const keys: string[] = Object.keys(obj).map((key) => {
        const firstLetter = key.charAt(0).toLowerCase();
        const restOfKey = key.substring(1, key.length);
        const formattedKey = `${firstLetter}${restOfKey}`;

        return formattedKey;
    });

    const values = Object.values(obj).map((value) => value);

    const stringifiedQueryParams = keys.map((key, idx) => {
        if (!values[idx]) return;

        const newKey = {
            key: values[idx],
        };

        return newKey;
    });

    return stringifiedQueryParams.toString().replace(",", "&");
}
