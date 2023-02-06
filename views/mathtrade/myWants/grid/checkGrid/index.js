import CheckElement from "./CheckElement";

const CheckGrid = ({ myItemElement }) => {
  return (
    <>
      <CheckElement />
      {myItemElement.type === "group" ? (
        <div className="mywants-grid_check-group-element">
          {myItemElement.items.map((myElement) => {
            return <CheckElement key={`check-element-${myElement.id}`} />;
          })}
        </div>
      ) : (
        <CheckElement />
      )}
    </>
  );
};
export default CheckGrid;
