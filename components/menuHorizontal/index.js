import classNames from "classnames";

const MenuHorizontal = ({ list = [], current = 0 }) => {
  return (
    <div className="menu-horizontal">
      {list.map((item) => {
        const { hash, title } = item;
        return (
          <a
            key={hash}
            href={`#${hash}`}
            className={classNames("menu-horizontal-item", {
              current: hash === current,
            })}
          >
            {title}
          </a>
        );
      })}
    </div>
  );
};

export default MenuHorizontal;
