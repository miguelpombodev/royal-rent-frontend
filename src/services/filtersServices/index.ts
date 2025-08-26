import type { IFilterCategories } from "@/components/Filters/IFilterCategories.interface";
import { api } from "../api";
import type IBaseResponseResult from "../baseInterface";
import { RETRIEVE_FILTER_VALUES_ENDPOINT_URL } from "./endpoints_url";
import type { IFilterValues } from "./interfaces";

export const filtersService = {
    async retrieveFilterValues(filterValues?: IFilterValues) {
        const { data } = await api.get<IBaseResponseResult<IFilterCategories>>(
            `${RETRIEVE_FILTER_VALUES_ENDPOINT_URL}`,
            {
                params: {
                    isFeatured: filterValues?.isFeatured,
                    sortBy: filterValues?.sortBy,
                    sortType: filterValues?.sortDirection,
                    carTypeNames: filterValues?.carTypeName,
                    carColorName: filterValues?.carColorName,
                    carFuelTypeNames: filterValues?.carFuelTypeName,
                    carTransmissionsNames: filterValues?.carTransmissionName,
                },
            }
        );

        return data;
    },
};
