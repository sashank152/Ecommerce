import Center from "./Center";
import { styled } from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import ButtonLink from "./ButtonLink";
import CartIcon from "@/Icons/CartIcon";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Bg = styled.div`
    background-color:#222;
    color:#fff;
    padding:50px0;
`;

const Title=styled.h1`
    margin:0;
    font-weight:normal;
    font-size:3rem;
`;

const desc=styled.p`
    color:#aaa;
    font-size:0.8rem;
    margin:0;
`;

const Wrapper=styled.div`
    display:grid;
    grid-template-columns:1.1fr0.9fr;
    gap:40px;
    display:flex;
    justify-content:space-between;
    img{
        max-width:100%;
        max-height:250px;
    }
`;

const Column = styled.div`
    display:flex;
    align-items:center;
`;

const ButtonsWrapper=styled.div`
    display:flex;
    gap:10px;
    margin-top:25px;
`;


export default function Featured({FeaturedProduct}) {
    const {setCartProducts} = useContext(CartContext);
    function addFeaturedToCart()
    {
        setCartProducts(prev => [...prev,FeaturedProduct._id]);
        console.log(setCartProducts);
    }
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>{FeaturedProduct.title}</Title>
                            <desc>{FeaturedProduct.Description}</desc>
                            <br></br>
                            <br></br>
                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+FeaturedProduct._id}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                                </svg>
                                    Read More
                                </ButtonLink>
                                <PrimaryBtn onClick={addFeaturedToCart}>
                                    <CartIcon/>
                                    Add To Cart
                                </PrimaryBtn>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <div>
                            <img src={FeaturedProduct.images[0]}></img>
                        </div>
                    </Column>
                </Wrapper>            
            </Center>    
        </Bg>
    )
}