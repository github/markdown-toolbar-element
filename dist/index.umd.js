(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
  }

  ;
  Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(_CustomElement, HTMLElement);
  function keydown(fn) {
    return function (event) {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        fn(event);
      }
    };
  }

  var styles = new WeakMap();

  var MarkdownButtonElement = function (_CustomElement2) {
    _inherits(MarkdownButtonElement, _CustomElement2);

    function MarkdownButtonElement() {
      _classCallCheck(this, MarkdownButtonElement);

      var _this = _possibleConstructorReturn(this, (MarkdownButtonElement.__proto__ || Object.getPrototypeOf(MarkdownButtonElement)).call(this));

      var apply = function apply() {
        var style = styles.get(_this);
        if (!style) return;
        applyStyle(_this, style);
      };
      _this.addEventListener('keydown', keydown(apply));
      _this.addEventListener('click', apply);
      return _this;
    }

    _createClass(MarkdownButtonElement, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        if (!this.hasAttribute('tabindex')) {
          this.setAttribute('tabindex', '0');
        }

        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'button');
        }
      }
    }, {
      key: 'click',
      value: function click() {
        var style = styles.get(this);
        if (!style) return;
        applyStyle(this, style);
      }
    }]);

    return MarkdownButtonElement;
  }(_CustomElement);

  var MarkdownHeaderButtonElement = function (_MarkdownButtonElemen) {
    _inherits(MarkdownHeaderButtonElement, _MarkdownButtonElemen);

    function MarkdownHeaderButtonElement() {
      _classCallCheck(this, MarkdownHeaderButtonElement);

      var _this2 = _possibleConstructorReturn(this, (MarkdownHeaderButtonElement.__proto__ || Object.getPrototypeOf(MarkdownHeaderButtonElement)).call(this));

      styles.set(_this2, { prefix: '### ' });
      return _this2;
    }

    return MarkdownHeaderButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-header')) {
    window.MarkdownHeaderButtonElement = MarkdownHeaderButtonElement;
    window.customElements.define('md-header', MarkdownHeaderButtonElement);
  }

  var MarkdownHeading2ButtonElement = function (_MarkdownButtonElemen2) {
    _inherits(MarkdownHeading2ButtonElement, _MarkdownButtonElemen2);

    function MarkdownHeading2ButtonElement() {
      _classCallCheck(this, MarkdownHeading2ButtonElement);

      var _this3 = _possibleConstructorReturn(this, (MarkdownHeading2ButtonElement.__proto__ || Object.getPrototypeOf(MarkdownHeading2ButtonElement)).call(this));

      styles.set(_this3, { prefix: '## ', surroundWithNewlines: true });
      return _this3;
    }

    return MarkdownHeading2ButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-header-2')) {
    window.MarkdownHeading2ButtonElement = MarkdownHeading2ButtonElement;
    window.customElements.define('md-header-2', MarkdownHeading2ButtonElement);
  }

  var MarkdownHeading3ButtonElement = function (_MarkdownButtonElemen3) {
    _inherits(MarkdownHeading3ButtonElement, _MarkdownButtonElemen3);

    function MarkdownHeading3ButtonElement() {
      _classCallCheck(this, MarkdownHeading3ButtonElement);

      var _this4 = _possibleConstructorReturn(this, (MarkdownHeading3ButtonElement.__proto__ || Object.getPrototypeOf(MarkdownHeading3ButtonElement)).call(this));

      styles.set(_this4, { prefix: '### ', surroundWithNewlines: true });
      return _this4;
    }

    return MarkdownHeading3ButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-header-3')) {
    window.MarkdownHeading3ButtonElement = MarkdownHeading3ButtonElement;
    window.customElements.define('md-header-3', MarkdownHeading3ButtonElement);
  }

  var MarkdownHeading4ButtonElement = function (_MarkdownButtonElemen4) {
    _inherits(MarkdownHeading4ButtonElement, _MarkdownButtonElemen4);

    function MarkdownHeading4ButtonElement() {
      _classCallCheck(this, MarkdownHeading4ButtonElement);

      var _this5 = _possibleConstructorReturn(this, (MarkdownHeading4ButtonElement.__proto__ || Object.getPrototypeOf(MarkdownHeading4ButtonElement)).call(this));

      styles.set(_this5, { prefix: '#### ', surroundWithNewlines: true });
      return _this5;
    }

    return MarkdownHeading4ButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-header-4')) {
    window.MarkdownHeading4ButtonElement = MarkdownHeading4ButtonElement;
    window.customElements.define('md-header-4', MarkdownHeading4ButtonElement);
  }

  var MarkdownBoldButtonElement = function (_MarkdownButtonElemen5) {
    _inherits(MarkdownBoldButtonElement, _MarkdownButtonElemen5);

    function MarkdownBoldButtonElement() {
      _classCallCheck(this, MarkdownBoldButtonElement);

      var _this6 = _possibleConstructorReturn(this, (MarkdownBoldButtonElement.__proto__ || Object.getPrototypeOf(MarkdownBoldButtonElement)).call(this));

      _this6.setAttribute('hotkey', 'b');
      styles.set(_this6, { prefix: '**', suffix: '**', trimFirst: true });
      return _this6;
    }

    return MarkdownBoldButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-bold')) {
    window.MarkdownBoldButtonElement = MarkdownBoldButtonElement;
    window.customElements.define('md-bold', MarkdownBoldButtonElement);
  }

  var MarkdownItalicButtonElement = function (_MarkdownButtonElemen6) {
    _inherits(MarkdownItalicButtonElement, _MarkdownButtonElemen6);

    function MarkdownItalicButtonElement() {
      _classCallCheck(this, MarkdownItalicButtonElement);

      var _this7 = _possibleConstructorReturn(this, (MarkdownItalicButtonElement.__proto__ || Object.getPrototypeOf(MarkdownItalicButtonElement)).call(this));

      _this7.setAttribute('hotkey', 'i');
      styles.set(_this7, { prefix: '_', suffix: '_', trimFirst: true });
      return _this7;
    }

    return MarkdownItalicButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-italic')) {
    window.MarkdownItalicButtonElement = MarkdownItalicButtonElement;
    window.customElements.define('md-italic', MarkdownItalicButtonElement);
  }

  var MarkdownQuoteButtonElement = function (_MarkdownButtonElemen7) {
    _inherits(MarkdownQuoteButtonElement, _MarkdownButtonElemen7);

    function MarkdownQuoteButtonElement() {
      _classCallCheck(this, MarkdownQuoteButtonElement);

      var _this8 = _possibleConstructorReturn(this, (MarkdownQuoteButtonElement.__proto__ || Object.getPrototypeOf(MarkdownQuoteButtonElement)).call(this));

      styles.set(_this8, { prefix: '> ', multiline: true, surroundWithNewlines: true });
      return _this8;
    }

    return MarkdownQuoteButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-quote')) {
    window.MarkdownQuoteButtonElement = MarkdownQuoteButtonElement;
    window.customElements.define('md-quote', MarkdownQuoteButtonElement);
  }

  var MarkdownCodeButtonElement = function (_MarkdownButtonElemen8) {
    _inherits(MarkdownCodeButtonElement, _MarkdownButtonElemen8);

    function MarkdownCodeButtonElement() {
      _classCallCheck(this, MarkdownCodeButtonElement);

      var _this9 = _possibleConstructorReturn(this, (MarkdownCodeButtonElement.__proto__ || Object.getPrototypeOf(MarkdownCodeButtonElement)).call(this));

      styles.set(_this9, { prefix: '`', suffix: '`', blockPrefix: '```', blockSuffix: '```' });
      return _this9;
    }

    return MarkdownCodeButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-code')) {
    window.MarkdownCodeButtonElement = MarkdownCodeButtonElement;
    window.customElements.define('md-code', MarkdownCodeButtonElement);
  }

  var MarkdownLinkButtonElement = function (_MarkdownButtonElemen9) {
    _inherits(MarkdownLinkButtonElement, _MarkdownButtonElemen9);

    function MarkdownLinkButtonElement() {
      _classCallCheck(this, MarkdownLinkButtonElement);

      var _this10 = _possibleConstructorReturn(this, (MarkdownLinkButtonElement.__proto__ || Object.getPrototypeOf(MarkdownLinkButtonElement)).call(this));

      _this10.setAttribute('hotkey', 'k');
      styles.set(_this10, { prefix: '[', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://' });
      return _this10;
    }

    return MarkdownLinkButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-link')) {
    window.MarkdownLinkButtonElement = MarkdownLinkButtonElement;
    window.customElements.define('md-link', MarkdownLinkButtonElement);
  }

  var MarkdownCallToActionButtonElement = function (_MarkdownButtonElemen10) {
    _inherits(MarkdownCallToActionButtonElement, _MarkdownButtonElemen10);

    function MarkdownCallToActionButtonElement() {
      _classCallCheck(this, MarkdownCallToActionButtonElement);

      var _this11 = _possibleConstructorReturn(this, (MarkdownCallToActionButtonElement.__proto__ || Object.getPrototypeOf(MarkdownCallToActionButtonElement)).call(this));

      styles.set(_this11, {
        prefix: '$CTA [',
        suffix: '](url) $CTA',
        replaceNext: 'url',
        scanFor: 'https?://',
        surroundWithNewlines: true
      });
      return _this11;
    }

    return MarkdownCallToActionButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-link-cta')) {
    window.MarkdownCallToActionButtonElement = MarkdownCallToActionButtonElement;
    window.customElements.define('md-link-cta', MarkdownCallToActionButtonElement);
  }

  var MarkdownEmailLinkButtonElement = function (_MarkdownButtonElemen11) {
    _inherits(MarkdownEmailLinkButtonElement, _MarkdownButtonElemen11);

    function MarkdownEmailLinkButtonElement() {
      _classCallCheck(this, MarkdownEmailLinkButtonElement);

      var _this12 = _possibleConstructorReturn(this, (MarkdownEmailLinkButtonElement.__proto__ || Object.getPrototypeOf(MarkdownEmailLinkButtonElement)).call(this));

      styles.set(_this12, { prefix: '<', suffix: '>' });
      return _this12;
    }

    return MarkdownEmailLinkButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-link-email')) {
    window.MarkdownEmailLinkButtonElement = MarkdownEmailLinkButtonElement;
    window.customElements.define('md-link-email', MarkdownEmailLinkButtonElement);
  }

  var MarkdownUnorderedListButtonElement = function (_MarkdownButtonElemen12) {
    _inherits(MarkdownUnorderedListButtonElement, _MarkdownButtonElemen12);

    function MarkdownUnorderedListButtonElement() {
      _classCallCheck(this, MarkdownUnorderedListButtonElement);

      var _this13 = _possibleConstructorReturn(this, (MarkdownUnorderedListButtonElement.__proto__ || Object.getPrototypeOf(MarkdownUnorderedListButtonElement)).call(this));

      styles.set(_this13, { prefix: '- ', multiline: true, surroundWithNewlines: true });
      return _this13;
    }

    return MarkdownUnorderedListButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-unordered-list')) {
    window.MarkdownUnorderedListButtonElement = MarkdownUnorderedListButtonElement;
    window.customElements.define('md-unordered-list', MarkdownUnorderedListButtonElement);
  }

  var MarkdownOrderedListButtonElement = function (_MarkdownButtonElemen13) {
    _inherits(MarkdownOrderedListButtonElement, _MarkdownButtonElemen13);

    function MarkdownOrderedListButtonElement() {
      _classCallCheck(this, MarkdownOrderedListButtonElement);

      var _this14 = _possibleConstructorReturn(this, (MarkdownOrderedListButtonElement.__proto__ || Object.getPrototypeOf(MarkdownOrderedListButtonElement)).call(this));

      styles.set(_this14, { prefix: '1. ', multiline: true, surroundWithNewlines: true, orderedList: true });
      return _this14;
    }

    return MarkdownOrderedListButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-ordered-list')) {
    window.MarkdownOrderedListButtonElement = MarkdownOrderedListButtonElement;
    window.customElements.define('md-ordered-list', MarkdownOrderedListButtonElement);
  }

  var MarkdownTaskListButtonElement = function (_MarkdownButtonElemen14) {
    _inherits(MarkdownTaskListButtonElement, _MarkdownButtonElemen14);

    function MarkdownTaskListButtonElement() {
      _classCallCheck(this, MarkdownTaskListButtonElement);

      var _this15 = _possibleConstructorReturn(this, (MarkdownTaskListButtonElement.__proto__ || Object.getPrototypeOf(MarkdownTaskListButtonElement)).call(this));

      _this15.setAttribute('hotkey', 'L');
      styles.set(_this15, { prefix: '- [ ] ', multiline: true, surroundWithNewlines: true });
      return _this15;
    }

    return MarkdownTaskListButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-task-list')) {
    window.MarkdownTaskListButtonElement = MarkdownTaskListButtonElement;
    window.customElements.define('md-task-list', MarkdownTaskListButtonElement);
  }

  var MarkdownMentionButtonElement = function (_MarkdownButtonElemen15) {
    _inherits(MarkdownMentionButtonElement, _MarkdownButtonElemen15);

    function MarkdownMentionButtonElement() {
      _classCallCheck(this, MarkdownMentionButtonElement);

      var _this16 = _possibleConstructorReturn(this, (MarkdownMentionButtonElement.__proto__ || Object.getPrototypeOf(MarkdownMentionButtonElement)).call(this));

      styles.set(_this16, { prefix: '@', prefixSpace: true });
      return _this16;
    }

    return MarkdownMentionButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-mention')) {
    window.MarkdownMentionButtonElement = MarkdownMentionButtonElement;
    window.customElements.define('md-mention', MarkdownMentionButtonElement);
  }

  var MarkdownRefButtonElement = function (_MarkdownButtonElemen16) {
    _inherits(MarkdownRefButtonElement, _MarkdownButtonElemen16);

    function MarkdownRefButtonElement() {
      _classCallCheck(this, MarkdownRefButtonElement);

      var _this17 = _possibleConstructorReturn(this, (MarkdownRefButtonElement.__proto__ || Object.getPrototypeOf(MarkdownRefButtonElement)).call(this));

      styles.set(_this17, { prefix: '#', prefixSpace: true });
      return _this17;
    }

    return MarkdownRefButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-ref')) {
    window.MarkdownRefButtonElement = MarkdownRefButtonElement;
    window.customElements.define('md-ref', MarkdownRefButtonElement);
  }

  var MarkdownAddressButtonElement = function (_MarkdownButtonElemen17) {
    _inherits(MarkdownAddressButtonElement, _MarkdownButtonElemen17);

    function MarkdownAddressButtonElement() {
      _classCallCheck(this, MarkdownAddressButtonElement);

      var _this18 = _possibleConstructorReturn(this, (MarkdownAddressButtonElement.__proto__ || Object.getPrototypeOf(MarkdownAddressButtonElement)).call(this));

      styles.set(_this18, { prefix: '$A\n', suffix: '\n$A', multiline: true, surroundWithNewlines: true });
      return _this18;
    }

    return MarkdownAddressButtonElement;
  }(MarkdownButtonElement);

  if (!window.customElements.get('md-address')) {
    window.MarkdownAddressButtonElement = MarkdownAddressButtonElement;
    window.customElements.define('md-address', MarkdownAddressButtonElement);
  }

  var modifierKey = navigator.userAgent.match(/Macintosh/) ? 'Meta' : 'Control';

  var MarkdownToolbarElement = function (_CustomElement3) {
    _inherits(MarkdownToolbarElement, _CustomElement3);

    function MarkdownToolbarElement() {
      _classCallCheck(this, MarkdownToolbarElement);

      return _possibleConstructorReturn(this, (MarkdownToolbarElement.__proto__ || Object.getPrototypeOf(MarkdownToolbarElement)).call(this));
    }

    _createClass(MarkdownToolbarElement, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        var fn = shortcut.bind(null, this);
        if (this.field) {
          this.field.addEventListener('keydown', fn);
          shortcutListeners.set(this, fn);
        }
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        var fn = shortcutListeners.get(this);
        if (fn && this.field) {
          this.field.removeEventListener('keydown', fn);
          shortcutListeners.delete(this);
        }
      }
    }, {
      key: 'field',
      get: function get() {
        var id = this.getAttribute('for');
        if (!id) return;
        var field = document.getElementById(id);
        return field instanceof HTMLTextAreaElement ? field : null;
      }
    }]);

    return MarkdownToolbarElement;
  }(_CustomElement);

  var shortcutListeners = new WeakMap();

  function shortcut(toolbar, event) {
    if (event.metaKey && modifierKey === 'Meta' || event.ctrlKey && modifierKey === 'Control') {
      var button = toolbar.querySelector('[hotkey="' + event.key + '"]');
      if (button) {
        button.click();
        event.preventDefault();
      }
    }
  }

  if (!window.customElements.get('markdown-toolbar')) {
    window.MarkdownToolbarElement = MarkdownToolbarElement;
    window.customElements.define('markdown-toolbar', MarkdownToolbarElement);
  }

  function isMultipleLines(string) {
    return string.trim().split('\n').length > 1;
  }

  function repeat(string, n) {
    return Array(n + 1).join(string);
  }

  function lineSelectionStart(text, index) {
    while (text[index] && text[index - 1] != null && !text[index - 1].match(/\n/)) {
      index--;
    }
    return index;
  }

  function lineSelectionEnd(text, index) {
    while (text[index] && !text[index].match(/\n/)) {
      index++;
    }
    return index;
  }

  var canInsertText = null;

  function insertText(textarea, _ref) {
    var text = _ref.text,
        selectionStart = _ref.selectionStart,
        selectionEnd = _ref.selectionEnd;

    var originalSelectionStart = textarea.selectionStart;
    var before = textarea.value.slice(0, originalSelectionStart);
    var after = textarea.value.slice(textarea.selectionEnd);

    if (canInsertText === null || canInsertText === true) {
      try {
        canInsertText = document.execCommand('insertText', false, text);
      } catch (error) {
        canInsertText = false;
      }
    }

    if (canInsertText && !textarea.value.slice(0, textarea.selectionStart).endsWith(text)) {
      canInsertText = false;
    }

    if (!canInsertText) {
      try {
        document.execCommand('ms-beginUndoUnit');
      } catch (e) {
        // Do nothing.
      }
      textarea.value = before + text + after;
      try {
        document.execCommand('ms-endUndoUnit');
      } catch (e) {
        // Do nothing.
      }
      textarea.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: true }));
    }

    if (selectionStart != null && selectionEnd != null) {
      textarea.setSelectionRange(selectionStart, selectionEnd);
    } else {
      textarea.setSelectionRange(originalSelectionStart, textarea.selectionEnd);
    }
  }

  function styleSelectedText(textarea, styleArgs) {
    var text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);

    var result = void 0;
    if (styleArgs.orderedList && text) {
      result = orderedList(textarea);
    } else if (styleArgs.multiline && isMultipleLines(text)) {
      result = multilineStyle(textarea, styleArgs);
    } else {
      result = blockStyle(textarea, styleArgs);
    }

    insertText(textarea, result);
  }

  function expandSelectedText(textarea, prefixToUse, suffixToUse) {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.selectionStart = lineSelectionStart(textarea.value, textarea.selectionStart);
      textarea.selectionEnd = lineSelectionEnd(textarea.value, textarea.selectionEnd);
    } else {
      var expandedSelectionStart = textarea.selectionStart - prefixToUse.length;
      var expandedSelectionEnd = textarea.selectionEnd + suffixToUse.length;
      var beginsWithPrefix = textarea.value.slice(expandedSelectionStart, textarea.selectionStart) === prefixToUse;
      var endsWithSuffix = textarea.value.slice(textarea.selectionEnd, expandedSelectionEnd) === suffixToUse;
      if (beginsWithPrefix && endsWithSuffix) {
        textarea.selectionStart = expandedSelectionStart;
        textarea.selectionEnd = expandedSelectionEnd;
      }
    }
    return textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
  }

  function newlinesToSurroundSelectedText(textarea) {
    var beforeSelection = textarea.value.slice(0, textarea.selectionStart);
    var afterSelection = textarea.value.slice(textarea.selectionEnd);

    var breaksBefore = beforeSelection.match(/\n*$/);
    var breaksAfter = afterSelection.match(/^\n*/);
    var newlinesBeforeSelection = breaksBefore ? breaksBefore[0].length : 0;
    var newlinesAfterSelection = breaksAfter ? breaksAfter[0].length : 0;

    var newlinesToAppend = void 0;
    var newlinesToPrepend = void 0;

    if (beforeSelection.match(/\S/) && newlinesBeforeSelection < 2) {
      newlinesToAppend = repeat('\n', 2 - newlinesBeforeSelection);
    }

    if (afterSelection.match(/\S/) && newlinesAfterSelection < 2) {
      newlinesToPrepend = repeat('\n', 2 - newlinesAfterSelection);
    }

    if (newlinesToAppend == null) {
      newlinesToAppend = '';
    }

    if (newlinesToPrepend == null) {
      newlinesToPrepend = '';
    }

    return { newlinesToAppend: newlinesToAppend, newlinesToPrepend: newlinesToPrepend };
  }

  function blockStyle(textarea, arg) {
    var newlinesToAppend = void 0;
    var newlinesToPrepend = void 0;

    var prefix = arg.prefix,
        suffix = arg.suffix,
        blockPrefix = arg.blockPrefix,
        blockSuffix = arg.blockSuffix,
        replaceNext = arg.replaceNext,
        prefixSpace = arg.prefixSpace,
        scanFor = arg.scanFor,
        surroundWithNewlines = arg.surroundWithNewlines;

    var originalSelectionStart = textarea.selectionStart;
    var originalSelectionEnd = textarea.selectionEnd;

    var selectedText = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
    var prefixToUse = isMultipleLines(selectedText) && blockPrefix.length > 0 ? blockPrefix + '\n' : prefix;
    var suffixToUse = isMultipleLines(selectedText) && blockSuffix.length > 0 ? '\n' + blockSuffix : suffix;

    if (prefixSpace) {
      var beforeSelection = textarea.value[textarea.selectionStart - 1];
      if (textarea.selectionStart !== 0 && beforeSelection != null && !beforeSelection.match(/\s/)) {
        prefixToUse = ' ' + prefixToUse;
      }
    }
    selectedText = expandSelectedText(textarea, prefixToUse, suffixToUse);
    var selectionStart = textarea.selectionStart;
    var selectionEnd = textarea.selectionEnd;
    var hasReplaceNext = replaceNext.length > 0 && suffixToUse.indexOf(replaceNext) > -1 && selectedText.length > 0;
    if (surroundWithNewlines) {
      var ref = newlinesToSurroundSelectedText(textarea);
      newlinesToAppend = ref.newlinesToAppend;
      newlinesToPrepend = ref.newlinesToPrepend;
      prefixToUse = newlinesToAppend + prefix;
      suffixToUse += newlinesToPrepend;
    }

    if (selectedText.startsWith(prefixToUse) && selectedText.endsWith(suffixToUse)) {
      var replacementText = selectedText.slice(prefixToUse.length, selectedText.length - suffixToUse.length);
      if (originalSelectionStart === originalSelectionEnd) {
        var position = originalSelectionStart - prefixToUse.length;
        position = Math.max(position, selectionStart);
        position = Math.min(position, selectionStart + replacementText.length);
        selectionStart = selectionEnd = position;
      } else {
        selectionEnd = selectionStart + replacementText.length;
      }
      return { text: replacementText, selectionStart: selectionStart, selectionEnd: selectionEnd };
    } else if (!hasReplaceNext) {
      var _replacementText = prefixToUse + selectedText + suffixToUse;
      selectionStart = originalSelectionStart + prefixToUse.length;
      selectionEnd = originalSelectionEnd + prefixToUse.length;
      var whitespaceEdges = selectedText.match(/^\s*|\s*$/g);
      if (arg.trimFirst && whitespaceEdges) {
        var leadingWhitespace = whitespaceEdges[0] || '';
        var trailingWhitespace = whitespaceEdges[1] || '';
        _replacementText = leadingWhitespace + prefixToUse + selectedText.trim() + suffixToUse + trailingWhitespace;
        selectionStart += leadingWhitespace.length;
        selectionEnd -= trailingWhitespace.length;
      }
      return { text: _replacementText, selectionStart: selectionStart, selectionEnd: selectionEnd };
    } else if (scanFor.length > 0 && selectedText.match(scanFor)) {
      suffixToUse = suffixToUse.replace(replaceNext, selectedText);
      var _replacementText2 = prefixToUse + suffixToUse;
      selectionStart = selectionEnd = selectionStart + prefixToUse.length;
      return { text: _replacementText2, selectionStart: selectionStart, selectionEnd: selectionEnd };
    } else {
      var _replacementText3 = prefixToUse + selectedText + suffixToUse;
      selectionStart = selectionStart + prefixToUse.length + selectedText.length + suffixToUse.indexOf(replaceNext);
      selectionEnd = selectionStart + replaceNext.length;
      return { text: _replacementText3, selectionStart: selectionStart, selectionEnd: selectionEnd };
    }
  }

  function multilineStyle(textarea, arg) {
    var prefix = arg.prefix,
        suffix = arg.suffix,
        surroundWithNewlines = arg.surroundWithNewlines;

    var text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
    var selectionStart = textarea.selectionStart;
    var selectionEnd = textarea.selectionEnd;
    var lines = text.split('\n');
    var undoStyle = lines.every(function (line) {
      return line.startsWith(prefix) && line.endsWith(suffix);
    });

    if (undoStyle) {
      text = lines.map(function (line) {
        return line.slice(prefix.length, line.length - suffix.length);
      }).join('\n');
      selectionEnd = selectionStart + text.length;
    } else {
      text = lines.map(function (line) {
        return prefix + line + suffix;
      }).join('\n');
      if (surroundWithNewlines) {
        var _newlinesToSurroundSe = newlinesToSurroundSelectedText(textarea),
            _newlinesToAppend = _newlinesToSurroundSe.newlinesToAppend,
            _newlinesToPrepend = _newlinesToSurroundSe.newlinesToPrepend;

        selectionStart += _newlinesToAppend.length;
        selectionEnd = selectionStart + text.length;
        text = _newlinesToAppend + text + _newlinesToPrepend;
      }
    }

    return { text: text, selectionStart: selectionStart, selectionEnd: selectionEnd };
  }

  function orderedList(textarea) {
    var orderedListRegex = /^\d+\.\s+/;
    var selectionEnd = void 0;
    var selectionStart = void 0;
    var text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
    var lines = text.split('\n');

    var undoStyling = lines.every(function (line) {
      return orderedListRegex.test(line);
    });

    if (undoStyling) {
      lines = lines.map(function (line) {
        return line.replace(orderedListRegex, '');
      });
      text = lines.join('\n');
    } else {
      lines = function () {
        var i = void 0;
        var len = void 0;
        var index = void 0;
        var results = [];
        for (index = i = 0, len = lines.length; i < len; index = ++i) {
          var line = lines[index];
          results.push(index + 1 + '. ' + line);
        }
        return results;
      }();
      text = lines.join('\n');

      var _newlinesToSurroundSe2 = newlinesToSurroundSelectedText(textarea),
          _newlinesToAppend2 = _newlinesToSurroundSe2.newlinesToAppend,
          _newlinesToPrepend2 = _newlinesToSurroundSe2.newlinesToPrepend;

      selectionStart = textarea.selectionStart + _newlinesToAppend2.length;
      selectionEnd = selectionStart + text.length;
      text = _newlinesToAppend2 + text + _newlinesToPrepend2;
    }

    return { text: text, selectionStart: selectionStart, selectionEnd: selectionEnd };
  }

  function applyStyle(button, styles) {
    var toolbar = button.closest('markdown-toolbar');
    if (!(toolbar instanceof MarkdownToolbarElement)) return;

    var defaults = {
      prefix: '',
      suffix: '',
      blockPrefix: '',
      blockSuffix: '',
      multiline: false,
      replaceNext: '',
      prefixSpace: false,
      scanFor: '',
      surroundWithNewlines: false,
      orderedList: false,
      trimFirst: false
    };

    var style = _extends({}, defaults, styles);

    var field = toolbar.field;
    if (field) {
      field.focus();
      styleSelectedText(field, style);
    }
  }

  MarkdownToolbarElement.insertText = insertText;
  MarkdownToolbarElement.newlinesToSurroundSelectedText = newlinesToSurroundSelectedText;

  exports.default = MarkdownToolbarElement;
});
