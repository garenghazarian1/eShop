import { useProductContext } from '../context/addProductContext.jsx';
import { useAdminContext } from '../context/adminContext.jsx';
import { inputField, button } from "../css/style";

function AdminPostForm() {
  const {handleProductSubmit, productName, cultureType, productPrice, handleNameChange, handleCultureTypeChange, handleProductPriceChange, handleProductImageChange, previewProductUrl, setPreviewProductUrl} = useProductContext();

  //const {name} = useAdminContext();
  //console.log('name', name);

  return (
    <div>
      <form onSubmit={handleProductSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={productName}
          onChange={handleNameChange}
          className={inputField}
        />
        <input
          type="text"
          name="cultureType"
          placeholder="Culture Type"
          value={cultureType}
          onChange={handleCultureTypeChange}
          className={inputField}
        />
        <input
          type="number"
          name="productPrice"
          placeholder="Product Price"
          value={productPrice}
          onChange={handleProductPriceChange}
          className={inputField}
        />
        


        <div>
      <div className="flex items-center justify-start ml-4">
        <label className="cursor-pointer bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-700">
          Add Profile Image
          <input
            type="file"
            name="productImage"
            hidden
            onChange={handleProductImageChange}
            accept="image/*"
          />
        </label>
      </div>
      {previewProductUrl && (
        <img src={previewProductUrl} alt="Profile preview" className="h-24 " />

      )}
    </div>


        <button type="submit" className={button}>Submit Post</button>
      </form>
    </div>
  );
}

export default AdminPostForm;
