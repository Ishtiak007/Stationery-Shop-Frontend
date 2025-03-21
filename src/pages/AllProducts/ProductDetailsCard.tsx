import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { TProducts } from "@/types/productTypes";
import { Button } from "@/components/ui/button";
interface DecodedToken {
  role: string;
  email?: string;
}
const ProductDetailsCard = ({ product }: { product: TProducts }) => {
  const navigate = useNavigate();
  const {
    name,
    price,
    productImg,
    description,
    stockQuantity,
    discount,
    category,
    brand,
    _id,
  } = product;
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user: DecodedToken | null = null;
  if (token) {
    user = verifyToken(token);
  }
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Sign in before adding to cart!");
      return;
    }

    try {
      dispatch(
        addToCart({
          product: _id,
          name,
          price,
          quantity: 1,
          stock: stockQuantity,
          image: productImg as string,
          userEmail: user?.email,
        })
      );
      toast.success("Product added to your cart!");
    } catch {
      toast.error("Failed to add product to cart!");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Sign in before purchasing!");
      navigate("/login");
      return;
    }

    if (user?.role !== "user" && user?.role !== "admin") {
      toast.error("Unauthorized action!");
      return;
    }

    try {
      dispatch(
        addToCart({
          product: _id,
          name,
          price,
          quantity: 1,
          stock: stockQuantity,
          image: productImg as string,
          userEmail: user.email,
        })
      );
      toast.success("Product added to your cart!");
      navigate("/cart");
    } catch {
      toast.error("Failed to add product to cart!");
    }
  };

  return (
    <div className="w-[50rem] p-4 font-orbitron bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <img src={productImg} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 font-serif text-sm">{description}</p>
        <p className="text-lg font-semibold text-primary">Tk {price}</p>
        <p className="text-sm text-red-500">{stockQuantity} left in stock</p>
        {discount && (
          <p className="text-sm font-serif text-green-600">
            {discount.percentage}% off - valid until{" "}
            {moment(discount.validUntil).format("MMMM Do YYYY")}
          </p>
        )}
        <p className="text-sm font-bold text-gray-500">Category: {category}</p>
        <p className="text-sm font-mono text-blue-500">
          Brand: {brand || "N/A"}
        </p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-2 rounded-md shadow hover:scale-105 transition-transform"
          >
            <ShoppingCart size={18} />{" "}
            <Button variant={"outline"} className="text-black">
              Add to Cart
            </Button>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FA641C] text-white py-2 rounded-md shadow hover:scale-105 transition-transform"
          >
            <Zap size={18} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
