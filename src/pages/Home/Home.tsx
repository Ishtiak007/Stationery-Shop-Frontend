import Banner from "./Banner/Banner";
import Blog from "./Blog/Blog";
import CustomerFavorites from "./CustomerFavorites/CustomerFavorites";
import Services from "./Services/Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <CustomerFavorites />
      <Blog />
    </div>
  );
};

export default Home;
