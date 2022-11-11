import { useDrop } from "react-dnd";
import classNames from "classnames";

const Dropper = ({ className, children, accept, data = {} }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept,
      drop: () => data,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [accept, data]
  );
  return (
    <div
      className={classNames(
        "dropper",
        {
          available: canDrop,
          active: canDrop && isOver,
        },
        className
      )}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default Dropper;
