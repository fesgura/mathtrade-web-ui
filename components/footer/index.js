import classNames from "classnames";

const Footer = ({ absolute, className }) => {
  return (
    <footer className={classNames("main-footer", { absolute }, className)}>
      <div className="main-container">
        <div className="main-footer_container">
          Copyright {new Date().getFullYear()} - MathTrade Argentina
        </div>
      </div>
    </footer>
  );
};
export default Footer;
