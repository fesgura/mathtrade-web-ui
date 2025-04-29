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
        className="flex gap-2 bg-primary/10 border border-primary text-sky-900 p-2 rounded-lg w-fit"
      >
        <div className="text-2xl">
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
  const { title, dateObj, hour, color, meetingAddress } = milestone;
  const { day, month } = dateObj;

  return (
    <div className="py-3 border-b border-gray-300 border-dashed">
      <div className="flex gap-4 items-start">
        <div className="pb-2">
          <div className="text-center rounded-md shadow-[0_1px_6px_rgba(0,0,0,0.4)] bg-secondary/10">
            <div
              className={clsx(
                "text-white font-bold py-2 px-2 rounded-tl-md rounded-tr-md",
                {
                  "bg-sky-500": color === 1,
                  "bg-want": color === 2,
                  "bg-teal-600": color === 3,
                  "bg-orange-600": color === 4,
                }
              )}
            >{`${day}/${month}`}</div>
            <div className="text-xs p-1 font-bold">{`${hour}`}</div>
          </div>
        </div>

        <div className="text-sm">
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
