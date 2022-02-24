import React from 'react';


const MenuItem = ({name, color, menu}) => (
    <div>
        <p>{name.toUpperCase()}</p>
        <p>{color.toUpperCase()}</p>
    </div>    
);

export default MenuItem;