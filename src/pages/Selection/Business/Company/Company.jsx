import React, { useEffect, useState } from "react";
import Carousel from "../../../../components/Carousel/Carousel";
import ContactForm from "../../../../components/ContactUs/ContactUs";
import { personnelContent } from "../../../../content/personnelContent";
import { useLocation } from "react-router-dom";
import Images from "../../../../components/Image/Images";
import GoogleMapEmbed from "../../../../components/GoogleMapEmbed/GoogleMapEmbed";
import { useCompanyView } from "../../../../helper/database/useBusinessData";
import Maintenance from "../../../../components/Maintenance/Maintenance";
import MaintenancePage from "../../../../components/Maintenance/Maintenance";
import Spinner from "../../../../components/Spinner/Spinner";

const Company = (props) => {
  const { CompanyData } = props;
  const location = useLocation();
  const [getCompanyInfo, setCompanyInfo] = useState([]);
  const [getCompanyImages, setCompanyImages] = useState([]);
  const [getCompanyProduct, setCompanyProduct] = useState([]);
  const { viewData, vieloading, fecthCompanyView } = useCompanyView();

  useEffect(() => {
    const decodelocation = decodeURIComponent(location.pathname);
    const cardname = CompanyData
      ? CompanyData?.find((item) => `/${item.title}` === decodelocation)
          ?.title || ""
      : "";
    const getCompanyInfo = CompanyData
      ? CompanyData.find((item) => item.title === cardname)
      : [];
    const getImage = viewData.images ? viewData.images.map((item) => item) : [];
    const getProduct = viewData.products
      ? viewData.products.map((item) => item)
      : [];

    setCompanyImages(getImage);
    setCompanyProduct(getProduct);
    setCompanyInfo(getCompanyInfo);
    fecthCompanyView(cardname);
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
  return (
    <div className="flex flex-col mx-auto max-w-srceen-md items-center p-5">
      <div className="text-2xl p-3 font-bold">"{viewData.companyName}"</div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row   ">
          <p className="text-wrap text-sm    p-2">{viewData.address}</p>
        </div>
        <div className="p-3 flex  justify-center">
          <Images
            src={viewData.imgLOGO}
            //style={{ width: "100px" }}
          />
        </div>
      </div>
      <section id="about">
        <div className="text-2xl p-3 mt-10 font-bold text-center">
          Information
        </div>
        <div className="flex flex-col ">
          <div className="p-3 gap-3 flex  justify-center ">
            {getCompanyImages &&
              getCompanyImages.map((item, index) => (
                <div className="" key={index}>
                  <Images
                    src={item.companyImage}
                    style={{ width: "300px", height: "300px" }}
                    className="transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-wrap-reverse  justify-center">
            <p className="text-wrap text-sm max-w-prose indent-8 p-2 ">
              {viewData.description}
            </p>
          </div>
        </div>
      </section>
      <section id="products">
        <div className="text-2xl font-bold mt-5 p-2 text-center">Products</div>
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
      <section id="personnel">
        <div className="text-2xl font-bold mt-5 p-2">Personnel</div>
        <div className=" max-w-screen-md p-3">
          <Carousel items={personnelContent} />
        </div>
      </section>
      <section id="address">
        <div className="font-mono font-bold text-3xl text-center mt-5 p-5">
          Location
        </div>
        <div className="flex justify-center">
          <GoogleMapEmbed src={viewData.locationURL} />
        </div>
      </section>
      <section id="contact" className="max-w-screen-md">
        <ContactForm />
      </section>
    </div>
  );
};

export default Company;
