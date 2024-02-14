import { useUserContext } from "../context/userContext";

export default function Home() {
  const { userFromLocal } = useUserContext();

  // Use optional chaining to safely access 'name' and 'image'
  const username = userFromLocal?.name;
  const imagePath = userFromLocal?.image; // Access the relative image path from the user object

  // Construct the full URL for the image; replace 'http://localhost:5000' with your actual backend base URL
  const imageFullUrl = imagePath ? `http://localhost:5000/${imagePath.replace(/\\/g, '/')}` : null;

  return (
    <div className="flex flex-col justify-center items-center bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
    {username ? (
      <div className="text-center">
        <div className="text-gray-700 font-semibold text-xl mb-2">Welcome, {username}!</div>
        {imageFullUrl && (
          <div className="flex justify-center">
            <img
              src={imageFullUrl}
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            />
          </div>
        )}
      </div>
    ) : (
      <div className="text-gray-500">Please login to see more info!</div>
    )}
  </div>
  
  );
}
