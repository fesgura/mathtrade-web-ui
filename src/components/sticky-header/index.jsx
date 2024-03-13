import Container from "@/components/container";

const StickyHeader = ({ children, size }) => {
  return (
    <header className="bg-body sticky top-11 z-50 mb-3">
      <Container size={size}>
        {children}
        <hr className="border-gray-300 m-0" />
      </Container>
    </header>
  );
};

export default StickyHeader;
