import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import cardContent from "../../../content/cardContent";
import List from "../../../components/List/List";
import Images from "../../../components/Image/Images";
import SearchBar from "../../../components/Searchbar/Searchbar";
import Textline from "../../../components/Textline/Textline";
import { replySchema } from "./validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Inbox = () => {
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleView = (item) => {
    setDisplayMessage(item);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(replySchema),
    defaultValues: { reply: "" },
  });

  const onSubmit = (data) => {
    console.log(data);
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

            <div className="min-w-[40vw] h-full border  mt-3">
              {displayMessage.length === 0 ? (
                <div className="  min-w-80  h-full flex items-center justify-center">
                  <p className="text-lg italic font-bold">NO Message!!</p>
                </div>
              ) : (
                <div className=" flex flex-col p-2 max-h-[70vh]  ">
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-6 px-20 w-full">
                      <Textline
                        textarea={true}
                        name="reply"
                        className="bg-gray-50 w-full h-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="Type your reply here..."
                        {...register("reply")}
                      />
                      {errors.reply && (
                        <p className="text-red-500 text-sm">
                          {errors.reply.message}
                        </p>
                      )}
                      <div className="w-full flex items-end justify-end flex-col mt-4">
                        <Button
                          text="Send Reply"
                          className="text-md bg-[#013A63] transform px-4 py-3 rounded-md fira-sans-condensed-regular text-white hover:bg-[#013A63]/95"
                          type="submit"
                        />
                      </div>
                    </div>
                  </form>
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
