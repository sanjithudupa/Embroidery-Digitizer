import React from "react";

import { Link, useLocation } from "react-router-dom";

const Unknown: React.FC = () => {
    
    const location = useLocation();

    return (
        <div>
            <h2>Sorry, the requested url {location.pathname} was not found.</h2>
            <Link to="/">Return Home</Link>
        </div>
    )
}

export default Unknown;