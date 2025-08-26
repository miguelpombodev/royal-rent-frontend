export interface IFilterValues {
    sortDirection: "asc" | "desc";
    sortBy: "Name" | "Model" | "Year" | "Price" | "Make" | "Type" | "Seats";
    carTypeName: string;
    carColorName: string;
    carFuelTypeName: string;
    carTransmissionName: string;
    isFeatured: boolean | null;
}
