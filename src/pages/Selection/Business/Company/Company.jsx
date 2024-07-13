import React from "react";
import { ImageLink } from "../../../../components/Image/ImageLink";
import Card from "../../../../components/Card/Card";
import Carousel from "../../../../components/Carousel/Carousel";
import CarouselContent from "../../../../content/CarouselContent";
import ContactForm from "../../../../components/ContactUs/ContactUs";
import { personnelContent } from "../../../../content/personnelContent";

const Company = () => {
  return (
    <div className="flex flex-col mx-auto max-w-srceen-md items-center">
      <div className="text-2xl p-3">SFA SEMICON PHILIPPINES CORPORATION</div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row  container ">
          <div className="p-3">
            <ImageLink
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
              }
              style={{ width: "400px" }}
            />
          </div>
          <p className="text-wrap text-sm max-w-96   p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-wrap text-sm max-w-screen-md  indent-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
          </p>
        </div>
      </div>

      <section id="about">
        <div className="text-2xl p-3 mt-10">About</div>
        <div className="flex flex-col ">
          <div className="flex flex-wrap-reverse ">
            <p className="text-wrap text-sm max-w-prose indent-8 p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
              sociosqu ad Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus
              diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
              sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
              porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class
              aptent taciti sociosqu ad Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
              ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
              imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus
              sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget
              nulla. Class aptent taciti sociosqu ad
            </p>
            <Card
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
              }
              title={"Sample Title About"}
              desc={`Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.`}
            />
          </div>
          <div className="flex flex-wrap-reverse  mt-2">
            <p className="text-wrap text-sm max-w-prose indent-8 p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
              sociosqu ad
            </p>
            <Card
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
              }
              title={"Sample Title About"}
              desc={`Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.`}
            />
          </div>
        </div>
      </section>
      <section id="products">
        <div className="text-2xl font-bold mt-5 p-2">Products</div>
        <div className="flex flex-wrap">
          <div className="flex">
            <figure className="max-w-md p-4">
              <ImageLink
                className="rounded-lg"
                src={""}
                alt="Hair salon interior"
              />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                Sample Header
              </figcaption>
            </figure>
          </div>
          <div className="flex">
            <figure className="max-w-md p-4">
              <ImageLink
                className="rounded-lg"
                src={""}
                alt="Hair salon interior"
              />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                Sample Header
              </figcaption>
            </figure>
          </div>
          <div className="flex">
            <figure className="max-w-md p-4">
              <ImageLink
                className="rounded-lg"
                src={""}
                alt="Hair salon interior"
              />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                Sample Header
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section id="personnel">
        <div className="text-2xl font-bold mt-5 p-2">Personnel</div>
        <div className=" max-w-screen-md p-3">
          <Carousel items={personnelContent} />
        </div>
      </section>
      <section id="contact">
        <ContactForm />
      </section>
    </div>
  );
};

export default Company;
