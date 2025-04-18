/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { TProducts } from "@/types/productTypes";

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
          price: parseFloat(price),
          quantity: 1,
          stock: parseInt(stockQuantity as any),
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
          price: parseFloat(price),
          quantity: 1,
          stock: parseInt(stockQuantity as any),
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
    <div className="lg:w-[40rem] bg-teal-200 bg-opacity-10 p-4 rounded-xl shadow-md overflow-hidden border border-gray-100 mt-20">
      <img
        src={productImg}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm outline outline-[1px] outline-gray-300 rounded-2xl p-[2px]">
            <span className="text-red-500">{stockQuantity}</span> left in stock
          </p>
        </div>
        <p className="text-gray-600 text-base">{description}</p>
        <p className="text-lg font-semibold">{parseFloat(price)} Tk</p>

        {discount && (
          <p className="text-base text-green-800">
            {discount.percentage}% off - valid until{" "}
            {moment(discount.validUntil).format("MMMM Do YYYY")}
          </p>
        )}
        <p className="text-sm font-bold text-black">Category: {category}</p>
        <p className="text-sm text-blue-800">Brand: {brand || "N/A"}</p>
        <div className="flex gap-2 mt-4 items-center justify-center">
          <button onClick={handleAddToCart}>
            <button
              className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-4"
            >
              Add to Cart
            </button>
          </button>
          <button
            onClick={handleBuyNow}
            className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out bg-teal-700 hover:bg-white text-white hover:text-black  my-4"
          >
            {" "}
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
