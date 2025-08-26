import Hero from "@/components/Hero";
import LargeCard from "@/components/Cards/LargeCard";
import { Calendar, Car, CheckCircle, CreditCard, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import CarCard from "@/components/Cards/CarCard";
import type IBaseResponseResult from "@/services/baseInterface";
import type { IGetAllAvailableCars } from "@/services/carsService/interfaces";
import { useEffect, useState } from "react";
import { carsService } from "@/services/carsService";

export default function Home() {
    const [featuredCars, setFeaturedCars] = useState<
        IBaseResponseResult<IGetAllAvailableCars[]>
    >({ data: [] });

    useEffect(() => {
        carsService.getAllAvailableCars({ isFeatured: true }).then((data) => {
            setFeaturedCars({ data: data.data });
        });
    }, []);

    return (
        <div className="w-full bg-white">
            <Hero />
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Renting a car with DriveRent is quick and easy.
                            Follow these simple steps and hit the road in no
                            time.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <LargeCard
                            icon={<Car size={28} className="text-blue-600" />}
                            title="Choose Your Car"
                            description="Browse our extensive fleet and select the
                                perfect vehicle for your needs."
                        />

                        <LargeCard
                            icon={
                                <Calendar size={28} className="text-blue-600" />
                            }
                            title="Pick Date & Location"
                            description="Select your pickup and return dates, along with
                                convenient locations."
                        />

                        <LargeCard
                            icon={
                                <CreditCard
                                    size={28}
                                    className="text-blue-600"
                                />
                            }
                            title="Book & Pay"
                            description="                                Complete your booking with our secure payment
                                system and get ready to drive."
                        />
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Featured Cars</h2>
                        <Link
                            to="/cars"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View All Cars
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.data.map((car) => (
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
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Why Choose DriveRent
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We offer the best car rental experience with premium
                            vehicles and exceptional service.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <CheckCircle
                                size={28}
                                className="text-blue-600 mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                                No Hidden Fees
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Transparent pricing with no surprise charges or
                                hidden fees.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Shield size={28} className="text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                Insurance Included
                            </h3>
                            <p className="text-gray-600 text-sm">
                                All rentals come with comprehensive insurance
                                coverage.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Car size={28} className="text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                Premium Vehicles
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Well-maintained fleet of high-quality vehicles
                                for your comfort.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Calendar
                                size={28}
                                className="text-blue-600 mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                                Flexible Bookings
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Easy modifications and cancellations for your
                                convenience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Hit the Road?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who choose
                        DriveRent for their travel needs.
                    </p>
                    <Link
                        to="/cars"
                        className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium inline-block transition-colors"
                    >
                        Book Your Car Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
