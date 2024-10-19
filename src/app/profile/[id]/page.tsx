export default function UserProfile({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 py-8 text-white">
            <div className="bg-white text-gray-900 p-10 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
                <hr className="border-gray-300 mb-6" />

                <p className="text-xl text-center mb-4 font-medium">Profile page:</p>

                <p className="text-center">
                    <span className="inline-block px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold shadow-md text-2xl">
                        {params.id}
                    </span>
                </p>
            </div>
        </div>
    );
}
