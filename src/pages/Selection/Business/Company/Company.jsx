import React, { useEffect, useState } from "react";
import Carousel from "../../../../components/Carousel/Carousel";
import ContactForm from "../../../../components/ContactUs/ContactUs";
import { personnelContent } from "../../../../content/personnelContent";
import { Link, useLocation } from "react-router-dom";
import Images from "../../../../components/Image/Images";
import GoogleMapEmbed from "../../../../components/GoogleMapEmbed/GoogleMapEmbed";
import { useCompanyView } from "../../../../helper/database/useBusinessData";
import Maintenance from "../../../../components/Maintenance/Maintenance";
import Spinner from "../../../../components/Spinner/Spinner";
import Table from "../../../../components/Table/Table";

const Company = (props) => {
  const { CompanyData } = props;
  const { state } = useLocation();
  const { title } = state || { title: null };
  const [getCompanyInfo, setCompanyInfo] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [getCompanyImages, setCompanyImages] = useState([]);
  const [getCompanyProduct, setCompanyProduct] = useState([]);
  const [getCompanySocial, setCompanySocial] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const { viewData, vieloading } = useCompanyView(companyName);

  useEffect(() => {
    const cardname = CompanyData
      ? CompanyData?.find((item) => item.title === title)?.title || ""
      : "";
    const getCompanyInfo = CompanyData
      ? CompanyData.find((item) => item.title === cardname)
      : [];
    const getImage = viewData.images ? viewData.images.map((item) => item) : [];
    const getProduct = viewData.products
      ? viewData.products.map((item) => item)
      : [];
    const getSocial = viewData.socials
      ? viewData.socials.map((item) => item)
      : [];
    const getPerson = viewData.personnel
      ? viewData.personnel.map((item) => item)
      : [];

    setPersonnel(getPerson);
    setCompanySocial(getSocial);
    setCompanyImages(getImage);
    setCompanyProduct(getProduct);
    setCompanyInfo(getCompanyInfo);
    setCompanyName(cardname);
  }, [CompanyData, viewData]);

  if (!viewData.companyName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Maintenance />
      </div>
    );
  }
  if (vieloading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  const website = getCompanySocial
    ? getCompanySocial.map((item) => item.website)
    : [];
  const capitalizeWords = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join back into a string
  };

  const viewkeys = Object.keys(viewData);
  const tblheader = ["Information", "Details"];
  const tblrow = ["Information", "Details"];
  const tbldata = [
    {
      Information: capitalizeWords(viewkeys[0]) + ":",
      Details: viewData.companyName,
    },
    {
      Information: capitalizeWords(viewkeys[3]),
      Details: viewData.contact,
    },
    {
      Information: capitalizeWords(viewkeys[5]),
      Details: viewData.address,
    },
    {
      Information: "Director:",
      Details: viewData.person,
    },
    {
      Information: capitalizeWords(viewkeys[7]),
      Details: viewData.establish,
    },
    {
      Information: capitalizeWords(viewkeys[8]),
      Details: viewData.employee,
    },
    {
      Information: "URL:",
      Details: website.length ? (
        <a
          href={website}
          target={"_black"}
          className="text-blue-700 hover:underline"
        >
          {website}
        </a>
      ) : (
        "N/A"
      ),
    },
  ];
  console.log(viewData);
  return (
    <div className="flex flex-col mx-auto max-w-srceen-md items-center p-5">
      <div className="text-2xl p-3 font-bold">"{viewData.companyName}"</div>
      <div className="flex flex-col">
        <div className="p-3 flex  justify-center">
          <Images
            src={viewData.imgLOGO}
            //style={{ width: "100px" }}
          />
        </div>
        <div className="flex flex-wrap-reverse  justify-center">
          <p className="text-wrap text-sm max-w-prose indent-8 p-2 ">
            {viewData.description}
          </p>
        </div>
      </div>
      <section id="about">
        <div className="flex flex-wrap max-w-screen-md">
          <div className="p-3 gap-3 flex  justify-center  ">
            {getCompanyImages &&
              getCompanyImages.map((item, index) => (
                <div className="" key={index}>
                  <Images
                    src={item.companyImage}
                    style={{ width: "500px", height: "400px" }}
                    className="transform transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: item.content }}
                    style={{
                      padding: "10px",
                      marginTop: "10px",
                    }}
                    className="min-w-full text-center"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
      <section id="products">
        <div className="text-2xl font-bold mt-5 p-2 text-center">
          Sample Products
        </div>
        <div className="flex max-w-screen-md ">
          <div className="flex flex-wrap justify-center">
            {getCompanyProduct &&
              getCompanyProduct.map((item, index) => (
                <div key={index}>
                  <figure className=" p-4 transform transition-transform duration-500 hover:scale-105">
                    <Images
                      className="rounded-lg border-2"
                      src={item.productImage}
                      alt="Hair salon interior"
                      style={{ width: "300px", height: "300px" }}
                    />
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      {item.productName}
                    </figcaption>
                  </figure>
                </div>
              ))}
          </div>
        </div>
      </section>
      {personnel ? (
        <section id="personnel">
          <div className="text-2xl font-bold mt-5 p-2">Personnel</div>
          <div className=" max-w-screen-md p-3">
            <Carousel items={personnel} />
          </div>
        </section>
      ) : (
        ""
      )}
      <section id="address">
        <div className="font-mono font-bold text-3xl text-center mt-5 p-5">
          Location
        </div>
        <div className="flex justify-center">
          <GoogleMapEmbed src={viewData.locationURL} />
        </div>
      </section>

      <section id="CompanyInfo">
        <div className="font-mono font-bold text-3xl text-center mt-5 p-5">
          Company Info
        </div>
        <div className="p-2 mt-5">
          <Table tblheader={tblheader} tblrow={tblrow} tbldata={tbldata} />
        </div>
        <div className="">
          {getCompanySocial
            ? getCompanySocial.map((item) => (
                <div className="">
                  <div className=""></div>
                </div>
              ))
            : ""}
        </div>
      </section>

      <section id="contact" className="max-w-screen-md">
        <ContactForm email={viewData.email} company={viewData.companyName} />
      </section>
    </div>
  );
};

export default Company;
