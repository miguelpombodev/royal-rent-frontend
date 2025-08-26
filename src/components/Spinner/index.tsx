export default function BlurredSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-100/40 backdrop-blur-md transition-opacity duration-300"></div>

            <div className="relative z-10 flex flex-col items-center animate-fadeIn">
                <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-opacity-30"></div>

                    <div className="absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-500 border-r-blue-400"></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>

                <div className="flex space-x-1 mt-6">
                    <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
