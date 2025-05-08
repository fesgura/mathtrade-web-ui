import Container from "@/components/container";

const StickyHeader = ({ children }) => {
  return <header className="sticky top-11 z-50 shadow-md">{children}</header>;
};

export default StickyHeader;
