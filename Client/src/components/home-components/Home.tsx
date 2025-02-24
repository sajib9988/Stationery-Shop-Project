import CustomerReviewsSlider from "../../pages/CustomerReviewsSlider";
import Footer from "../../pages/Footer";
import ProductHomePage from "../../pages/ProductHomePage";
import Banner from "./Banner";




const Home = () => {
  return (
    <div>
      
      <Banner></Banner>
      <ProductHomePage></ProductHomePage>
      <CustomerReviewsSlider></CustomerReviewsSlider>
      <Footer></Footer>
    </div>
  );
};

export default Home;