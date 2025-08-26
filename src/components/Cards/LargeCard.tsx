interface LargeCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function LargeCard({
    icon,
    title,
    description,
}: LargeCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
