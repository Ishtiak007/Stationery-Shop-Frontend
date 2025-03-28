import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { useAddProductMutation } from "@/redux/features/products/productsApi";
import { TProducts } from "@/types/productTypes";

const AddProducts = () => {
  const [addProduct] = useAddProductMutation();
  const { handleSubmit, register } = useForm({});

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: Partial<TProducts>
  ) => {
    const toastId = toast.loading("Loading...");
    const productData = {
      name: data.name,
      author: data.author,
      description: data.description,
      category: data.category,
      price: data.price,
      stockQuantity: data.stockQuantity,
      brand: data.brand,
      color: data.color,
      size: data.size,
      material: data.material,
      sku: data.sku,
      rating: data.rating,
      isFeatured: data.isFeatured,
      tags: data.tags,
      status: data.status,
      discount: data.discount?.percentage
        ? {
            percentage: data.discount.percentage.toString(),
            validUntil: data.discount.validUntil
              ? new Date(data.discount.validUntil).toISOString()
              : new Date().toISOString(),
          }
        : undefined,
      productImg:
        data.productImg && data.productImg[0]
          ? (data.productImg[0] as string)
          : undefined,
    };
    const stringifyData = JSON.stringify(productData);

    try {
      const res = await addProduct(stringifyData);

      if (res.data) {
        toast.success(res.data.message, { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex font-orbitron items-center gap-2 text-xl font-semibold mx-auto">
          Add Product
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
              <Label>Brand Name</Label>
              <Input
                type="text"
                {...register("brand")}
                placeholder="Enter product brand"
                required
              />
            </div>

            <div>
              <Label>Price Range</Label>
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
              <Label>Stock Keeping Unit</Label>
              <Input
                type="text"
                {...register("sku")}
                placeholder="Enter Stock Keeping Unit"
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
              <Label>Tags (use commas to separate)</Label>
              <Input
                type="text"
                {...register("tags")}
                placeholder="Enter product tags -use commas to separate"
              />
            </div>
            <div>
              <Label>Author Name</Label>
              <Input
                type="text"
                {...register("author")}
                placeholder="Enter product author"
                required
              />
            </div>
            <div className="border rounded-md p-2">
              <Label>Choose a Category</Label>
              <select
                {...register("category")}
                defaultValue="Pencils"
                className="form-select cursor-pointer"
              >
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
              <Label>Product Status</Label>
              <Select {...register("status")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="text-white cursor-pointer bg-black">
                  <SelectItem className="cursor-pointer" value="available">
                    Available
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="out_of_stock">
                    Out of Stock
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="discontinued">
                    Discontinued
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Product Image</Label>
              <Input type="file" {...register("productImg")} />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Enter product description"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="isFeatured">Is this featured product?</Label>
              <Checkbox id="isFeatured" {...register("isFeatured")} />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-md 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-4"
          >
            Add This Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProducts;
