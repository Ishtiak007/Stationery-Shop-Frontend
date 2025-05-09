import Banner from "./Banner/Banner";
import Blog from "./Blog/Blog";
import CustomerFavorites from "./CustomerFavorites/CustomerFavorites";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import FAQSection from "./FAQ/FAQsection";
import Newsletter from "./Newsletter/Newsletter";
import Services from "./Services/Services";
import StatsSection from "./StatsSection/StatsSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <CustomerFavorites />
      <FAQSection />
      <StatsSection />
      <Blog />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
};

export default Home;
