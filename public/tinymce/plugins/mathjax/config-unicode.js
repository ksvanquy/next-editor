window.MathJax = {
  chtml: {
    mtextFont:
      "'Latin Modern Math', 'STIX Math', 'Arial Unicode MS', 'Times New Roman', serif",
    mtextInheritFont: true,
    merrorInheritFont: true,
    scale: 1,
    displayAlign: "center",
    displayIndent: "0",
    matchFontHeight: true,
  },
  options: {
    enableMenu: false,
    renderActions: {
      addMenu: [],
    },
  },
  tex: {
    packages: [
      "base",
      "ams",
      "newcommand",
      "noundefined",
      "require",
      "autoload",
      "configmacros",
      "cancel",
    ],
  },
};
