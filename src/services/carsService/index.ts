import { api } from "../api";
import type IBaseResponseResult from "../baseInterface";
import { GET_ALL_AVAILABLE_CARS_ENDPOINT_URL } from "./endpoints_url";
import type { IGetAllAvailableCars } from "./interfaces";
import type { IFilterValues } from "../filtersServices/interfaces";

export const carsService = {
    async getAllAvailableCars(filterValues?: IFilterValues) {
        console.log(filterValues);
        const { data } = await api.get<
            IBaseResponseResult<IGetAllAvailableCars[]>
        >(`${GET_ALL_AVAILABLE_CARS_ENDPOINT_URL}`, {
            params: {
                isFeatured: filterValues?.isFeatured,
                sortBy: filterValues?.sortBy,
                sortType: filterValues?.sortDirection,
                carTypeNames: filterValues?.carTypeName,
                carColorName: filterValues?.carColorName,
                carFuelTypeNames: filterValues?.carFuelTypeName,
                carTransmissionsNames: filterValues?.carTransmissionName,
            },
        });

        return data;
    },
};
