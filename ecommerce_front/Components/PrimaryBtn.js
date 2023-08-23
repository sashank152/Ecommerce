import { css, styled } from "styled-components"

export const ButtonStyle = css`
    background-color:#5542F6;
    border:0;
    border-radius:5px;
    color:#fff;
    padding:5px15px;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    text-decoration:none;
    text-align:center;
    svg{
        height:16px;
        margin-right:5px;
    };
    font-size:1.2rem;
    padding:10px20px;
`;

export const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function PrimaryBtn({children,...rest})
{
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    )
}