import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { FaUserPen } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/Loading";

const MyProfile = () => {
  const { data: myData, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loading />;
  }
  const { name, email, role, country, city, phone, postalCode, address } =
    myData?.data || {};

  return (
    <>
      <div className="">
        <h2 className="text-xl rounded-md px-1 font-black dark:text-white">
          My Profile
        </h2>
        {/* Profile image section */}
        <div className=" mt-6 border rounded-lg border-gray-200 p-4 flex flex-col justify-center items-center">
          <div className=" flex items-center gap-6">
            <div className="size-[120px] bg-teal-300 rounded-full flex justify-center items-center">
              <h1 className="text-center">{name}'s Profile image</h1>
            </div>
            <div className="font-medium text-sm">
              <h2 className="text-3xl ">
                {(name ?? "").charAt(0).toUpperCase() + (name ?? "").slice(1)}
              </h2>
              <p className=" text-foreground">
                Role:{" "}
                {(role ?? "N/A").charAt(0).toUpperCase() +
                  (role ?? "N/A").slice(1)}
              </p>
              <p className=" text-foreground">
                {(city ?? "N/A").charAt(0).toUpperCase() +
                  (city ?? "N/A").slice(1)}

                {country && country !== "N/A"
                  ? country.charAt(0).toUpperCase() + country.slice(1)
                  : ""}
              </p>
            </div>
          </div>
          <Link to="/dashboard/update-profile">
            <div className="my-10">
              <button
                className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
  transition-all duration-300 ease-in-out 
  hover:bg-teal-700 hover:text-white hover:border-none"
              >
                Edit Profile
                <FaUserPen size={25} />
              </button>
            </div>
          </Link>
        </div>
        {/* Personal Information */}
        <section className="mt-8 border rounded-md border-gray-200 p-4">
          <div className=" flex items-center justify-start">
            <h2 className=" text-lg font-semibold">Personal Information</h2>
          </div>
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2">
            <div className=" space-y-6">
              <div>
                <label className=" font-medium text-foreground text-sm">
                  First Name
                </label>
                <h4 className=" text-md font-medium mt-1">
                  {(name ?? "N/A").charAt(0).toUpperCase() +
                    (name ?? "N/A").slice(1)}
                </h4>
              </div>
              <div>
                <label className=" font-medium text-foreground text-sm">
                  Email address
                </label>
                <h4 className=" text-md font-medium mt-1">{email}</h4>
              </div>
            </div>
            <div className=" space-y-6">
              <div>
                <label className=" font-medium text-foreground text-sm">
                  Last Name
                </label>
                <h4 className=" text-md font-medium mt-1">NA</h4>
              </div>
              <div>
                <label className=" font-medium text-foreground text-sm">
                  Phone number
                </label>
                <h4 className=" text-md font-medium mt-1">
                  {phone ? phone : "NA"}
                </h4>
              </div>
            </div>
          </div>
        </section>
        {/* Address */}
        <section className="mt-8 border rounded-md border-gray-200 p-4">
          <div className=" flex items-center justify-start">
            <h2 className=" text-lg font-semibold">{address}</h2>
          </div>
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2">
            <div className=" space-y-6">
              <div>
                <label className=" font-medium text-foreground text-sm">
                  Country
                </label>
                <h4 className=" text-md font-medium mt-1">
                  {(country ?? "N/A").charAt(0).toUpperCase() +
                    (country ?? "N/A").slice(1)}
                </h4>
              </div>
              <div>
                <label className=" font-medium text-foreground text-sm">
                  Postal Code
                </label>
                <h4 className=" text-md font-medium mt-1">{postalCode}</h4>
              </div>
            </div>
            <div className=" space-y-6">
              <div>
                <label className=" font-medium text-foreground text-sm">
                  City/State
                </label>
                <h4 className=" text-md font-medium mt-1">
                  {(city ?? "N/A").charAt(0).toUpperCase() +
                    (city ?? "N/A").slice(1)}
                </h4>
              </div>
              <div>
                <Label className=" font-medium text-foreground text-sm">
                  Address
                </Label>
                <h4 className=" text-md font-medium mt-1">
                  {(address ?? "N/A").charAt(0).toUpperCase() +
                    (address ?? "N/A").slice(1)}
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyProfile;
