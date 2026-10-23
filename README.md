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

When built-in buttons connect, they receive an English default `title` only when the attribute is absent and the button has no meaningful text, image `alt`, `aria-label`, or `aria-labelledby` reference. Label references are resolved in the button's document or shadow root and must point to content. Hidden or `aria-hidden` descendants do not count as ordinary button text. During document loading, parser-created children are checked after the document finishes loading. This provides a fallback accessible name and a native tooltip for icon-only buttons. Supply text or ARIA names before inserting the button; later changes do not remove an existing title. Set `title` to localize it, or `title=""` to suppress it when providing a custom tooltip.

Setting `title=""` also removes the fallback accessible name. An icon-only button must then have another accessible name, supplied through visible text, `aria-label`, or `aria-labelledby`. Applications with custom tooltips should suppress the native title to avoid displaying both tooltips.

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
