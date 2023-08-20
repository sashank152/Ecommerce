import Featured from "@/Components/Featured";
import Header from "@/Components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Featured />
    </div>
  )
}

export function getServerSideProps(){
  
}