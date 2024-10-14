import React from "react";
import Images from "../../../../components/Image/Images";
import Table from "../../../../components/Table/Table";
import Button from "../../../../components/Button/Button";
import { MdBlock } from "react-icons/md";


const ViewAccount = (props) => {
  const { userData, blogsample } = props;

  const handleView = (data) => {};

  const handleDelete = (data) => {};

  const renderList = (data) => {
    return (
      <Table
        tblheader={["Title", "Like", "Comments"]}
        tbldata={data}
        tblrow={["title", "likes", "comments"]}
        onView={handleView}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <div className="p-2 flex flex-col  gap-3 max-w-[40vw]">
      <div className="flex gap-3">
        <Images
          src={userData.image}
          style={{ width: "30vw", height: "30vh" }}
          className="rounded-full p-2 border-4 "
        />
        <div className="flex flex-col justify-center">
          <div className="flex justify-between">
          <h1 className="text-4xl font-sans font-bold">{userData.name}</h1>
          <Button icon={<MdBlock />} className={"text-4xl ransform  transition-transform duration-500 hover:scale-105 hover:text-red-600 "} />
          </div>
          <div className=" p-2">
            <p className="text-2xl font-sans ">Bios:</p>
            <p className="text-sm indent-8">{userData.description}</p>
          </div>
          <div className="flex  flex-col">
            <p className="text-2xl font-sans">Contact:</p>
            <p className="text-lg indent-8">09123456789</p>
          </div>
          <div className="flex  flex-col">
            <p className="text-2xl font-sans">Email:</p>
            <p className="text-lg indent-8"> sample@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex  px-12">
      <Button icon={"Reset Password"} className={"text-2xl border rounded-lg bg-blue-600 p-2 transform  transition-transform duration-500 hover:scale-105 hover:text-white "} />
      </div>
      <div className="border-t-4 p-2">
        
      <h1 className="text-2xl font-sans font-bold p-2">BLOG:</h1>
      <div className="w-full">{renderList(blogsample)}</div>
      </div>
    </div>
  );
};

export default ViewAccount;
