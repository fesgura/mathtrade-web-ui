import UserBox from "@/components/userBox";
import useComment from "./useComment";
import Icon from "@/components/icon";
import clsx from "clsx";
import I18N from "@/i18n";

const Comment = ({ comment, myUserId, isLast }) => {
  const {
    content,
    date,
    // downvotes,
    //upvotes,
    user,
    isMyUser,
    deleteComment,
    loading,
    // setVote,
  } = useComment({
    comment,
    myUserId,
  });

  return (
    <div className="pb-5">
      <div
        className={clsx("flex", {
          "gap-2": !isMyUser,
        })}
      >
        <div className="md:min-w-[80px]">
          {!isMyUser && <UserBox userForce={user} avatarWidth={32} toCenter />}
        </div>
        <div
          className={clsx("grow", {
            "md:pr-8": !isMyUser,
            "md:pl-8": isMyUser,
          })}
        >
          <div
            className={clsx("relative rounded-lg border", {
              "bg-sky-200 border-sky-400": !isMyUser,
              "bg-teal-200 border-teal-400": isMyUser,
              "opacity-50": loading,
            })}
          >
            <div
              className={clsx("absolute w-0 h-0 border-8 border-transparent", {
                "border-r-sky-400 -left-4 top-3": !isMyUser,
                "border-l-teal-400 -right-4 bottom-3": isMyUser,
              })}
            />

            <div className="px-4 py-3 text-sm break-all">{content} </div>
            <div className="border-t border-primary/20 px-4 py-2">
              <div className="flex  items-center justify-between gap-3 text-xs">
                <div className="jk">{date}</div>
                <div className="flex gap-3 items-center">
                  {/* <button
                    className="hover:opacity-50 transition-opacity"
                    onClick={() => {
                      setVote("upvote");
                    }}
                    disabled={loading}
                  >
                    <Icon type="thumbUp" className="text-gray-600" />{" "}
                    <span className="text-gray-400 font-bold">{upvotes}</span>
                  </button>
                  <button
                    className="hover:opacity-50 transition-opacity"
                    onClick={() => {
                      setVote("downvote");
                    }}
                    disabled={loading}
                  >
                    <Icon type="thumbDown" className="text-gray-600" />{" "}
                    <span className="text-gray-400 font-bold">{downvotes}</span>
                  </button> */}
                  {isMyUser && isLast && (
                    <button
                      className="text-danger font-bold border border-danger/30 px-2 rounded-full hover:bg-danger hover:text-white transition-colors"
                      disabled={loading}
                      onClick={deleteComment}
                    >
                      <I18N id="btn.Delete" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
