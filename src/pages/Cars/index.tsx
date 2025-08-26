import React, { useEffect, useState, useCallback, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import CategoryFilter from "../../components/Filters/CategoryFilter";
import { carsService } from "@/services/carsService";
import type IBaseResponseResult from "@/services/baseInterface";
import type { IGetAllAvailableCars } from "@/services/carsService/interfaces";
import type { IFilterCategories } from "@/components/Filters/IFilterCategories.interface";
import { filtersService } from "@/services/filtersServices";
import CarCard from "@/components/Cards/CarCard";
import { useUrlSync } from "@/hooks/urlState.hook";
import { useCarFiltersStore } from "@/store/urlState.store";
import { ArrowUpDown, ArrowDownAZ } from "lucide-react";
import { debounce } from "@/utils/debounce.utils";
import type { IFilterValues } from "@/services/filtersServices/interfaces";
import BlurredSpinner from "@/components/Spinner";

const CarsPage: React.FC = () => {
    useUrlSync();

    const {
        sortDirection,
        sortBy,
        carColorName,
        carFuelTypeName,
        carTransmissionName,
        carTypeName,
        isFeatured,
        setSortDirection,
        setSortBy,
    } = useCarFiltersStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCars, setFilteredCars] = useState<
        IBaseResponseResult<IGetAllAvailableCars[]>
    >({ data: [] });
    const [filterValues, setFilterValues] = useState<
        IBaseResponseResult<IFilterCategories>
    >({
        data: {
            carTypesNames: [],
            carFuelTypesNames: [],
            carColorsNames: [],
            carTransmissionsNames: [],
        },
    });
    const [showFilters, setShowFilters] = useState(false);

    const [isPending, startTransition] = useTransition();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const debouncedApiCall = useCallback(
        debounce(
            async (filters: {
                carColorName: string;
                carFuelTypeName: string;
                carTransmissionName: string;
                carTypeName: string;
                isFeatured: boolean;
                sortBy: string;
                sortDirection: string;
            }) => {
                startTransition(async () => {
                    try {
                        const filterParams: IFilterValues = {
                            isFeatured: filters.isFeatured ?? false,
                            sortBy: filters.sortBy as
                                | "Name"
                                | "Model"
                                | "Year"
                                | "Price"
                                | "Make"
                                | "Type"
                                | "Seats",
                            sortDirection: filters.sortDirection as
                                | "asc"
                                | "desc",
                            ...(filters.carColorName && {
                                carColorName: filters.carColorName,
                            }),
                            ...(filters.carFuelTypeName && {
                                carFuelTypeName: filters.carFuelTypeName,
                            }),
                            ...(filters.carTransmissionName && {
                                carTransmissionName:
                                    filters.carTransmissionName,
                            }),
                            ...(filters.carTypeName && {
                                carTypeName: filters.carTypeName,
                            }),
                        };

                        const [carsResponse, filtersResponse] =
                            await Promise.all([
                                carsService.getAllAvailableCars(filterParams),
                                filtersService.retrieveFilterValues(
                                    filterParams
                                ),
                            ]);

                        setFilteredCars({ data: carsResponse.data });
                        setFilterValues({ data: filtersResponse.data });
                    } catch (error) {
                        console.error("Erro ao buscar dados:", error);
                    }
                });
            },
            3000
        ),
        []
    );

    useEffect(() => {
        const loadInitialData = async () => {
            startTransition(async () => {
                try {
                    const [carsResponse, filtersResponse] = await Promise.all([
                        carsService.getAllAvailableCars(),
                        filtersService.retrieveFilterValues(),
                    ]);

                    setFilteredCars({ data: carsResponse.data });
                    setFilterValues({ data: filtersResponse.data });
                } catch (error) {
                    console.error("Erro ao carregar dados iniciais:", error);
                } finally {
                    setIsInitialLoading(false);
                }
            });
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        if (isInitialLoading) return;

        const currentFilters = {
            carColorName,
            carFuelTypeName,
            carTransmissionName,
            carTypeName,
            isFeatured,
            sortBy,
            sortDirection,
        };

        const hasActiveFilters =
            carColorName ||
            carFuelTypeName ||
            carTransmissionName ||
            carTypeName;
        const hasSortingChanged = sortBy || sortDirection;

        if (hasActiveFilters || hasSortingChanged) {
            debouncedApiCall(currentFilters);
        }

        return () => {
            debouncedApiCall.cancel?.();
        };
    }, [
        carColorName,
        carFuelTypeName,
        carTransmissionName,
        carTypeName,
        isFeatured,
        sortBy,
        sortDirection,
        debouncedApiCall,
        isInitialLoading,
    ]);

    const shouldShowSpinner = isInitialLoading || isPending;

    return (
        <div className="bg-gray-50 min-h-screen w-full relative">
            {shouldShowSpinner && <BlurredSpinner />}

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-row justify-between items-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Our Fleet</h1>
                        <p className="text-gray-600">
                            Browse our selection of premium vehicles for your
                            next adventure
                        </p>
                    </div>
                    <div className="flex flex-row gap-10">
                        <div className="flex flex-row items-center gap-4">
                            <h2 className="text-blue-500 font-bold text-xl flex gap-1">
                                <ArrowDownAZ />
                                Sort Cars By:
                            </h2>
                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value as
                                            | "Name"
                                            | "Model"
                                            | "Year"
                                            | "Price"
                                            | "Make"
                                            | "Type"
                                            | "Seats"
                                    )
                                }
                                className="px-4 py-2 border w-24 h-12 rounded-[10px] bg-blue-500 text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={shouldShowSpinner}
                            >
                                <option value="Name">Name</option>
                                <option value="Model">Model</option>
                                <option value="Year">Year</option>
                                <option value="Price">Price</option>
                                <option value="Make">Make</option>
                                <option value="Type">Type</option>
                                <option value="Seats">Seats</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <h2 className="text-blue-500 font-bold text-lg flex gap-1">
                                <ArrowUpDown />
                                Cars Ordered By:
                            </h2>
                            <select
                                value={sortDirection}
                                onChange={(e) =>
                                    setSortDirection(
                                        e.target.value as "asc" | "desc"
                                    )
                                }
                                className="px-4 py-2 border h-12 rounded-[10px] bg-blue-500 text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={shouldShowSpinner}
                            >
                                <option value="asc">Lower to Higher</option>
                                <option value="desc">Higher to Lower</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <CategoryFilter values={filterValues.data} />
                        </div>
                    </div>
                    <div className="md:hidden mb-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={shouldShowSpinner}
                            >
                                <SlidersHorizontal size={18} className="mr-2" />
                                Filters
                            </button>
                            <div className="relative flex-grow ml-4">
                                <input
                                    type="text"
                                    placeholder="Search cars..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={shouldShowSpinner}
                                />
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>
                        {showFilters && (
                            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                                <CategoryFilter values={filterValues.data} />
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        {!isInitialLoading && filteredCars.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCars.data.map((car) => (
                                    <CarCard
                                        key={car.name}
                                        name={car.name}
                                        category={car.category}
                                        price={car.price}
                                        image={car.imageUrl}
                                        seats={car.seats}
                                        transmission={car.transmission}
                                        fuelType={car.fuelType}
                                        description={car.description}
                                        featured={car.featured}
                                    />
                                ))}
                            </div>
                        ) : !isInitialLoading &&
                          filteredCars.data.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                <h3 className="text-xl font-semibold mb-2">
                                    No cars found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    We couldn't find any cars matching your
                                    search criteria.
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarsPage;
