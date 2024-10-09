import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import cardContent from "../../../content/cardContent";
import List from "../../../components/List/List";
import Images from "../../../components/Image/Images";
import SearchBar from "../../../components/Searchbar/Searchbar";

const Inbox = () => {
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleView = (item) => {
    setDisplayMessage(item);
  };
  return (
    <div className="p-5">
      <div className="  min-w-80 min-h-80">
        <div className="flex justify-between py-2">
          <div className="flex items-center">
            <Button
              onClick={handleBack}
              icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
              className={
                "px-2 text-lg text-gray-800 transform  transition-transform duration-500 hover:translate-x-3"
              }
            />
            <h1 className="text-2xl">Notification Message</h1>
          </div>
          <div className="flex">
            <SearchBar hidden={true} />
          </div>
        </div>
        <div className="flex border min-w-full min-h-[80vh] px-2">
          <div className="flex flex-col border-r w-[30vw] min-h-[70vh] p-2 overflow-hidden hover:overflow-y-scroll">
            <h2 className="text-lg p-2 border ">Message:</h2>
            {cardContent.map((item) => (
              <>
                <List
                  title={item.title}
                  desc={item.desc}
                  onLink={() => handleView(item)}
                  className={"p-5 "}
                  user={item.user}
                  datetime={Date()}
                />
              </>
            ))}
          </div>
          <div className="p-2 border-l min-w-80 min-h-80">
            <h2 className="text-lg p-2 border">View Message:</h2>

            <div className="min-w-[40vw] min-h-80 border  mt-3">
              {displayMessage.length === 0 ? (
                <div className="  min-w-80  min-h-80 flex items-center justify-center">
                  <p className="text-lg italic font-bold">NO Message!!</p>
                </div>
              ) : (
                <div className=" flex flex-col p-2 max-h-[70vh]  overflow-hidden hover:overflow-y-scroll">
                  <div className="flex border p-2 w-full">
                    title:{" "}
                    <h2 className="text-md font-bold ">
                      {displayMessage.title}
                    </h2>
                  </div>
                  <div className="flex text-wrap p-2">
                    <p className="text-wrap text-sx indent-8">
                      {displayMessage.desc}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Images src={displayMessage.images} className={""} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
