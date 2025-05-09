import { useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetAllProductsQuery,
  useUpdateProductWithImageMutation,
} from "@/redux/features/products/productsApi";
import { TProducts } from "@/types/productTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const [updateProductWithImage] = useUpdateProductWithImageMutation();

  const product = allProducts?.data?.find((item: TProducts) => item._id === id);

  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        discount: product.discount || {},
        tags: product.tags?.join(", "),
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: Partial<TProducts>
  ) => {
    const toastId = toast.loading("Updating product...");

    const productData = {
      name: data.name,
      author: data.author,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      stockQuantity: Number(data.stockQuantity),
      brand: data.brand,
      color: data.color,
      size: data.size,
      material: data.material,
      sku: data.sku,
      rating: Number(data.rating),
      isFeatured: Boolean(data.isFeatured),
      tags:
        typeof data.tags === "string"
          ? (data.tags as string).split(",").map((tag) => tag.trim())
          : [],

      status: data.status,
      discount: data.discount?.percentage
        ? {
            percentage: data.discount.percentage.toString(),
            validUntil: data.discount.validUntil
              ? new Date(data.discount.validUntil).toISOString()
              : new Date().toISOString(),
          }
        : undefined,
    };

    try {
      const res = await updateProductWithImage({
        productId: id,
        data: {
          ...productData,
          file: data.productImg?.[0],
        },
      });

      if (res?.data?.message) {
        toast.success(res.data.message, { id: toastId });
        navigate("/all-product");
      }
    } catch {
      toast.error("Failed to update product", { id: toastId });
    }
  };

  return (
    <Card className="max-w-6xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <button className="bg-teal-600 text-white px-4 py-2 rounded">
        <Link to="/dashboard" relative="path">
          Go back
        </Link>
      </button>
      <CardHeader>
        <CardTitle className="text-center gap-2 text-xl font-bold">
          you are Updating - {product?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Product Name</Label>
              <Input type="text" {...register("name")} required />
            </div>
            <div>
              <Label>Brand Name</Label>
              <Input type="text" {...register("brand")} required />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea {...register("description")} required />
            </div>
            <div>
              <Label>Product Price</Label>
              <Input type="number" {...register("price")} required />
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input type="number" {...register("stockQuantity")} required />
            </div>
            <div>
              <Label>Product Color</Label>
              <Input type="text" {...register("color")} required />
            </div>
            <div>
              <Label>Product Size</Label>
              <Input type="text" {...register("size")} required />
            </div>
            <div>
              <Label>Product Material</Label>
              <Input type="text" {...register("material")} required />
            </div>
            <div>
              <Label>Stock keeping unit</Label>
              <Input type="text" {...register("sku")} required />
            </div>
            <div>
              <Label>Product Rating</Label>
              <Input type="number" {...register("rating")} min="1" max="5" />
            </div>
            <div>
              <Label>Product Discount (%)</Label>
              <Input type="number" {...register("discount.percentage")} />
            </div>
            <div>
              <Label>Discount Valid Until</Label>
              <Input type="date" {...register("discount.validUntil")} />
            </div>
            <div>
              <Label>Product Tags (use comma)</Label>
              <Input type="text" {...register("tags")} />
            </div>
            <div>
              <Label>Author Name</Label>
              <Input type="text" {...register("author")} required />
            </div>
            <div className="border p-1 rounded-md">
              <Label>Category</Label>
              <select
                {...register("category")}
                className="form-select cursor-pointer "
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="Pens">Pens</option>
                <option value="Pencils">Pencils</option>
                <option value="Books">Books</option>
                <option value="Markers">Markers</option>
                <option value="Erasers">Erasers</option>
                <option value="Highlighters">Highlighters</option>
                <option value="Staplers">Staplers</option>
                <option value="Notebooks">Notebooks</option>
                <option value="Folders">Folders</option>
                <option value="Calculators">Calculators</option>
                <option value="Paper">Paper</option>
                <option value="Paper Clips">Paper Clips</option>
                <option value="Glue">Glue</option>
                <option value="Scissors">Scissors</option>
                <option value="Tape">Tape</option>
                <option value="Rulers">Rulers</option>
                <option value="Sticky Notes">Sticky Notes</option>
                <option value="Whiteboard">Whiteboard</option>
                <option value="Sharpener">Sharpener</option>
                <option value="Binder Clips">Binder Clips</option>
                <option value="Index Cards">Index Cards</option>
                <option value="Thumbtacks">Thumbtacks</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="border p-1 rounded-md">
              <Label>Status</Label>
              <select
                {...register("status")}
                className="form-select cursor-pointer"
              >
                <option disabled value="">
                  Select a Status
                </option>
                <option value="available">Available</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
            <div>
              <Label>Product Image</Label>
              <Input type="file" {...register("productImg")} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isFeatured" {...register("isFeatured")} />
              <Label htmlFor="isFeatured">Is this Featured Product?</Label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Check /> Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductUpdate;
