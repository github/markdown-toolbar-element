# &lt;markdown-toolbar&gt; element

Markdown formatting buttons for text inputs.

## Installation

```
npm install --save markdown-toolbar-element
```

## Usage

```html
<markdown-toolbar for="textarea_id">
  <md-header-2>heading 2</md-header-2>
  <md-header-3>heading 3</md-header-3>
  <md-link>link</md-link>
  <md-quote>quote</md-quote>
  <md-ordered-list>ordered-list</md-ordered-list>
  <md-unordered-list>unordered-list</md-unordered-list>
</markdown-toolbar>
<textarea id="textarea_id"></textarea>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Internet Explorer 11
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
