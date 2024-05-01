import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";

const MeetingAdressCard = ({ meetingAddress }) => {
  const { name, address, location, url } = meetingAddress;
  return (
    <div className="py-1">
      <a
        href={url}
        rel="noreferrer nofollow"
        target="_blank"
        className="flex gap-1 text-sky-800 md:w-fit text-left md:mx-auto border border-sky-600 p-1 rounded-md hover:opacity-80 transition-opacity"
      >
        <div className="text-lg">
          <Icon type="map" />
        </div>
        <div className="text-xs pr-1">
          <h5 className="font-bold">{name}</h5>
          <p className="">{address}</p>
          <p className="">{location}</p>
        </div>
      </a>
    </div>
  );
};

const Milestone = ({ milestone }) => {
  const { title, dateObj, hour, color, meetingAddress, dayWeek } = milestone;
  const { day, month } = dateObj;

  return (
    <div className="md:px-5 md:w-1/5 md:-mt-3 md:mb-0 md:ml-0 -ml-3 mb-6 md:text-center md:block flex">
      <div
        className={clsx("w-5 h-5 rounded-full md:mx-auto", {
          "bg-sky-600": color === 1,
          "bg-lime-600": color === 2,
          "bg-teal-600": color === 3,
          "bg-orange-600": color === 4,
        })}
      />
      <div
        className={clsx(
          "md:w-1 md:h-7 w-6 h-1 md:mx-auto md:-mt-1 mt-2  -ml-1 rounded-full",
          {
            "bg-sky-600": color === 1,
            "bg-lime-600": color === 2,
            "bg-teal-600": color === 3,
            "bg-orange-600": color === 4,
          }
        )}
      />
      <div className="md:pl-0 pl-2 md:pt-1 pt-0">
        <div
          className={clsx(
            "font-bold md:mb-2 md:block flex items-center gap-1 leading-none",
            {
              "text-sky-700": color === 1,
              "text-lime-700": color === 2,
              "text-teal-700": color === 3,
              "text-orange-700": color === 4,
            }
          )}
        >
          <div className="text-xs">
            <I18N id={`dayWeek.${dayWeek}`} />
          </div>
          <div>{`${day}/${month}`}</div>
          <div className="text-xs">{`${hour}hs`}</div>
        </div>
        <div className="text-sm text-balance">
          <I18N id={title} />
          {meetingAddress ? (
            <MeetingAdressCard meetingAddress={meetingAddress} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Milestone;
