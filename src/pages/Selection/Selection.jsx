import React, { useState } from 'react';
import Salon from './Salon/Salon';
import Ktv from './Ktv/Ktv';
import TreeView from '../../components/Treeviews/Treeview';
import treeViewContent from '../../content/treeViewContent';
import selectionContent from '../../content/selectionContent';
import Description from './Description/Description'

const Selection = () => {
    const [selectedComponent, setSelectedComponent] = useState("SALON");

    const handleItemClick = (onclick) => {
        setSelectedComponent(onclick);
    };

    return (
        <div className="flex flex-row">
            <div className="sticky left-0 top-0">
                <TreeView treeViewContent={treeViewContent} onItemClick={handleItemClick} />
            </div>
            <div className="flex flex-col">
                {selectedComponent === 'SALON' && <Salon content={selectionContent.find(item => item.businessType === 'SALON')} />}
                {selectedComponent === 'KTV' && <Ktv content={selectionContent.find(item => item.businessType === 'KTV')} />}

                <Description  />
            </div>
        </div>
    );
}

export default Selection;
