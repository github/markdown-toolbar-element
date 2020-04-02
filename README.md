# &lt;markdown-toolbar&gt; element

Markdown formatting buttons for text inputs.

## Installation

```
$ npm install --save @github/markdown-toolbar-element
```

## Usage

```js
import '@github/markdown-toolbar-element'
```

```html
<markdown-toolbar for="textarea_id">
  <md-bold>bold</md-bold>
  <md-header>header</md-header>
  <md-italic>italic</md-italic>
  <md-quote>quote</md-quote>
  <md-code>code</md-code>
  <md-link>link</md-link>
  <md-image>image</md-image>
  <md-unordered-list>unordered-list</md-unordered-list>
  <md-ordered-list>ordered-list</md-ordered-list>
  <md-task-list>task-list</md-task-list>
  <md-mention>mention</md-mention>
  <md-ref>ref</md-ref>
  <button data-md-button>Custom button</button>
</markdown-toolbar>
<textarea id="textarea_id"></textarea>
```

`<markdown-toolbar>` comes with focus management as advised in [WAI-ARIA Authoring Practices 1.1: Toolbar Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/examples/toolbar/toolbar.html). The `md-*` buttons that ship with this package are automatically managed. Add a `data-md-button` attribute to any custom toolbar items to enroll them into focus management.

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
