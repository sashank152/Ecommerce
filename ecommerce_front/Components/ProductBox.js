import styled from "styled-components";
import { StyledButton } from "./PrimaryBtn";
import CartIcon from "@/Icons/CartIcon";
import Link from "next/link";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
    background-color:#fff;
    padding:20px;
    height:120px;
    text-align:center;
    display:flex;
    justify-content:center;
    border-radius:10px;
    img{
        max-width:100%;
        max-height:80px;
    }
`;

const Title = styled(Link)`
    font-weight:normal;
    font-size:.9rem;
    margin:0;
    color:inherit;
    text-decoration:none;
`;

const ProductInfoBox = styled.div`
    margin-top:5px;
`;

const PriceRow = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:2px;
`;

const Price = styled.div`
    font-size:1.5rem;
    font-weight:500;
`;

export default function ProductBox({_id,title,Description,price,images}){
    const uri = '/product'+_id;
    return(
        <ProductWrapper>       
            <WhiteBox href={uri}>
                <div>
                <img src={images[0]} alt="" />
                </div> 
           </WhiteBox>
           <ProductInfoBox>
            <Title href={uri}>{title}</Title>
            <PriceRow>
                <div>
                    <Price>S${price}</Price>
                </div>
            <StyledButton>
                <CartIcon />
            </StyledButton>
            </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>

    )
}