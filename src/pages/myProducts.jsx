import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

function MyProducts() {
    const user = useContext(UserContext)
    return (user? <div>Add</div>:<Navigate to="/" />)
}

export default MyProducts;