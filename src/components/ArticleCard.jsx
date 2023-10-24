import { timeDiffToCurrentDate } from "../utils/utils";
import { Link } from "react-router-dom";

const ArticleCard = ({article}) => {
    return (
        <Link  to={`/articles/${article.article_id}`}>
        <article className="flex flex-col my-2 lg:m-16">
          <div className="flex justify-center items-center rounded border-solid border-2  border-[#E0E0E0] min-height: [50vh]  lg:m-8">
            <section className="flex flex-col flex-none">
              <p className="text-14">Votes {article.votes}</p>
            </section>
            <section className="flex-auto flex-col">
              <div className="flex items-center flex-row justify-evenly mb-4">
                <p className="m-2 text-14">Posted by {article.author}</p>
                <h3 className="text-20 font-bold">{article.topic}</h3>
                <p className="m-2 text-14">
                  Created{" "}
                  {`${timeDiffToCurrentDate(article.created_at)} ago`}
                </p>
              </div>
              <div className="flex items-center flex-col">
                <h2 className="text-18 font-semibold mb-4">
                  {article.title}
                </h2>
              </div>
              <div className="flex max-w-xs max-h-xs">
                <img
                  className="self-center"
                  src={article.article_img_url}
                  alt={article.title}
                />
              </div>
              <div className="mt-4">
                <p className="text-14">Comments {article.comment_count}</p>
              </div>
            </section>
          </div>
        </article>
      </Link>
    )
}

export default ArticleCard