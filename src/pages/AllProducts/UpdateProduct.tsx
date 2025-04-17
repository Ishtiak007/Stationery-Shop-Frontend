import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateProductMutation } from "@/redux/features/products/productsApi";

const UpdateProduct = () => {
  const { productId } = useParams(); // Get productId from the URL params
  const {
    data: productData,
    isLoading,
    error,
  } = useUpdateProductMutation(productId); // Fetch product by ID
  const [productDetails, setProductDetails] = useState(productData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your mutation or API to update the product here
    toast.success("Product updated successfully!");
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={productDetails?.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productDetails?.price || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={productDetails?.description || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
