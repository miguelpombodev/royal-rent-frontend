/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ICarFiltersState {
    sortDirection: "asc" | "desc";
    sortBy: "Name" | "Model" | "Year" | "Price" | "Make" | "Type" | "Seats";
    carTypeName: string;
    carColorName: string;
    carFuelTypeName: string;
    carTransmissionName: string;
    isFeatured: boolean | null;
    _isUpdatingFromUrl: boolean;
}

interface ICarFiltersActions {
    setSortDirection: (sortBy: ICarFiltersState["sortDirection"]) => void;
    setSortBy: (sortBy: ICarFiltersState["sortBy"]) => void;
    setCarTypeName: (type: ICarFiltersState["carTypeName"]) => void;
    setCarColorName: (color: ICarFiltersState["carColorName"]) => void;
    setCarFuelTypeName: (fuelType: ICarFiltersState["carFuelTypeName"]) => void;
    setCarTransmissionName: (
        transmissionName: ICarFiltersState["carTransmissionName"]
    ) => void;
    setIsFeatured: (featured: ICarFiltersState["isFeatured"]) => void;
    loadFromUrl: (searchParams: URLSearchParams) => void;
}

type CarFilterStore = ICarFiltersState & ICarFiltersActions;

const initialStoreState: ICarFiltersState = {
    sortDirection: "asc",
    sortBy: "Name",
    carColorName: "",
    carFuelTypeName: "",
    carTransmissionName: "",
    carTypeName: "",
    isFeatured: null,
    _isUpdatingFromUrl: false,
};

export const useCarFiltersStore = create<CarFilterStore>()(
    subscribeWithSelector((set, _) => ({
        ...initialStoreState,
        setCarColorName: (carColorName) => set({ carColorName }),
        setCarFuelTypeName: (carFuelTypeName) => set({ carFuelTypeName }),
        setCarTransmissionName: (carTransmissionName) =>
            set({ carTransmissionName }),
        setCarTypeName: (carTypeName) => set({ carTypeName }),
        setIsFeatured: (isFeatured) => set({ isFeatured }),
        setSortDirection: (sortDirection) => set({ sortDirection }),
        setSortBy: (sortBy) => set({ sortBy }),

        loadFromUrl: (searchParams) => {
            const sortDirection =
                (searchParams.get(
                    "sortDirection"
                ) as ICarFiltersState["sortDirection"]) || "asc";
            const sortBy =
                (searchParams.get("sortBy") as ICarFiltersState["sortBy"]) ||
                "Name";
            const carColorName = searchParams.get("carColorName") || "";
            const carFuelTypeName = searchParams.get("carFuelTypeName") || "";
            const carTransmissionName =
                searchParams.get("carTransmissionName") || "";
            const carTypeName = searchParams.get("carTypeName") || "";
            const isFeatured =
                searchParams.get("isFeatured") === "true"
                    ? true
                    : searchParams.get("isFeatured") === "false"
                    ? false
                    : null;

            set({
                sortDirection,
                sortBy,
                carColorName,
                carFuelTypeName,
                carTransmissionName,
                carTypeName,
                isFeatured,
            });
        },
    }))
);
