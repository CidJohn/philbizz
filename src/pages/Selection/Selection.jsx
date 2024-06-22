import React, { useState, useEffect } from 'react';
import selectionContent from '../../content/selectionContent';
import Card from '../../components/Card/Card';
import TreeView from '../../components/Treeviews/Treeview';
import treeViewContent from '../../content/treeViewContent';

const Selection = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Load the selected item from local storage on component mount
        const savedItemId = localStorage.getItem('selectedItemId');
        if (savedItemId) {
            const selectedItemObj = treeViewContent.find(item => item.id === parseInt(savedItemId, 10));
            setSelectedItem(selectedItemObj);
        }
    }, []);

    const handleItemClick = (id) => {
        console.log('Clicked Item ID:', id);
        
        // Find the selected item object from treeViewContent based on id
        const selectedItemObj = treeViewContent.find(item => item.id = id);
        console.log('Selected Item Object:', selectedItemObj);

        // Save the ID to local storage
        localStorage.setItem('selectedItemId', id);

        // Set the selected item to state
        setSelectedItem(selectedItemObj);
    };

    return (
        <div className="flex">
            <TreeView 
                treeViewContent={treeViewContent}
                onItemClick={handleItemClick}
            />
            <div className="flex flex-wrap ml-10">
                {/* Check if selectedItem is not null before mapping */}
                {selectedItem && 
                    selectionContent
                        .filter(select => select.id === selectedItem.id) // Filter selectionContent based on selectedItem's id
                        .map((select, index) => (
                            <React.Fragment key={index}>
                                {select.cardSetting.map((setting, settingIndex) => (
                                    // Display cards based on condition (e.g., location is 'Manila')
                                    setting.location === 'Manila' && (
                                        <div className="flex flex-wrap mt-5" key={settingIndex}>
                                            {setting.settings.map((card, cardIndex) => (
                                                <div className="bg-cover" key={cardIndex}>
                                                    <Card
                                                        src={card.images}
                                                        title={card.title}
                                                        desc={card.desc}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </React.Fragment>
                        ))}
            </div>
        </div>
    );
}

export default Selection;
