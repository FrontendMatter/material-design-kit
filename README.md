# Material Design Kit

[![npm version](https://badge.fury.io/js/material-design-kit.svg)](https://badge.fury.io/js/material-design-kit)

Interactive web components inspired from [Material Design](https://www.google.com/design/spec/material-design/introduction.html), using vanilla CSS, JavaScript and HTML.

## Layout components

- [x] [Drawer](https://github.com/FrontendMatter/material-design-kit/tree/master/src/drawer) - A navigation drawer that can slide in from the left or right.
- [x] [Drawer Layout](https://github.com/FrontendMatter/material-design-kit/tree/master/src/drawer-layout) - A wrapper element that positions a Drawer and other content.
- [x] [Header](https://github.com/FrontendMatter/material-design-kit/tree/master/src/header) - A container element for navigation and other content at the top of the screen with visual effects based on scroll position.
- [x] [Header Layout](https://github.com/FrontendMatter/material-design-kit/tree/master/src/header-layout) - A wrapper element that positions a Header and other content.
- [x] [Box](https://github.com/FrontendMatter/material-design-kit/tree/master/src/box) - A container element for generic content with visual effects based on scroll position.
- [ ] *Tabs*
- [ ] *Footer*

## Media components

- [x] [Reveal](https://github.com/FrontendMatter/material-design-kit/tree/master/src/reveal) - A content area that reveals on user interaction.
- [x] [Carousel](https://github.com/FrontendMatter/material-design-kit/tree/master/src/carousel) - A component for cycling through elements with Mouse Grab (desktop) and Touch support.
- [ ] *Overlay*

## Form components

- [ ] *Text Fields*
- [ ] *Slider*
- [ ] *Toggle*

## Informative

- [ ] *Tooltip*
- [ ] *Progress*

## Notifications

- [ ] *Snackbar*

## Behaviors

- [x] [Scroll Target](https://github.com/FrontendMatter/material-design-kit/tree/master/src/scroll-target-behavior) - Allows an element to respond to scroll events from a designated scroll target.
- [x] [Scroll Effect](https://github.com/FrontendMatter/material-design-kit/tree/master/src/scroll-effect-behavior) - Allows a consumer of the Scroll Target behavior to use scroll effects.
- [ ] *Ripple*
- [ ] *Swipe Dismiss*

## Style guide

- [ ] *Browser resets - (normalize.css)*
- [ ] *Responsive breakpoints*
- [ ] *Flexbox layout*
- [ ] *Colors*
- [ ] *Typography*
- [ ] *Shadow*
- [ ] *Grid*
- [ ] *Button*
- [ ] *Card*
- [ ] *List*

## Compatibility

> Supports the last two versions of every major browser.

- Chrome
- Safari
- Firefox
- IE 11/Edge
- Opera
- Mobile Safari
- Chrome on Android

> Library

- [x] Compatible with projects using (or not using) jQuery, Bootstrap and MDL.
- [x] UMD library format - supports AMD, CommonJS (browserify), ES6 imports and global namespace.

## Demos

> Note there are many more demos included with the source of each component.

- [Left drawer](http://mdk.frontendmatter.com/drawer-left.html) - Slides in from the left
- [Drawer layout with header layout](http://mdk.frontendmatter.com/drawer-layout-with-header-layout.html) - Uses a Header Layout with a custom scrolling region
- [Header layout within drawer](http://mdk.frontendmatter.com/header-layout-drawer.html) - Positions a header and other content within a drawer
- [Header layout within drawer with transform effects](http://mdk.frontendmatter.com/header-layout-drawer-transform-fx.html) - Positions a header and other content within a drawer and use transform effects on header elements based on scroll position
- [Header with parallax and blend background effects](http://mdk.frontendmatter.com/header-parallax-blend.html)
- [Reveal](http://mdk.frontendmatter.com/reveal.html)
- [Carousel](http://mdk.frontendmatter.com/carousel.html)

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
  <script>domFactory.handler.autoInit()</script>
</body>
</html>
```

---

## Get help
Get help directly from our team via our Slack channel. [Request invite](http://themekit-slack-invite.stamplayapp.com/)