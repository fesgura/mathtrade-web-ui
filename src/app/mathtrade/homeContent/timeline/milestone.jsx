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

const Milestone = ({ milestone, position }) => {
  const { title, dateObj, hour, color, meetingAddress, dayWeek } = milestone;
  const { day, month } = dateObj;

  return (
    <div className="milestone" style={{ left: `${position}%` }}>
      <div
        className={clsx("w-5 h-5 rounded-full mx-auto", {
          "bg-sky-600": color === 1,
          "bg-lime-600": color === 2,
          "bg-teal-600": color === 3,
          "bg-orange-600": color === 4,
        })}
      />
      <div
        className={clsx("w-1 h-7 mx-auto -mt-1  rounded-full", {
          "bg-sky-600": color === 1,
          "bg-lime-600": color === 2,
          "bg-teal-600": color === 3,
          "bg-orange-600": color === 4,
        })}
      />
      <div className="pl-0 pt-1">
        <div
          className={clsx("font-bold mb-2 block leading-none", {
            "text-sky-700": color === 1,
            "text-lime-700": color === 2,
            "text-teal-700": color === 3,
            "text-orange-700": color === 4,
          })}
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
