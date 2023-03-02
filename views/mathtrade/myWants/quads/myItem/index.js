import Quad from "./quad";

const MyItemView = ({
  data,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
}) => {
  return (
    <div className="quad-want_myItemGroup">
      <div className="quad-want_myItemGroup-item">
        <div className="quad-want_myItemGroup-item-title quad-want_text">
          Por este juego:
        </div>
        <Quad isGroup={false} data={data.item} />
      </div>
      <div className="quad-want_myItemGroup-group">
        <div className="quad-want_myItemGroup-group-title quad-want_text">
          Recibo:
        </div>
        <div className="quad-want_myItemGroup-group-container">
          {data.wantGroups.map((wg) => {
            return (
              <Quad
                data={wg}
                key={wg.id}
                setModalWantOpen={setModalWantOpen}
                setCurrentWantGroup={setCurrentWantGroup}
                setCurrentType={setCurrentType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MyItemView;
