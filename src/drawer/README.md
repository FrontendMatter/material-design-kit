# Drawer

A navigation drawer that can slide in from the left or right. Based on Polymer's [app-drawer](https://elements.polymer-project.org/elements/app-layout?active=app-drawer) element using vanilla web technologies (CSS, JavaScript and HTML).

## Demos

- [Left drawer](http://mdk.frontendmatter.com/drawer-left.html) - Slides in from the left
- [Right drawer](http://mdk.frontendmatter.com/drawer-right.html) - Slides in from the right

## Examples

Align the drawer at the start, which is left in LTR layouts (default).

```html
<div class="mdk-drawer js-mdk-drawer">
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

Align the drawer at the end.

```html
<div class="mdk-drawer js-mdk-drawer" data-align="end">
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

Open the drawer.

```html
<div class="mdk-drawer js-mdk-drawer" data-opened>
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

Disable the drawer scrim.

```html
<div class="mdk-drawer js-mdk-drawer" data-persistent>
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

To make the contents of the drawer scrollable, create a wrapper for the scroll content.

```css
.mdk-drawer__inner {
  height: 100%;
  overflow-y: auto;
  text-align: initial;
}
```

```html
<div class="mdk-drawer js-mdk-drawer">
  <div class="mdk-drawer__content">
    <div class="mdk-drawer__inner">
      <!-- Scrollable drawer content -->
    </div>
  </div>
</div>
```

## JavaScript

Initialize the drawer component by adding the `js-mdk-drawer` class.

## Options

The drawer options can be used programatically (see [Programmatic usage](#programmatic-usage) below) or via attributes on the HTML element.

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
      <td><code>align</code></td>
      <td>
        The alignment of the drawer on the screen (<code>left</code>, <code>right</code>, <code>start</code> or <code>end</code>). <code>start</code> computes to left and <code>end</code> to right in LTR and RTL layouts.
      </td>
      <td><code>left</code></td>
    </tr>
    <tr>
      <td><code>persistent</code></td>
      <td>The drawer does not have a scrim</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>opened</code></td>
      <td>The opened state of the drawer</td>
      <td><code>false</code></td>
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
      <td><code>open()</code></td>
      <td>
        Opens the drawer.
      </td>
    </tr>
    <tr>
      <td><code>close()</code></td>
      <td>Closes the drawer.</td>
    </tr>
    <tr>
      <td><code>toggle()</code></td>
      <td>Toggles the opened state of the drawer.</td>
    </tr>
    <tr>
      <td><code>getWidth()</code></td>
      <td>Get the width of the drawer.</td>
    </tr>
    <tr>
      <td><code>destroy()</code></td>
      <td>
        Destroys the drawer.
      </td>
    </tr>
    <tr>
      <td><code>init()</code></td>
      <td>
        (Re)Initializes the drawer (only needs to be called after using <code>destroy</code>).
      </td>
    </tr>
  </tbody>
</table>

## Events

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>mdk-drawer-change</code></td>
      <td>
        Fires when any of the drawer properties change (<code>align</code>, <code>position</code>, <code>persistent</code> or <code>opened</code>).
      </td>
    </tr>
    <tr>
      <td><code>mdk-drawer-changed</code></td>
      <td>Fires after the drawer state has changed (after the CSS transition is complete)</td>
    </tr>
  </tbody>
</table>

```js
var drawerNode = document.querySelector('.js-mdk-drawer')
drawerNode.addEventListener('mdk-drawer-change', function () {
  // do something
})
```

## Programmatic usage

Get a reference to a drawer component and interact with the API.

```js
var drawerNode = document.querySelector('.js-mdk-drawer')
var drawer = drawerNode.mdkDrawer

// Set the opened state directly via property
drawer.opened = true

// Open the drawer via method
drawer.open()

// Get the drawer width
console.log(drawer.getWidth())

// Toggle button
var button = document.querySelector('.some-button')
button.addEventListener('click', function () {
	drawer.toggle()
})
```

Sometimes you need to initialize a drawer dynamically, for example when using libraries like Vue.js or Angular2 where you need to hook into the application lifecycle.

```js
var drawerNode = document.querySelector('.js-mdk-drawer')

// Initialize drawer
domFactory.handler.upgradeElement(drawerNode, 'mdk-drawer')

// Get a reference to the drawer component
var drawer = drawerNode.mdkDrawer

// Use the drawer API
drawer.open()

// You can also destroy the drawer before removing it from the DOM
drawer.destroy()
```

## Reactivity

The drawer options are reactive, which means that when assigning options programatically (i.e. `drawer.opened = true`) or calling component methods which themselves are assigning options (i.e. `drawer.open()`), the component will update itself to reflect the new option value and trigger events and DOM changes.

## CSS

Customize the drawer width via CSS overrides.

```css
.mdk-drawer__content {
  width: 200px;
}
```

Customize the drawer background color.

```css
.mdk-drawer__content {
  background-color: #eee;
}
```

Customize the drawer based on position.

```css
[data-position=left] .mdk-drawer__content {
  border-right: 1px solid #eee;
}
```

Customize the drawer scrim.

```css
.mdk-drawer__scrim {
  background-color: rgba(0, 0, 0, .7);
}
```

## Sass

Customize the drawer width using Sass.

```sass
$mdk-drawer-width: 200px !default;

@import 'node_modules/material-design-kit/src/variables';
@import 'node_modules/material-design-kit/src/drawer/drawer';
```

---

## Get help
Get help directly from our team via our Slack channel. [Request invite](http://themekit-slack-invite.stamplayapp.com/)