# Drawer Layout

A wrapper element that positions a Drawer and other content. Based on Polymer's [app-drawer-layout](https://elements.polymer-project.org/elements/app-layout?active=app-drawer-layout) element using vanilla web technologies (CSS, JavaScript and HTML). When the viewport width is smaller than `responsiveWidth`, the element changes to narrow layout. In narrow layout, the drawer will be stacked on top of the main content, otherwise the drawer will be beside the main content.

## Demos

- [Left drawer layout demo](http://mdk-demo.themekit.io/drawer-layout-left.html)

## Examples

Align the drawer at the start, which is left in LTR layouts (default).

```html
<div class="mdk-drawer-layout mdk-js-drawer-layout">
  <div class="mdk-drawer-layout__content">

    <!-- drawer -->
    <div class="mdk-drawer mdk-js-drawer">
      <div class="mdk-drawer__content">
        <!-- drawer content -->
      </div>
    </div>

    <!-- main content -->
    <p>Lorem ipsum dolor sit amet.</p>

  </div>
</div>
```

With a Header Layout, a custom scrolling region for the main content and a push effect when toggling the drawer.

```css
.mdk-header {
  background-color: #5C6BC0;
  color: #fff !important;
}
```

```html
<div class="mdk-drawer-layout mdk-js-drawer-layout" fullbleed push>
  <div class="mdk-drawer-layout__content">

    <!-- header layout -->
    <div class="mdk-header-layout mdk-js-header-layout" has-scrolling-region>

      <!-- header -->
      <div class="mdk-header mdk-js-header"
        effects="waterfall condenses fixed">
        <div class="mdk-header__content">
          <!-- header content -->
          <button type="button">Toggle</button>
        </div>
      </div>
      
      <!-- header layout content -->
      <div class="mdk-header-layout__content">
        <!-- main content -->
      </div>
    </div>

    <!-- drawer -->
    <div class="mdk-drawer mdk-js-drawer">
      <div class="mdk-drawer__content">
        <!-- drawer content -->
      </div>
    </div>

  </div>
</div>
```

Customize the maximum viewport width for enabling the narrow layout.

```html
<div class="mdk-drawer-layout mdk-js-drawer-layout" responsive-width="768px">
  <div class="mdk-drawer-layout__content">
    <!-- drawer and main content -->
  </div>
</div>
```

Ignore the `responsiveWidth` option and force the narrow layout on any screen size.

```html
<div class="mdk-drawer-layout mdk-js-drawer-layout" force-narrow>
  <div class="mdk-drawer-layout__content">
    <!-- drawer and main content -->
  </div>
</div>
```

## JavaScript

Initialize the drawer layout component by adding the `mdk-js-drawer-layout` class.

## Options

The drawer layout options can be used programatically (see [Programmatic usage](#programmatic-usage) below) or via attributes on the HTML element.

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
      <td><code>responsiveWidth</code></td>
      <td>The maximum viewport width for enabling the narrow layout.</td>
      <td><code>554px</code></td>
    </tr>
    <tr>
      <td><code>forceNarrow</code></td>
      <td>Ignore the <code>responsiveWidth</code> option and force the narrow layout on any screen size.</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>push</code></td>
      <td>Enable a push effect when toggling the drawer.</td>
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
      <td><code>destroy()</code></td>
      <td>Destroys the drawer layout.</td>
    </tr>
    <tr>
      <td><code>init()</code></td>
      <td>(Re)Initializes the drawer layout (only needs to be called after using <code>destroy</code>).</td>
    </tr>
  </tbody>
</table>

## Programmatic usage

Get a reference to an initialized drawer layout.

```js
// Global
var drawerLayout = MDK.drawerLayouts[0]

// CommonJS
var drawerLayout = require('material-design-kit').drawerLayouts[0]

// ES6
import { drawerLayouts } from 'material-design-kit'
let drawerLayout = drawerLayouts[0]
```

Interact with an initialized drawer layout.

```js
// Set the `responsiveWidth` option via property assignment
drawerLayout.responsiveWidth = '768px'

// Change to narrow layout
drawerLayout.narrow = true

// Interact with the associated drawer
console.log(drawerLayout.drawer.getWidth())

// Toggle button
var button = document.querySelector('.some-button')
button.addEventListener('click', function () {
	drawerLayout.drawer.toggle()
})
```

Sometimes you need to initialize a drawer layout dynamically, for example when using libraries like Vue.js or Angular2 where you need to hook into the application lifecycle.

```js
// Global
var drawerLayoutComponent = MDK.drawerLayoutComponent

// CommonJS
var drawerLayoutComponent = require('material-design-kit').drawerLayoutComponent

// ES6
import { drawerLayoutComponent } from 'material-design-kit'
```

```js
var drawerLayoutNode = document.querySelector('.mdk-js-drawer-layout')
var drawerLayout = drawerLayoutComponent(drawerLayoutNode)

// Use the drawer layout
drawerLayout.forceNarrow = true

// You can also destroy the drawer layout before removing it from the DOM
drawerLayout.destroy()
```

## Reactivity

The drawer layout options are reactive, which means that when assigning options programatically (i.e. `drawerLayout.narrow = true`) the component will update itself to reflect the new option value and trigger DOM changes.

---

## Get help
Get help directly from our team via our Slack channel. [Request invite](http://themekit-slack-invite.stamplayapp.com/)