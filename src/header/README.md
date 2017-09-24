# Header

A container element for navigation and other content at the top of the screen with (optional) visual effects based on scroll position. Based on Polymer's [app-header](https://elements.polymer-project.org/elements/app-layout?active=app-header) element using vanilla web technologies (CSS, JavaScript and HTML).

## Demos

- [Scrolling header](http://mdk.frontendmatter.com/header.html) - Scrolls with the page
- [Scrolling header with blend background color effect](http://mdk.frontendmatter.com/header-blend.html) - Scrolls with the page and changes the header background color when scrolling
- [Scrolling header with parallax background effect](http://mdk.frontendmatter.com/header-parallax.html) - Scrolls with the page and moves the header background image at a different rate than the foreground when scrolling
- [Condenses header](http://mdk.frontendmatter.com/header-condenses.html) - Shrinks when scrolling down
- [Reveals header](http://mdk.frontendmatter.com/header-reveals.html) - Slides back the header when scrolling up
- [Fixed header](http://mdk.frontendmatter.com/header-fixed.html) - Stays at the top of the visible viewport when scrolling
- [Header with blend background color effect](http://mdk.frontendmatter.com/header-blend-color.html) - Changes the header background color when scrolling
- [Header with blend background image effect](http://mdk.frontendmatter.com/header-blend-image.html) - Changes the header background image when scrolling
- [Header with parallax and fade background effects](http://mdk.frontendmatter.com/header-parallax-fade.html) - Moves the header background image at a different rate than the foreground when scrolling and fades the background image into a background color after the header condenses
- [Header with parallax and blend background effects](http://mdk.frontendmatter.com/header-parallax-blend.html)

## Examples

```css
.mdk-header {
  background-color: #5C6BC0;
  color: #fff !important;
}
```

### Scrolling header

By default, a header moves away from the viewport when scrolling down.

```html
<div class="mdk-header js-mdk-header">
  <div class="mdk-header__content">
    <button type="button">Toggle</button>
  </div>
</div>
```

### Revealing header

The header can also slide back when scrolling up, when using the `reveals` option.

```html
<div class="mdk-header js-mdk-header" reveals>
  <div class="mdk-header__content">
    <button type="button">Toggle</button>
  </div>
</div>
```

### Condensing header

The header can also condense when scrolling down. To achieve this behavior, the header must use the `condenses` option and have a larger height than the `[primary]` element in the DOM. For example:

> In this case the header is initially `200px` tall, and it shrinks to `64px` when scrolling down.

```html
<div class="mdk-header js-mdk-header" style="height: 200px;" 
  reveals condenses>
  <div class="mdk-header__content">
    <button style="height: 64px;" type="button">Toggle</button>
  </div>
</div>
```

### Primary element

As the header condenses, the primary element is stacked up and would always stay above other elements. By default, the primary element is the first immediate child of the `.mdk-header__content` element, but it can also be configured by adding the `primary` attribute to another element.

### Scroll target

The `scrollTargetSelector` property of the header component allows to customize the scrollable element to which the header responds when the user scrolls. By default, the header uses the document as the scroll target, but you can customize this property by assigning a value directly or via the `scroll-target` attribute on the HTML element.

```html
<div id="scrollingRegion" style="overflow-y: auto;">
  <div class="mdk-header js-mdk-header" 
    scroll-target="scrollingRegion">
    <!-- header content -->
  </div>
</div>
```

Or, programatically:

```js
// scroll target ID
header.scrollTargetSelector = 'scrollingRegion'

// the document
header.scrollTargetSelector = 'document'

// HTMLElement
header.scrollTargetSelector = document.querySelector('#scrollingRegion')
```

## JavaScript

Initialize the header component by adding the `js-mdk-header` class.

## Options

The header options can be used programatically (see [Programmatic usage](#programmatic-usage) below) or via attributes on the HTML element.

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>condenses</code></td>
      <td>Collapse the header when scrolling down, leaving only the <code>[primary]</code> element visible. If there is no <code>[primary]</code> element, the first child remains visibile.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>reveals</code></td>
      <td>Slides back the header when scrolling back up.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Mantains the header fixed at the top.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>disabled</code></td>
      <td>Disables all scroll effects.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>transformDisabled</code></td>
      <td>Disables transform effects.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>scrollTargetSelector</code></td>
      <td>The scrollable element to which the header responds when the user scrolls. Can also be configured by adding the <code>scroll-target</code> attribute on the HTML element.</td>
      <td><code>document</code></td>
    </tr>
  </tbody>
</table>

## Methods

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>getScrollState()</code></td>
      <td>Returns an object containing the progress value of the scroll and the top position of the header.</td>
    </tr>
    <tr>
      <td><code>willCondense()</code></td>
      <td>Returns true if the header will condense based on the size of the header.</td>
    </tr>
    <tr>
      <td><code>isOnScreen()</code></td>
      <td>Returns true if the element is visible in the current viewport.</td>
    </tr>
    <tr>
      <td><code>isContentBelow()</code></td>
      <td>Returns true if there's content below the element.</td>
    </tr>
    <tr>
      <td><code>destroy()</code></td>
      <td>Destroys the header.</td>
    </tr>
    <tr>
      <td><code>init()</code></td>
      <td>(Re)Initializes the header (only needs to be called after using <code>destroy</code>).</td>
    </tr>
  </tbody>
</table>

## Programmatic usage

Get a reference to a header component and interact with the API.

```js
var headerNode = document.querySelector('.js-mdk-header')
var header = headerNode.mdkHeader

// Set the `fixed` option via property assignment
header.fixed = true

// Get the scroll state
console.log(header.getScrollState())

// Or get the scroll state from the scroll target
document.documentElement.addEventListener('scroll', function () {
  console.log(header.getScrollState())
})
```

Sometimes you need to initialize a header dynamically, for example when using libraries like Vue.js or Angular2 where you need to hook into the application lifecycle.

```js
var headerNode = document.querySelector('.js-mdk-header')

// Initialize header
domFactory.handler.upgradeElement(headerNode, 'mdk-header')

// Get a reference to the header component
var header = headerNode.mdkHeader

// Use the header API
header.condenses = true

// You can also destroy the header before removing it from the DOM
header.destroy()
```

## Reactivity

The header options are reactive, which means that when assigning options programatically (i.e. `header.fixed = true`) the component will update itself to reflect the new option value and trigger DOM changes.

---

## Get help
Get help directly from our team via our Slack channel. [Request invite](http://themekit-slack-invite.stamplayapp.com/)