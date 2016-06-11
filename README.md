# Material Design Kit

[![npm version](https://badge.fury.io/js/material-design-kit.svg)](https://badge.fury.io/js/material-design-kit)

Interactive web components inspired from [Material Design](https://www.google.com/design/spec/material-design/introduction.html), using vanilla CSS, JavaScript and HTML.

## Demos

> Note there are many more demos included with each component below.

- [Left drawer](http://mdk-demo.themekit.io/drawer-left.html) - Slides in from the left
- [Drawer layout with header layout](http://mdk-demo.themekit.io/drawer-layout-with-header-layout.html) - Uses a Header Layout with a custom scrolling region
- [Header layout within drawer](http://mdk-demo.themekit.io/header-layout-drawer.html) - Positions a header and other content within a drawer
- [Header layout within drawer with transform effects](http://mdk-demo.themekit.io/header-layout-drawer-transform-fx.html) - Positions a header and other content within a drawer and use transform effects on header elements based on scroll position
- [Header with parallax and blend background effects](http://mdk-demo.themekit.io/header-parallax-blend.html)

## Compatibility

- Supports ES5-compliant browsers (IE9+)
- Compatible with projects using (or not using) jQuery, Bootstrap and MDL

## Components

- [Drawer](https://github.com/themekit/material-design-kit/tree/master/src/drawer) - A navigation drawer that can slide in from the left or right.
- [Drawer Layout](https://github.com/themekit/material-design-kit/tree/master/src/drawer-layout) - A wrapper element that positions a Drawer and other content.
- [Header](https://github.com/themekit/material-design-kit/tree/master/src/header) - A container element for navigation and other content at the top of the screen with visual effects based on scroll position.
- [Header Layout](https://github.com/themekit/material-design-kit/tree/master/src/header-layout) - A wrapper element that positions a Header and other content.
- [Box](https://github.com/themekit/material-design-kit/tree/master/src/box) - A container element for generic content with visual effects based on scroll position.
- [Reveal](https://github.com/themekit/material-design-kit/tree/master/src/reveal) - A content area that reveals on user interaction.

## Installation

Install MDK and it's dependencies via npm.

```bash
npm install material-design-kit dom-factory
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="node_modules/material-design-kit/dist/material-design-kit.css">
</head>
<body>
  <script src="node_modules/dom-factory/dist/dom-factory.js"></script>
  <script src="node_modules/material-design-kit/dist/material-design-kit.js" async defer></script>
</body>
</html>
```

---

## Get help
Get help directly from our team via our Slack channel. [Request invite](http://themekit-slack-invite.stamplayapp.com/)