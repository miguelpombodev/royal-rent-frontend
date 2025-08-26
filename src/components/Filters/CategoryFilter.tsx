import React from "react";
import type { IFilterCategories } from "./IFilterCategories.interface";
import { useCarFiltersStore } from "@/store/urlState.store";

type CategoryFilterProps = {
    values: IFilterCategories;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ values }) => {
    const {
        carColorName,
        carFuelTypeName,
        carTransmissionName,
        carTypeName,
        setCarColorName,
        setCarFuelTypeName,
        setCarTransmissionName,
        setCarTypeName,
    } = useCarFiltersStore();

    const handleCategoryClick = (
        setter: (value: string) => void,
        currentValue: string,
        newValue: string
    ) => {
        setter(currentValue === newValue ? "" : newValue);
    };

    const renderFilterSection = (
        title: string,
        values: string[],
        currentValue: string,
        setter: (value: string) => void
    ) => (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                    <button
                        key={value}
                        onClick={() =>
                            handleCategoryClick(setter, currentValue, value)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            currentValue === value
                                ? "bg-blue-600 text-white shadow-md transform scale-105"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm"
                        }`}
                        disabled={values.length === 0}
                    >
                        {value}
                    </button>
                ))}
                {values.length === 0 && (
                    <span className="text-gray-400 italic text-sm">
                        No options available
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="mb-8">
            {(carTypeName ||
                carColorName ||
                carFuelTypeName ||
                carTransmissionName) && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">
                        Active Filters:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {carTypeName && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Type: {carTypeName}
                                <button
                                    onClick={() => setCarTypeName("")}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {carColorName && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Color: {carColorName}
                                <button
                                    onClick={() => setCarColorName("")}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {carFuelTypeName && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Fuel: {carFuelTypeName}
                                <button
                                    onClick={() => setCarFuelTypeName("")}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {carTransmissionName && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Transmission: {carTransmissionName}
                                <button
                                    onClick={() => setCarTransmissionName("")}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setCarTypeName("");
                            setCarColorName("");
                            setCarFuelTypeName("");
                            setCarTransmissionName("");
                        }}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {renderFilterSection(
                "Types",
                values.carTypesNames,
                carTypeName,
                setCarTypeName
            )}
            {renderFilterSection(
                "Colors",
                values.carColorsNames,
                carColorName,
                setCarColorName
            )}
            {renderFilterSection(
                "Fuel Types",
                values.carFuelTypesNames,
                carFuelTypeName,
                setCarFuelTypeName
            )}
            {renderFilterSection(
                "Transmission Types",
                values.carTransmissionsNames,
                carTransmissionName,
                setCarTransmissionName
            )}
        </div>
    );
};

export default CategoryFilter;
