// The app's stacking layers, bottom to top. Every z-index in the app uses one
// of these (Tailwind: z-sticky, z-nav…; SCSS: $z-sticky…; JS: Z.nav) instead
// of a loose number. Small numbers are only for ordering things inside a
// single component, whose root then gets `isolate`.
// CommonJS: tailwind.config.js reads it too. Mirrored in styles/_zindex.scss.
const Z = {
  base: 0,
  raised: 10, // inside a card/block: badges, inline overlays, inline loading
  sticky: 20, // content bars: lists' filter bar, grid headers, filters aside, Mis deseos footer
  loading: 30, // page loading blur (covers the content area)
  nav: 40, // sidebar, mobile tab bar, floating buttons (chat, "Ver tu representante")
  panel: 50, // panels opened from the nav, "Más" sheet, mobile filters
  modal: 60, // modals, photo gallery
  popover: 70, // dropdowns, contextual help: above modals too
  tooltip: 80,
};

module.exports = { Z };
