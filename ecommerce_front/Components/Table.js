import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th{
        text-align:left;
        text-transform: uppercase;
        color: #000;
        font-weight:bold;
        font-size:1.2rem;
    }
    td{
        border-top:1px solid rgba(0,0,0,0.1);
    }
`;

export default function Table(props)
{
    return (
    <StyledTable {...props} />
    );
}