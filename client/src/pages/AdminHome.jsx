import Products from "../components/Products";
import { useAdminContext } from "../context/adminContext";
import AdminPostForm from "../products/addProducts";

export default function AdminHome() {
    const { adminFromLocal } = useAdminContext();
    const username = adminFromLocal.name;

    return (
        <div>
        <div className="flex flex-col items-center gap-2 bg-gray-400 text-gray-400 p-5">
            <h1 className="text-white mb-4 text-[60px] font-bold">Admin's Page</h1>

            <p className="text-white mb-4">Here you can create a post to show your products to the clients.</p>
            {username ? (
                <div className="text-white">Welcome admin: <span className="font-bold text-white">{username}</span></div>
            ) : (
                <div className="text-red-500">Please login to see more info!</div>
            )}
            
        </div>
        <AdminPostForm/>
        <Products/>
        </div>
    );
}
