import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const StyledHeader= styled.header`
    background-color:#222;
    padding:40px
`;

const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
`;

const Wrapper=styled.div`
    display:flex;
    justify-content:space-between;
    padding:20px0;
`;

const StyledNav=styled.nav`
    display:flex;
    gap:15px;
`;

const NavLink = styled(Link)`
    color:#aaa;
    text-decoration:none;
`;

export default function Header(){
    const {cartProducts} = useContext(CartContext);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce Store</Logo>
                    <StyledNav>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cartPage'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>  
                </Wrapper>
            </Center>  
        </StyledHeader>

    )
}