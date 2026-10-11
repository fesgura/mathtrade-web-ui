const StickyHeader = ({ children, size = "" }) => {
  // Keep the list toolbar pinned on desktop, but avoid stealing viewport space on
  // mobile where the entire content scrollport is already the real viewport
  // band above the TabBar.
  return (
    <header className="lg:sticky max-lg:relative top-0 z-sticky bg-white shadow-md max-lg:shadow-none">
      {children}
    </header>
  );
};

export default StickyHeader;
