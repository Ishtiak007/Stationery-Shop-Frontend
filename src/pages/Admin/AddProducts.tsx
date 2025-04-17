import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Store, Check } from "lucide-react";
import { TProducts } from "@/types/productTypes";
import { useAddProductsMutation } from "@/redux/features/products/productsApi";

const AddProducts = () => {
  const [addProduct] = useAddProductsMutation();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: Partial<TProducts>) => {
    const toastId = toast.loading("Loading...");

    // Create formData object
    const formData = new FormData();

    // Append regular fields
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && key !== "productImg") {
        formData.append(key, data[key]);
      }
    });

    // Append file (image)
    if (data.productImg && data.productImg[0]) {
      formData.append("file", data.productImg[0]);
    }

    try {
      // Call the API to add the product
      const res = await addProduct(formData);

      if (res.data) {
        toast.success("Product added successfully!", { id: toastId });
      } else {
        toast.error("Failed to add product", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex font-orbitron items-center gap-2 text-xl font-semibold">
          <Store /> Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Product Name</Label>
              <Input
                type="text"
                {...register("name")}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <Label>Brand</Label>
              <Input
                type="text"
                {...register("brand")}
                placeholder="Enter brand"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Enter product description"
                required
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                {...register("price")}
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                {...register("stockQuantity")}
                placeholder="Enter stock quantity"
                required
              />
            </div>
            <div>
              <Label>Color</Label>
              <Input
                type="text"
                {...register("color")}
                placeholder="Enter color"
                required
              />
            </div>
            <div>
              <Label>Size</Label>
              <Input
                type="text"
                {...register("size")}
                placeholder="Enter size"
                required
              />
            </div>
            <div>
              <Label>Material</Label>
              <Input
                type="text"
                {...register("material")}
                placeholder="Enter material"
                required
              />
            </div>
            <div>
              <Label>SKU</Label>
              <Input
                type="text"
                {...register("sku")}
                placeholder="Enter SKU"
                required
              />
            </div>
            <div>
              <Label>Rating</Label>
              <Input
                type="number"
                {...register("rating")}
                placeholder="Enter rating"
                min="1"
                max="5"
                required
              />
            </div>
            <div>
              <Label>Discount (%)</Label>
              <Input
                type="number"
                {...register("discount")}
                placeholder="Enter discount"
              />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                type="text"
                {...register("tags")}
                placeholder="Enter product tags"
              />
            </div>
            <div>
              <Label>Author</Label>
              <Input
                type="text"
                {...register("author")}
                placeholder="Enter product author"
                required
              />
            </div>
            <div>
              <Label>Category</Label>
              <select {...register("category")} className="form-select">
                <option value="Notebooks">Notebooks</option>
                <option value="Pens">Pens</option>
                <option value="Pencils">Pencils</option>
                <option value="Markers">Markers</option>
                <option value="Erasers">Erasers</option>
                <option value="Staplers">Staplers</option>
                <option value="Folders">Folders</option>
                <option value="Calculators">Calculators</option>
                <option value="Paper">Paper</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <Label>Status</Label>
              <Select {...register("status")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="text-purple-600 bg-black">
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Product Image</Label>
              <Input type="file" {...register("productImg")} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isFeatured" {...register("isFeatured")} />
              <Label htmlFor="isFeatured">Featured Product?</Label>
            </div>
          </div>
          <Button type="submit" className="w-full flex items-center gap-2">
            <Check /> Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProducts;
