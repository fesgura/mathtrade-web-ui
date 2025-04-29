import useNotifications from "./useNotifications";
import Notification from "./notification";
import { LoadingBox } from "@/components/loading";
import I18N from "@/i18n";

const List = ({ type, noMembership }) => {
  const { list, loading, showLoadMore, loadMore } = useNotifications(type);

  return (
    <div className="relative md:min-h-72">
      {list.map((data, k) => {
        return (
          <Notification
            key={`${data.id}-${k}`}
            data={data}
            type={type}
            noMembership={noMembership}
            // toggleMobile={toggleMobile}
          />
        );
      })}

      {showLoadMore ? (
        <button
          className="block w-full text-sm text-primary text font-bold p-3 hover:text-white hover:bg-primary transition-colors"
          onClick={loadMore}
        >
          <I18N id="notifications.LoadMore" />
        </button>
      ) : null}

      {!loading && !list.length ? (
        <div className="text-center text-balance p-2 text-gray-400 italic">
          <I18N id="notifications.WithoutNotifications" />
        </div>
      ) : null}
      <LoadingBox loading={loading} min />
    </div>
  );
};

export default List;
