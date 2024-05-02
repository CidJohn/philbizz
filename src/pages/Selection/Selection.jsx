import React from 'react'
import Salon from './Salon/Salon';
import selectionContent from '../../content/selectionContent';
import Description from './Description/Description';

const Selection = () => {
    return (
        <>
            {selectionContent.map((item, index) => (
                <div className='flex flex-col'>
                    <Salon header={item.header} paragraph={item.paragraph} key={index} />
                    <Description header={item.header} paragraph={item.paragraph} key={index} />
                </div>
            ))}
        </>
    );
}

export default Selection;