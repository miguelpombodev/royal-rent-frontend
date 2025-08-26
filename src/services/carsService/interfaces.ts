export interface IGetAllAvailableCars {
    name: string;
    category: string;
    price: number;
    seats: number;
    imageUrl: string;
    transmission: string;
    fuelType: string;
    description: string;
    featured: boolean;
}

export interface IGetAllAvailableCarsFilters {
    isFeatured: true | false;
}
