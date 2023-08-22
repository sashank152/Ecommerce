import Featured from "@/Components/Featured";
import Header from "@/Components/Header";
import NewProducts from "@/Components/NewProducts";
import { MongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/ProductModel";

export default function HomePage({FeaturedProduct,newProducts}) {
  return (
    <div>
      <Header />
      <Featured FeaturedProduct={FeaturedProduct}/>
      <NewProducts products = {newProducts}/>
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId =  '649e91ac9331bc6ceb0a17b3'
  await MongooseConnection()
  const FeaturedProduct =await  Product.findById(featuredProductId)
  const newProducts = await Product.find({},null,{sort: {'_id':-1}, limit:10});
  return {
    props:{FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
          newProducts : JSON.parse(JSON.stringify(newProducts))},
  };
}