import Card from "../../../../components/Card/Card";
import restAPI from "../../../../helper/database/restAPI";

export default function Blogs({ getBlog }) {
  const imagelink = restAPI();

  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl p-2 fira-sans-bold text-[#013A63]">Top Blogs</h1>
      {getBlog
        ? getBlog.map((item, index) => (
            <div
              key={index}
              className="w-full p-1 transform transition-transform duration-500 hover:scale-95"
            >
              <Card
                src={imagelink.image + item.imageURL}
                title={item.title}
                desc={item.description}
                link={item.title}
                hidden={true}
              />
            </div>
          ))
        : ""}
    </div>
  );
}
