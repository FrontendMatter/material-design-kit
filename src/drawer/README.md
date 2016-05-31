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
      <td><code>init()</code></td>
      <td>
        Initializes the drawer.
      </td>
    </tr>
    <tr>
      <td><code>destroy()</code></td>
      <td>
        Destroys the drawer.
      </td>
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
```

```js
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