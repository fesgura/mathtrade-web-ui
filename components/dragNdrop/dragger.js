import classNames from "classnames";
import { useId } from "react";
import { UncontrolledTooltip } from "reactstrap";
import { useDrag } from "react-dnd";

const points = [];
for (let i = 0; i < 16; i++) {
  points.push(i);
}
const twoPointsReg = new RegExp(":", "g");

const Dragger = ({
  className,
  classNameHandler,
  styleHandler,
  color = "white",
  children,
  title = "Arrastra y suelta",
  type = "",
  data = {},
  onDrop,
}) => {
  const id = useId("q").replace(twoPointsReg, "");
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type,
      item: data,
      end: (dataDragger, monitor) => {
        const dataDropper = monitor.getDropResult();
        if (onDrop && dataDragger && dataDropper) {
          onDrop(dataDragger, dataDropper);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        //handlerId: monitor.getHandlerId(),
      }),
    }),
    [type, data, onDrop]
  );

  return (
    <div
      className={classNames(
        "dragger",
        {
          dragging: isDragging,
        },
        className
      )}
      ref={preview}
    >
      <div
        className={classNames(
          "dragger-handler",
          `p-${color}`,
          {
            dragging: isDragging,
          },
          classNameHandler
        )}
        style={styleHandler}
        ref={drag}
        id={`tt-dragger-q-${id}`}
      >
        {points.map((p) => {
          return <span key={p}></span>;
        })}
      </div>
      <UncontrolledTooltip target={`tt-dragger-q-${id}`}>
        {title}
      </UncontrolledTooltip>
      {children}
    </div>
  );
};

export default Dragger;
