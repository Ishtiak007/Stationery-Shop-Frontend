import Banner from "./Banner/Banner";
import Blog from "./Blog/Blog";
import CustomerFavorites from "./CustomerFavorites/CustomerFavorites";
import Newsletter from "./Newsletter/Newsletter";
import Services from "./Services/Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <CustomerFavorites />
      <Blog />
      <Newsletter />
    </div>
  );
};

export default Home;
