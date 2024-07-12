import React from "react";
import { ImageLink } from "../../../../components/Image/ImageLink";

const Company = () => {
  return (
    <div className="flex flex-col ">
      <div className="text-2xl p-3">Company</div>
      <div className="flex flex-col md:flex-row  container ">
        <div className="p-3">
          <ImageLink
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzgfyifTWbOJ3llcm1WWVIw7Q9kvtzzvhBw&s"
            }
          />
        </div>
        <p className="text-wrap  max-w-96 p-2">
          Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
        </p>
      </div>
    </div>
  );
};

export default Company;
