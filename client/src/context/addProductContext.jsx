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
    

    const [products, setProducts] = useState([]); // State to store fetched products

    const handleNameChange = (e) => setProductName(e.target.value);
    const handleCultureTypeChange = (e) => setCultureType(e.target.value);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);
    //const handleProductImageChange = (e) => setProductImage(e.currentTarget.files[0]);

    const handleImageSelect = (e) => {
      setProductImage(e.currentTarget.files[0]);
      //console.log( "xxx", e.currentTarget.files[0]);
    };

    


    // ADD PRODUCT ************************************************
    const handleProductSubmit = async (e) => {e.preventDefault();
     
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('cultureType', cultureType);
        formData.append('productPrice', productPrice);
        formData.append('productImage', productImage);
        for (const item of formData.entries()) {
          console.log("🚀 ~ item:", item);
        }
        try {
        const response = await axios.post(`${baseUrl}/admin/posts/add`, formData );
        if (response.data.success) {
          // Assuming you have a way to update the posts state
        }

        setProductName("");
        setCultureType("");
        setProductPrice("");
        setProductImage("");
      } catch (error) {
        console.error("Failed to submit product:", error);
      }
    };

    

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

  // // Optionally, fetch products when the component using this context mounts
   useEffect(() => {
     getProducts();
   }, []); // Empty dependency array ensures this effect runs only once on mount

 

    return (
      <AddProductContext.Provider value={{
        handleProductSubmit,
        handleNameChange,
        handleCultureTypeChange,
        handleProductPriceChange,
        //handleProductImageChange,
        productName,
        cultureType,
        productPrice,
        productImage,
        setProductName,
        setCultureType,
        setProductPrice,
        setProductImage,
        products, 
        getProducts,
        handleImageSelect
    }}>
        {children}
      </AddProductContext.Provider>
    );
};

export default ProductContextProvider;
