import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import TreeView from '../../components/Treeviews/Treeview';
import selectionContent from '../../content/selectionContent';
import sampleItem from '../../content/sampleItem';
import Image from '../../components/Image/Image';
import { FoodTreeView } from '../../content/FoodTreeView';
import navbarContent from '../../content/navbarContent';
import { useLocation } from 'react-router-dom';
import treeViewContent from '../../content/treeViewContent';

const Selection = () => {
    const location = useLocation()
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem('selectedItem'));
    if (savedItem) {
      const selectedItemObj = currentPath.path === "/food"
        ? findItemById(FoodTreeView, savedItem.id)
        : findItemById(treeViewContent, savedItem.id);
      setSelectedItem(selectedItemObj);
    }
   
    const selectedItemPath = findingPath(navbarContent, location.pathname);
    setCurrentPath(selectedItemPath || '');
  }, [currentPath]);

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
  const findingPath = (items, path) => {
    for (const item of items) {
        if (item.path === path) return item;
        if (item.children) {
          const found = findItemById(item.children, path);
          if (found) return found;
        }
      }
      return null;
  }
  const handleItemClick = (id, path) => {
    const selectedItemObj = currentPath.name === "Food" 
    ?findItemById(FoodTreeView, id) 
    :findItemById(treeViewContent, id);
    console.log(selectedItemObj);
    localStorage.setItem('selectedItem', JSON.stringify({ id, path }));
    setSelectedItem(selectedItemObj);
  };
  //#region TreeView
  const renderTreeView = () => {
    if (currentPath.path === "/food") {
      return (
        <TreeView 
          treeViewContent={FoodTreeView}
          onItemClick={handleItemClick}
        />
      );
    }
    if (currentPath.path === "/business") {
      return (
      <TreeView 
        treeViewContent={treeViewContent}
        onItemClick={handleItemClick}
      />
    );
  }
  };
  //#endregion
  //#region CardSettings
  const handleCards = () => {
      if(currentPath.name === "Food"){
        if(!selectedItem ){
          return (
          selectionContent.map((select, index) => (
            <React.Fragment key={index}>
              {select.path === "Food" &&
              select.cardSetting.map((setting, settingIndex) => (
                <div className="flex flex-wrap mt-5 " key={settingIndex}>
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
              ))}
            </React.Fragment>
          )) 
          );
        }
          else{
            return (
              selectedItem && 
              selectionContent
                .map((select, index) => (
                  select.path === selectedItem.parent  && (
                    <React.Fragment key={index}>
                    {select.cardSetting
                    .map((setting, settingIndex) => (
                      setting.ids === selectedItem.id &&
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
                  )
                ))
            );
          }
      }
      if(currentPath.name === "Business"){
        if(!selectedItem ){
          return (
          selectionContent.map((select, index) => (
            <React.Fragment key={index}>
              {select.path === "Business" &&
              select.cardSetting.map((setting, settingIndex) => (
                <div className="flex flex-wrap mt-5 " key={settingIndex}>
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
              ))}
            </React.Fragment>
          )) 
          );
        }
        else{
          return (
            selectedItem && 
            selectionContent
              .map((select, index) => (
                select.path === selectedItem.parent  && (
                  <React.Fragment key={index}>
                  {select.cardSetting
                  .map((setting, settingIndex) => (
                    setting.ids === selectedItem.id &&
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
                )
              ))
          );
        }
      }
      console.log(selectedItem)
      return null;
           
  }
  //#endregion
  return (
    <div className="flex ">
      {renderTreeView()}
      <div className="flex flex-wrap">
      <div className="flex flex-wrap ml-10">
        {handleCards()}
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
