
import { useProductContext } from '../context/addProductContext'; 

const ProductsDisplay = () => {
    const { products } = useProductContext();

  

    return (
        <div className="products-container">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={product.productImage} alt={"product"} className="product-image" />
                        <h3 className="product-name">{product.productName}</h3>
                        <p className="culture-type">{product.cultureType}</p>
                        <p className="product-price">${product.productPrice.toFixed(2)}</p>
                        {/* Add more product details here as needed */}
                    </div>
                ))
            ) : (
                <p>No products found.</p> // Displayed if no products are fetched
            )}
        </div>
    );
};

export default ProductsDisplay;
