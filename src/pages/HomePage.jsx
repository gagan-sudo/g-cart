import { Container, Grid,  } from "@mui/material";
// import { useGetProductsQuery } from "../services/product";
import ProductCardForList from "../components/ProductCardForList";
import Loader from "../helper/Loader";
import Banner from "../components/Banner";
import ProductSlider from "../components/ProductSlider";
import Layout from "../layout";

const HomePage = () => {

  // const { data : products = [], error, isLoading } = useGetProductsQuery();
 

  // if(isLoading) return <Loader/>
  // if(error) return <>error</>


  return (
   <Layout>
        <Banner/>
      <Container>
        {/* <Grid container spacing={3} mt={3} justifyContent="center">
          {products?.products.map((product,i) => (
           <ProductCardForList key={i} product={product} />
          ))}
        </Grid> */}
        <ProductSlider category={"vehicle"}/>
        <ProductSlider category={"smartphones"}/>
      </Container>
    </Layout>
  );
};

export default HomePage;
