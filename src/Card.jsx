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
    const [likes, setLikes] = useState(0);

    return (
        <>
        <h2>{title}</h2>

        <button onClick={() => setLikes(likes + 1)}>
            Like
        </button>

        <p>Likes: {likes}</p>
        </>
    );
}

export default Card;

