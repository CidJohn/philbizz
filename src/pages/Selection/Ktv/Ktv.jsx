import React from 'react'
import selectionContent from '../../../content/selectionContent';

function Ktv({content}) {

   // If "Salon" content is found, extract the "business" array, otherwise default to an empty array
   const businessData = content ? content.business : [];
 
   return (
     <>
       {businessData.map((item, index) => (
            <div key={index}>
             <h1 className='text-4xl'>{item.header}</h1>
             <p>{item.paragraph}</p>
            </div>
     ))}
        
     </>
   )
}

export default Ktv