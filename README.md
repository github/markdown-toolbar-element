# &lt;markdown-toolbar&gt; element

markdown-toolbar buttons for textareas.

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
  <md-unordered-list>unordered-list</md-unordered-list>
  <md-ordered-list>ordered-list</md-ordered-list>
  <md-task-list>task-list</md-task-list>
  <md-mention>mention</md-mention>
  <md-ref>ref</md-ref>
</markdown-toolbar>
<textarea id="textarea_id"></textarea>
```

## Browser support

- Chrome
- Firefox
- Safari 9+
- Internet Explorer 11
- Microsoft Edge

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
