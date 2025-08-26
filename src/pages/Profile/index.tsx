import React from "react";
import { Navigate } from "react-router-dom";
import { Calendar, Clock, Check, AlertCircle } from "lucide-react";
import useUserStore from "@/store/authStore";
import { rentalHistory } from "@/mock/history.mock";
const ProfilePage: React.FC = () => {
    const { user, isAuthenticated } = useUserStore();
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return (
        <div className="bg-gray-50 min-h-screen w-full">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* User Profile Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <img
                                src={user?.avatar}
                                alt={user?.userName}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div className="flex-grow text-center md:text-left">
                                <h1 className="text-2xl font-bold mb-2">
                                    {user?.userName}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    {user?.email}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                        Edit Profile
                                    </button>
                                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Rental History */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Rental History
                        </h2>
                        {rentalHistory.length > 0 ? (
                            <div className="space-y-6">
                                {rentalHistory.map((rental) => (
                                    <div
                                        key={rental.id}
                                        className="border rounded-lg overflow-hidden"
                                    >
                                        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                                            <div className="font-medium">
                                                {rental.carName}
                                            </div>
                                            <div className="flex items-center">
                                                {rental.status ===
                                                "Completed" ? (
                                                    <span className="flex items-center text-green-600 text-sm">
                                                        <Check
                                                            size={16}
                                                            className="mr-1"
                                                        />
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-blue-600 text-sm">
                                                        <Clock
                                                            size={16}
                                                            className="mr-1"
                                                        />
                                                        Upcoming
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                                        <Calendar
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                        <span>
                                                            {new Date(
                                                                rental.startDate
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                }
                                                            )}{" "}
                                                            -{" "}
                                                            {new Date(
                                                                rental.endDate
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">
                                                            Booking ID:
                                                        </span>{" "}
                                                        {rental.id}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:items-end justify-center">
                                                    <div className="text-lg font-semibold">
                                                        ${rental.totalPrice}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Total Payment
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2 justify-end">
                                                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                                                    View Details
                                                </button>
                                                {rental.status ===
                                                    "Upcoming" && (
                                                    <button className="bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors text-sm">
                                                        Cancel Booking
                                                    </button>
                                                )}
                                                {rental.status ===
                                                    "Completed" && (
                                                    <button className="bg-blue-50 border border-blue-300 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm">
                                                        Leave Review
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border rounded-lg">
                                <AlertCircle
                                    size={48}
                                    className="mx-auto text-gray-400 mb-4"
                                />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    No rental history
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    You haven't rented any cars yet.
                                </p>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    Browse Cars
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;
