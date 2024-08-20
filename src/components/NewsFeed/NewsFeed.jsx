import React from "react";
import Images from "../Image/Images";

const NewsFeed = ({ articles }) => {
  return (
    <div className="news-feed p-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className="article-card flex flex-col md:flex-row mb-6 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          {article.urlToImage ? (
            <Images
              src={article.urlToImage}
              alt={article.title}
              className="article-image w-full md:w-48 h-48 md:h-auto object-cover"
            />
          ) : (
            <div className="image-placeholder w-full md:w-48 h-48 md:h-auto bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          <div className="p-4 flex flex-col justify-between">
            <div>
              <h2 className="article-title text-xl font-bold mb-2">
                {article.title || "No Title Available"}
              </h2>
              <p className="article-author text-sm text-gray-500">
                {article.author || "Unknown Author"}
              </p>
              <p className="article-description text-gray-700 mt-2">
                {article.description || "No Description Available"}
              </p>
            </div>
            <div className="mt-4">
              <p className="article-source text-sm text-gray-500">
                Source: {article.source.name || "Unknown Source"}
              </p>
              <p className="article-publishedAt text-sm text-gray-500 mt-2">
                Published at:{" "}
                {new Date(article.publishedAt).toLocaleString() ||
                  "Unknown Date"}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-link inline-block text-blue-500 hover:text-blue-700 font-semibold mt-4"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
