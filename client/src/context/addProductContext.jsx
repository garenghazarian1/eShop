import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; 
import { baseUrl } from "../config/api";


//const {} = useProductContext();

const AddProductContext = createContext();
export const useProductContext = () => useContext(AddProductContext);


const ProductContextProvider = ({ children }) => {
    const [productName, setProductName] = useState("");
    const [cultureType, setCultureType] = useState("");
    const [productPrice, setProductPrice] = useState(0.01);
    const [productImage, setProductImage] = useState(null);
    const [previewProductUrl, setPreviewProductUrl] = useState('');

    const [products, setProducts] = useState([]); // State to store fetched products

    const handleNameChange = (e) => setProductName(e.target.value);
    const handleCultureTypeChange = (e) => setCultureType(e.target.value);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);
    const handleProductImageChange = (e) => setProductImage(e.target.files[0]);


    // ADD PRODUCT ************************************************
    const handleProductSubmit = async (e) => {e.preventDefault();
     
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('cultureType', cultureType);
        formData.append('productPrice', String(productPrice));
        if (productImage) {formData.append('productImage', productImage);} // send image 
        try {
        const response = await axios.post(`${baseUrl}/admin/posts/add`, formData,{ headers: {'Content-Type': 'multipart/form-data'}} );
        if (response.data.success) {
          // Assuming you have a way to update the posts state
        }

        setProductName("");
        setCultureType("");
        setProductPrice(0.01);
        setProductImage(null);
      } catch (error) {
        console.error("Failed to submit product:", error);
      }
    };

    // EFFECT TO CREATE URL TO PREVIN **********************
    useEffect(() => {
      if (productImage) {
        const objectUrl = URL.createObjectURL(productImage);
        setPreviewProductUrl(objectUrl);
  
        // Cleanup function to revoke URL to free up memory
        return () => URL.revokeObjectURL(objectUrl);
      }
    }, [productImage]); // This effect runs when productImage changes

// FUNCTION TO GET ALL PRODUCTS ****************************************
    const getProducts = async () => {
      try {
          const response = await axios.get(`${baseUrl}/admin/posts/all-posts`); 
          const productData = response.data.posts
          console.log(response.data);
          console.log("🚀 ~ getProducts ~ data:", productData)
          setProducts(productData); 
      } catch (error) {
          console.error("Failed to fetch products:", error);
      }      
  };

  // Optionally, fetch products when the component using this context mounts
  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array ensures this effect runs only once on mount



    return (
      <AddProductContext.Provider value={{
        handleProductSubmit,
        handleNameChange,
        handleCultureTypeChange,
        handleProductPriceChange,
        handleProductImageChange,
        productName,
        cultureType,
        productPrice,
        productImage,
        setProductName,
        setCultureType,
        setProductPrice,
        setProductImage,
        previewProductUrl,
        setPreviewProductUrl,
        products, // Add products to the context value
        getProducts
    }}>
        {children}
      </AddProductContext.Provider>
    );
};

export default ProductContextProvider;
