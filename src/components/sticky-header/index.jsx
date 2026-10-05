const StickyHeader = ({ children, size = "" }) => {
  // bg-white so list rows scrolling underneath the stuck bar don't show through.
  // Sticks to the top of the mathtrade content scrollport (layout column on
  // mobile = viewport minus the bottom TabBar), not under the tab bar.
  return (
    <header className="sticky top-0 z-sticky bg-white shadow-md">
      {children}
    </header>
  );
};

export default StickyHeader;
