# Drawer

A navigation drawer that can slide in from the left or right.

## Examples

Align the drawer at the start, which is left in LTR layouts (default).

```html
<div class="mdk-drawer mdk-js-drawer">
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

Align the drawer at the end.

```html
<div class="mdk-drawer mdk-js-drawer" align="end">
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

Open the drawer.

```html
<div class="mdk-drawer mdk-js-drawer" opened>
  <div class="mdk-drawer__content">
    <!-- Drawer content -->
  </div>
</div>
```

Disable the drawer scrim.

```html
<div class="mdk-drawer mdk-js-drawer" persistent>
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
<div class="mdk-drawer mdk-js-drawer">
  <div class="mdk-drawer__content">
    <div class="mdk-drawer__inner">
      <!-- Scrollable drawer content -->
    </div>
  </div>
</div>
```

## JavaScript

Initialize the drawer component by adding the `mdk-js-drawer` class.

## Options

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
      <td>`align`</td>
      <td>
        The alignment of the drawer on the screen (`left`, `right`, `start` or `end`). `start` computes to left and `end` to right in LTR and RTL layouts.
      </td>
      <td>`left`</td>
    </tr>
    <tr>
      <td>`persistent`</td>
      <td>The drawer does not have a scrim</td>
      <td>`false`</td>
    </tr>
    <tr>
      <td>`opened`</td>
      <td>The opened state of the drawer</td>
      <td>`false`</td>
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
      <td>`open()`</td>
      <td>
        Opens the drawer.
      </td>
    </tr>
    <tr>
      <td>`close()`</td>
      <td>Closes the drawer.</td>
    </tr>
    <tr>
      <td>`toggle()`</td>
      <td>Toggles the opened state of the drawer.</td>
    </tr>
    <tr>
      <td>`getWidth()`</td>
      <td>Get the width of the drawer.</td>
    </tr>
  </tbody>
</table>

## Programmatic usage

```js
// Global
var drawer = MDK.drawers[0]

// CommonJS
var drawer = require('material-design-kit').drawers[0]

// ES6
import { drawers } from 'material-design-kit'
let drawer = drawers[0]

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

---

## Get help
Get help directly from our team via our Slack channel. [Request invite](http://themekit-slack-invite.stamplayapp.com/)