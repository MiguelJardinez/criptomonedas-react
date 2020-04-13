import React from 'react'
import styled from '@emotion/styled';

const Mensaje = styled.p`
    background-color: #b7322c; 
    padding: 1rem; 
    color: white; 
    font-size: 30px; 
    text-transform: uppercase; 
    font-weight: 700; 
    text-align: center; 
    font-family: 'Bebas Neue', cursive; 
`;

const Error = ({ mensaje }) => {
    return ( 
        <Mensaje> {mensaje} </Mensaje>
     );
}
 
export default Error;