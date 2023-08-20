import Center from "./Center";
import { styled } from "styled-components";
import PrimaryBtn from "./PrimaryBtn";

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
    grid-template-columns:0.8fr1.2fr;
    gap:40px;
    display:flex;
    img{
        max-width:100%;
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

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>MacBook Pro</Title>
                            <desc>sdafgsakdjhfgaskdhf asdhfgaksdjhfg aksh</desc>
                            <br></br>
                            <br></br>
                            <ButtonsWrapper>
                                <button>Read More</button>
                                <PrimaryBtn size='l'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                                </svg>
                                Add To Cart</PrimaryBtn>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <div>
                            <img src="data:image/jpeg;base64,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"></img>
                        </div>
                    </Column>
                </Wrapper>            
            </Center>    
        </Bg>
    )
}