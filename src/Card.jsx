// import React from 'react';

// const Card = (props) => {
//     return (
//         <div>
//             <input type='text' onChange={(e) =>
//                  props.setName(e.target.value)}/>  
//         </div>
//     );
// }

// export default Card;

import { useState } from 'react';

function Card({ title }) {
    const [name, setName] = useState("");

    return (
        <>
        <input value={name}
        onChange={() => setName(e.target.value)
        </>
    )
}