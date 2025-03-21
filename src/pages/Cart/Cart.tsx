// import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Container from "@/components/ui/container";
import {
  placeOrder,
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi.ts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect } from "react";
import { toast } from "sonner";
import { ImCart } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const dispatch = useAppDispatch();
  // const { data: userInfo } = useGetMeQuery(undefined);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();
  const cartData = useAppSelector((state) => state.cart);

  const cartProducts = cartData?.items || [];
  // const userEmail = userInfo?.data?.email;

  const userBaseCartProducts = cartData?.items || [];
  // const deliveryDate = moment().add(7, "days").format("ddd MMM D");

  const handlePlacedOrder = async () => {
    try {
      const res = await createOrder({ products: cartProducts });
      console.log(res, "result");
      if (res?.data?.success) {
        dispatch(placeOrder());
      } else {
        toast.error("Order placement failed:", res.data.message);
      }
    } catch {
      toast.error("Error placing order:");
    }
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 500);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  if (!cartProducts?.length) {
    return (
      <div className="text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
        <p className=" flex items-center gap-3">
          There's nothing in your cart yet. Start shopping now! <ImCart />
        </p>
        <div>
          <Link to="/all-product">
            <button
              className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 mx-auto font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-5"
            >
              Explore Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <div className="lg:flex justify-around gap-6">
          {/* Cart Items */}
          <div className="space-y-4 flex-1 lg:mt-[90px]">
            {userBaseCartProducts?.map((product) => (
              <div
                key={product.product}
                className="flex items-center justify-between p-4 border shadow-xl rounded-md"
              >
                <img
                  className="size-36 object-cover rounded-md"
                  src={product?.image}
                  alt={product.name}
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 font-medium outline outline-[1px] outline-gray-200 rounded-full px-3 py-1 my-3 inline-block">
                    Tk {product.price}
                  </p>
                  <div className="flex items-center justify-center mt-2 space-x-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.product,
                            quantity: Math.max(product.quantity - 1, 1),
                          })
                        )
                      }
                      className="p-2 rounded-full hover:cursor-pointer border border-neutral-300
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-xl">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.product,
                            quantity: Math.min(
                              product.quantity + 1,
                              product.stock
                            ),
                          })
                        )
                      }
                      className="p-2 rounded-full hover:cursor-pointer border border-neutral-300
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(product.product))}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-600"
                >
                  <MdOutlineDelete size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex-1 h-[300px] p-6 border border-gray-200 shadow-xl rounded-md mt-[90px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary <span>Price ({cartProducts.length} items)</span>
            </h2>
            <div className="flex justify-between font-medium text-gray-700 mb-2 text-[10px] md:text-lg">
              <span>Price : </span>
              <span>{cartData.totalPrice.toFixed(2)} Tk</span>
            </div>
            <div className="flex justify-between font-medium text-gray-700 mb-2">
              <span>Delivery Charges : </span>
              <span className="text-[10px] text-lg">0 Tk</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-[10px] md:text-lg font-semibold text-gray-800">
              <span>Total Amount</span>
              <span>{cartData.totalPrice.toFixed(2)} Tk</span>
            </div>
            <button
              onClick={handlePlacedOrder}
              className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-5 w-full"
            >
              Payment to confirm Order
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
