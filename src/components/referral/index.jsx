import Icon from "../icon";
import I18N from "@/i18n";
import { useStore } from "@/store";
import { useMemo } from "react";
import { meetingAddress } from "@/config/meetingAddress";
import { formatDateString } from "@/utils/dateUtils";

const selectLocationById = (locations, id) => {
  const item = locations ? locations.filter((loc) => loc.id === id) : [];
  return item[0] || null;
};
//
const Referral = () => {
  const { membership, mathtrade } = useStore((state) => state.data);
  const locations = useStore((state) => state.locations);

  const meetingDay = useMemo(() => {
    return formatDateString(mathtrade?.meeting_date || null);
  }, [mathtrade]);

  const currentLocation = useMemo(() => {
    if (locations && locations.length && membership?.location) {
      return selectLocationById(locations, membership?.location);
    }
    return null;
  }, [membership, locations]);

  return currentLocation && currentLocation.referral ? (
    <div className="text-center mb-4">
      {currentLocation.mandatory_attendance ? (
        <p className="mb-4 description">
          <I18N
            id="myData.help.AMBA"
            values={[meetingDay.day, meetingDay.hour]}
          />
          <br />
          <a
            href={meetingAddress.url}
            target="_blank"
            rel="noopener noreferrer"
            className="in-body"
          >
            {meetingAddress.name}
            <br />
            {`${meetingAddress.address}, ${meetingAddress.location}`}
            <Icon type="external-link" className="ml-1" />
          </a>
          <br />
          <br />
          <I18N
            id="myData.help.AMBA2"
            values={[
              `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
            ]}
          />
        </p>
      ) : (
        <p className="mb-4">
          <I18N id="myData.help.noAMBA1" values={[currentLocation?.name]} />
          {currentLocation?.referral &&
          currentLocation?.referral?.first_name ? (
            <I18N
              id="myData.help.noAMBA2"
              values={[
                `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
                currentLocation?.name,
              ]}
            />
          ) : null}
        </p>
      )}

      {currentLocation?.referral && currentLocation?.referral?.first_name ? (
        <div
          className="bg-white  shadow-md rounded-lg  mb-4 p-4 max-w-xl mx-auto"
          //style={{ maxWidth: 500, margin: "0 auto 30px" }}
        >
          <div className="description">
            <h3 className="font-bold text-xl mb-3">{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</h3>

            <div className="referal-items">
              {currentLocation?.referral?.telegram ? (
                <div className="referal-item mb-2">
                  <Icon type="telegram" className="mr-2" />
                  <b>Telegram:</b>{" "}
                  <a
                    href={`https://t.me/${currentLocation?.referral?.telegram}`}
                    target="_blank"
                  >
                    {currentLocation?.referral?.telegram}
                  </a>
                </div>
              ) : null}
              {currentLocation?.referral?.whatsapp ? (
                <div className="referal-item mb-2">
                  <Icon type="whatsapp" className="mr-2" />
                  <b>Whatsapp:</b>{" "}
                  <a
                    href={`https://wa.me/${currentLocation?.referral?.whatsapp}`}
                    target="_blank"
                  >
                    {currentLocation?.referral?.whatsapp}
                  </a>
                </div>
              ) : null}
              {currentLocation?.referral?.email ? (
                <div className="referal-item">
                  <Icon type="envelope" className="mr-2" />
                  <b>Email:</b>{" "}
                  <a
                    href={"mailto:" + currentLocation?.referral?.email}
                    target="_blank"
                  >
                    {currentLocation?.referral?.email}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};
export default Referral;
