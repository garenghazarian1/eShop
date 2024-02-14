import { useProductContext } from '../context/addProductContext';

const ProductsDisplay = () => {
    const { products } = useProductContext();

    
    return (
        <div className="products-container max-w-6xl mx-auto px-4 py-8">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id} className="product-card bg-white shadow-lg rounded-lg overflow-hidden my-4">
                        {product.productImage ? <img src={product.productImage} alt="Uploaded Content" /> : null}
                        {/* <img src={product.productImage} alt={"product image"} className="product-image w-full h-56 object-cover object-center" /> */}
                        <div className="p-4">
                            <h3 className="product-name font-bold text-lg mb-2">{product.productName}</h3>
                            <p className="culture-type text-sm text-gray-600 mb-1">{product.cultureType}</p>
                            <p className="product-price font-semibold text-gray-800">${product.productPrice}</p>
                            {/* Add more product details here as needed */}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No products found.</p> // Displayed if no products are fetched
            )}
        </div>
    );
};

export default ProductsDisplay;
