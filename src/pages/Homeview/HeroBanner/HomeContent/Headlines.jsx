import Imagecarousel from "../../../../components/Carousel/Imagecarousel";
import NewsFeed from "../../../../components/NewsFeed/NewsFeed";

export default function Headlines({ getArticles, getImgCarousel }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl p-2 fira-sans-bold text-[#013A63]">
        Top Headlines
      </h1>
      {getArticles.length > 0 ? (
        <NewsFeed articles={getArticles} />
      ) : (
        <div className="flex">
          <Imagecarousel images={getImgCarousel} />
        </div>
      )}
    </div>
  );
}
