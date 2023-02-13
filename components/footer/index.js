import classNames from "classnames";

const Footer = ({
  absolute,
  className,
  sidebarOpen,
  sidebarAnimationEnabled,
}) => {
  return (
    <footer
      className={classNames(
        "main-footer",
        {
          absolute,
          "sidebar-open": sidebarOpen,
          "sidebar-animation-enabled": sidebarAnimationEnabled,
        },
        className
      )}
    >
      <div className="main-container">
        <div className="main-footer_container">
          Copyright {new Date().getFullYear()} - Math Trade Argentina
        </div>
      </div>
    </footer>
  );
};
export default Footer;
