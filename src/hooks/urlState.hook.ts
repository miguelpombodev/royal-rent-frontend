/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCarFiltersStore } from "@/store/urlState.store";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlSync() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = useCarFiltersStore();
    const isInitialized = useRef(false);
    const lastUrlState = useRef<string>("");

    useEffect(() => {
        if (!isInitialized.current) {
            filters.loadFromUrl(searchParams);
            lastUrlState.current = searchParams.toString();
            isInitialized.current = true;
        }
    }, []);

    useEffect(() => {
        return useCarFiltersStore.subscribe(
            (state) => {
                const { _isUpdatingFromUrl, ...rest } = state;
                return rest;
            },
            (state) => {
                const currentState = useCarFiltersStore.getState();

                if (currentState._isUpdatingFromUrl) {
                    return;
                }

                if (!isInitialized.current) {
                    return;
                }

                const newParams = new URLSearchParams();

                if (state.sortDirection)
                    newParams.set("sortDirection", state.sortDirection);
                if (state.sortBy) newParams.set("sortBy", state.sortBy);
                if (state.carColorName)
                    newParams.set("carColorName", state.carColorName);
                if (state.carFuelTypeName)
                    newParams.set("carFuelTypeName", state.carFuelTypeName);
                if (state.carTransmissionName)
                    newParams.set(
                        "carTransmissionName",
                        state.carTransmissionName
                    );
                if (state.carTypeName)
                    newParams.set("carTypeName", state.carTypeName);
                if (state.isFeatured !== null)
                    newParams.set("isFeatured", state.isFeatured.toString());

                setSearchParams(newParams);
            },
            {
                fireImmediately: false,
            }
        );
    }, [setSearchParams]);
}
