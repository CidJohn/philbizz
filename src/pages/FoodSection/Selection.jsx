import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import TreeView from '../../components/Treeviews/Treeview';
import treeViewContent from '../../content/treeViewContent';
import selectionContent from '../../content/selectionContent';
import sampleItem from '../../content/sampleItem';
import Image from '../../components/Image/Image';
import { FoodTreeView } from '../../content/FoodTreeView';

const Selection = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Load the selected item from local storage on component mount
    const savedItem = JSON.parse(localStorage.getItem('selectedItem'));
    if (savedItem) {
      const selectedItemObj = findItemById(treeViewContent, savedItem.id);
      setSelectedItem(selectedItemObj);
    }

  }, []);

  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id || item.ids === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleItemClick = (id, path) => {
    console.log('Clicked Item ID:', id);

    // Find the selected item object from treeViewContent based on id
    const selectedItemObj = findItemById(treeViewContent, id);
    console.log('Selected Item Object:', selectedItemObj);

    // Save the ID and path to local storage
    localStorage.setItem('selectedItem', JSON.stringify({ id, path }));

    // Set the selected item to state
    setCurrentPath(path);
    setSelectedItem(selectedItemObj.id);
    window.location.reload();
  };
  return (
    <div className="flex ">
      {currentPath === 'food' ? (
        <FoodTreeView 
          treeViewContent={treeViewContent}
          onItemClick={handleItemClick}
        />
      ) : (
        <TreeView 
          treeViewContent={treeViewContent}
          onItemClick={handleItemClick}
        />
      )}
      <div className="flex flex-wrap">
      <div className="flex flex-wrap ml-10">
        {/* Check if selectedItem is not null before mapping */}
        {selectedItem && 
          selectionContent
             .filter(select => select.id === selectedItem.id) 
            .map((select, index) => (
              <React.Fragment key={index}>
                {select.cardSetting
                .map((setting, settingIndex) => (
                  setting.location === selectedItem.name && (
                    <div className="flex flex-wrap mt-5" key={settingIndex}>
                      {setting.settings.map((card, cardIndex) => (
                        <div className="bg-cover" key={cardIndex}>
                          <Card
                            src={card.images}
                            title={card.title}
                            desc={card.desc}
                            style={{ width: '200px', height: '200px', backgroundSize: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </React.Fragment>
            ))}
      </div>
      <div className=" flex flex-row p-4">
          <div className=" container">
              <h1 className="text-2xl font-bold mb-4">Item List</h1>
                <ul className="space-y-4">
                  {sampleItem.map(item => (
                    <li key={item.id} className="bg-white shadow-md rounded-lg p-4 flex items-center ">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
          </div>
            <figure className="max-w-md p-4">
              <Image className="rounded-lg" src={"ktv2.jpg"} alt="Hair salon interior" />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Sample Header</figcaption>
            </figure>
          </div>
    </div>
    </div>
  );
};

export default Selection;
