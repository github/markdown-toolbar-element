declare global {
  interface Window {
    MarkdownToolbarElement: typeof MarkdownToolbarElement
    MarkdownHeaderButtonElement: typeof MarkdownHeaderButtonElement
    MarkdownBoldButtonElement: typeof MarkdownBoldButtonElement
    MarkdownItalicButtonElement: typeof MarkdownItalicButtonElement
    MarkdownQuoteButtonElement: typeof MarkdownQuoteButtonElement
    MarkdownCodeButtonElement: typeof MarkdownCodeButtonElement
    MarkdownLinkButtonElement: typeof MarkdownLinkButtonElement
    MarkdownImageButtonElement: typeof MarkdownImageButtonElement
    MarkdownUnorderedListButtonElement: typeof MarkdownUnorderedListButtonElement
    MarkdownOrderedListButtonElement: typeof MarkdownOrderedListButtonElement
    MarkdownTaskListButtonElement: typeof MarkdownTaskListButtonElement
    MarkdownMentionButtonElement: typeof MarkdownMentionButtonElement
    MarkdownRefButtonElement: typeof MarkdownRefButtonElement
    MarkdownStrikethroughButtonElement: typeof MarkdownStrikethroughButtonElement
  }
  interface HTMLElementTagNameMap {
    'markdown-toolbar': MarkdownToolbarElement
    'md-header': MarkdownHeaderButtonElement
    'md-bold': MarkdownBoldButtonElement
    'md-italic': MarkdownItalicButtonElement
    'md-quote': MarkdownQuoteButtonElement
    'md-code': MarkdownCodeButtonElement
    'md-link': MarkdownLinkButtonElement
    'md-image': MarkdownImageButtonElement
    'md-unordered-list': MarkdownUnorderedListButtonElement
    'md-ordered-list': MarkdownOrderedListButtonElement
    'md-task-list': MarkdownTaskListButtonElement
    'md-mention': MarkdownMentionButtonElement
    'md-ref': MarkdownRefButtonElement
    'md-strikethrough': MarkdownStrikethroughButtonElement
  }
}

const buttonSelectors = [
  '[data-md-button]',
  'md-header',
  'md-bold',
  'md-italic',
  'md-quote',
  'md-code',
  'md-link',
  'md-image',
  'md-unordered-list',
  'md-ordered-list',
  'md-task-list',
  'md-mention',
  'md-ref',
  'md-strikethrough'
]
function getButtons(toolbar: Element): HTMLElement[] {
  const els = []
  for (const button of toolbar.querySelectorAll<HTMLElement>(buttonSelectors.join(', '))) {
    // Skip buttons that are hidden, either via `hidden` attribute or CSS:
    if (button.hidden || (button.offsetWidth <= 0 && button.offsetHeight <= 0)) continue
    if (button.closest('markdown-toolbar') === toolbar) els.push(button)
  }
  return els
}

function keydown(fn: (event: KeyboardEvent) => void): (event: KeyboardEvent) => void {
  return function (event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      fn(event)
    }
  }
}

type Style = {
  prefix?: string
  suffix?: string
  trimFirst?: boolean
  multiline?: boolean
  surroundWithNewlines?: boolean
  blockPrefix?: string
  blockSuffix?: string
  replaceNext?: string
  scanFor?: string
  orderedList?: boolean
  prefixSpace?: boolean
}

const styles = new WeakMap<Element, Style>()

class MarkdownButtonElement extends HTMLElement {
  constructor() {
    super()
    const apply = () => {
      const style = styles.get(this)
      if (!style) return
      applyStyle(this, style)
    }
    this.addEventListener('keydown', keydown(apply))
    this.addEventListener('click', apply)
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }
  }

  click() {
    const style = styles.get(this)
    if (!style) return
    applyStyle(this, style)
  }
}

class MarkdownHeaderButtonElement extends MarkdownButtonElement {
  constructor() {
    super()

    const level = parseInt(this.getAttribute('level') || '3', 10)
    if (level < 1 || level > 6) {
      return
    }

    const prefix = `${'#'.repeat(level)} `
    styles.set(this, {
      prefix
    })
  }
}

if (!window.customElements.get('md-header')) {
  window.MarkdownHeaderButtonElement = MarkdownHeaderButtonElement
  window.customElements.define('md-header', MarkdownHeaderButtonElement)
}

class MarkdownBoldButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '**', suffix: '**', trimFirst: true})
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('hotkey', 'b')
  }
}

if (!window.customElements.get('md-bold')) {
  window.MarkdownBoldButtonElement = MarkdownBoldButtonElement
  window.customElements.define('md-bold', MarkdownBoldButtonElement)
}

class MarkdownItalicButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '_', suffix: '_', trimFirst: true})
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('hotkey', 'i')
  }
}

if (!window.customElements.get('md-italic')) {
  window.MarkdownItalicButtonElement = MarkdownItalicButtonElement
  window.customElements.define('md-italic', MarkdownItalicButtonElement)
}

class MarkdownQuoteButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '> ', multiline: true, surroundWithNewlines: true})
  }
}

if (!window.customElements.get('md-quote')) {
  window.MarkdownQuoteButtonElement = MarkdownQuoteButtonElement
  window.customElements.define('md-quote', MarkdownQuoteButtonElement)
}

class MarkdownCodeButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '`', suffix: '`', blockPrefix: '```', blockSuffix: '```'})
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('hotkey', 'e')
  }
}

if (!window.customElements.get('md-code')) {
  window.MarkdownCodeButtonElement = MarkdownCodeButtonElement
  window.customElements.define('md-code', MarkdownCodeButtonElement)
}

class MarkdownLinkButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '[', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://'})
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('hotkey', 'k')
  }
}

if (!window.customElements.get('md-link')) {
  window.MarkdownLinkButtonElement = MarkdownLinkButtonElement
  window.customElements.define('md-link', MarkdownLinkButtonElement)
}

class MarkdownImageButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '![', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://'})
  }
}

if (!window.customElements.get('md-image')) {
  window.MarkdownImageButtonElement = MarkdownImageButtonElement
  window.customElements.define('md-image', MarkdownImageButtonElement)
}

class MarkdownUnorderedListButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '- ', multiline: true, surroundWithNewlines: true})
  }
}

if (!window.customElements.get('md-unordered-list')) {
  window.MarkdownUnorderedListButtonElement = MarkdownUnorderedListButtonElement
  window.customElements.define('md-unordered-list', MarkdownUnorderedListButtonElement)
}

class MarkdownOrderedListButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '1. ', multiline: true, orderedList: true})
  }
}

if (!window.customElements.get('md-ordered-list')) {
  window.MarkdownOrderedListButtonElement = MarkdownOrderedListButtonElement
  window.customElements.define('md-ordered-list', MarkdownOrderedListButtonElement)
}

class MarkdownTaskListButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '- [ ] ', multiline: true, surroundWithNewlines: true})
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('hotkey', 'L')
  }
}

if (!window.customElements.get('md-task-list')) {
  window.MarkdownTaskListButtonElement = MarkdownTaskListButtonElement
  window.customElements.define('md-task-list', MarkdownTaskListButtonElement)
}

class MarkdownMentionButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '@', prefixSpace: true})
  }
}

if (!window.customElements.get('md-mention')) {
  window.MarkdownMentionButtonElement = MarkdownMentionButtonElement
  window.customElements.define('md-mention', MarkdownMentionButtonElement)
}

class MarkdownRefButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '#', prefixSpace: true})
  }
}

if (!window.customElements.get('md-ref')) {
  window.MarkdownRefButtonElement = MarkdownRefButtonElement
  window.customElements.define('md-ref', MarkdownRefButtonElement)
}

class MarkdownStrikethroughButtonElement extends MarkdownButtonElement {
  constructor() {
    super()
    styles.set(this, {prefix: '~~', suffix: '~~', trimFirst: true})
  }
}

if (!window.customElements.get('md-strikethrough')) {
  window.MarkdownStrikethroughButtonElement = MarkdownStrikethroughButtonElement
  window.customElements.define('md-strikethrough', MarkdownStrikethroughButtonElement)
}

const modifierKey = navigator.userAgent.match(/Macintosh/) ? 'Meta' : 'Control'

class MarkdownToolbarElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback(): void {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'toolbar')
    }
    this.addEventListener('keydown', focusKeydown)
    const fn = shortcut.bind(null, this)
    if (this.field) {
      this.field.addEventListener('keydown', fn)
      shortcutListeners.set(this, fn)
    }
    this.setAttribute('tabindex', '0')
    this.addEventListener('focus', onToolbarFocus, {once: true})
  }

  disconnectedCallback(): void {
    const fn = shortcutListeners.get(this)
    if (fn && this.field) {
      this.field.removeEventListener('keydown', fn)
      shortcutListeners.delete(this)
    }
    this.removeEventListener('keydown', focusKeydown)
  }

  get field(): HTMLTextAreaElement | null {
    const id = this.getAttribute('for')
    if (!id) return null
    const root = 'getRootNode' in this ? this.getRootNode() : document
    let field
    if (root instanceof Document || root instanceof ShadowRoot) {
      field = root.getElementById(id)
    }
    return field instanceof HTMLTextAreaElement ? field : null
  }
}

function onToolbarFocus({target}: FocusEvent) {
  if (!(target instanceof Element)) return
  target.removeAttribute('tabindex')
  let tabindex = '0'
  for (const button of getButtons(target)) {
    button.setAttribute('tabindex', tabindex)
    if (tabindex === '0') {
      button.focus()
      tabindex = '-1'
    }
  }
}

function focusKeydown(event: KeyboardEvent) {
  const key = event.key
  if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return
  const toolbar = event.currentTarget
  if (!(toolbar instanceof HTMLElement)) return
  const buttons = getButtons(toolbar)
  const index = buttons.indexOf(event.target as HTMLElement)
  const length = buttons.length
  if (index === -1) return

  let n = 0
  if (key === 'ArrowLeft') n = index - 1
  if (key === 'ArrowRight') n = index + 1
  if (key === 'End') n = length - 1
  if (n < 0) n = length - 1
  if (n > length - 1) n = 0

  for (let i = 0; i < length; i += 1) {
    buttons[i].setAttribute('tabindex', i === n ? '0' : '-1')
  }

  // Need to stop home/end scrolling:
  event.preventDefault()

  buttons[n].focus()
}

const shortcutListeners = new WeakMap()

function findHotkey(toolbar: Element, key: string): HTMLElement | null {
  for (const el of toolbar.querySelectorAll<HTMLElement>('[hotkey]')) {
    if (el.getAttribute('hotkey') === key) {
      return el
    }
  }
  return null
}

function shortcut(toolbar: Element, event: KeyboardEvent) {
  if ((event.metaKey && modifierKey === 'Meta') || (event.ctrlKey && modifierKey === 'Control')) {
    const key = event.shiftKey ? event.key.toUpperCase() : event.key
    const button = findHotkey(toolbar, key)
    if (button) {
      button.click()
      event.preventDefault()
    }
  }
}

if (!window.customElements.get('markdown-toolbar')) {
  window.MarkdownToolbarElement = MarkdownToolbarElement
  window.customElements.define('markdown-toolbar', MarkdownToolbarElement)
}

function isMultipleLines(string: string): boolean {
  return string.trim().split('\n').length > 1
}

function repeat(string: string, n: number): string {
  return Array(n + 1).join(string)
}

function wordSelectionStart(text: string, i: number): number {
  let index = i
  while (text[index] && text[index - 1] != null && !text[index - 1].match(/\s/)) {
    index--
  }
  return index
}

function wordSelectionEnd(text: string, i: number, multiline: boolean): number {
  let index = i
  const breakpoint = multiline ? /\n/ : /\s/
  while (text[index] && !text[index].match(breakpoint)) {
    index++
  }
  return index
}

let canInsertText: boolean | null = null

function insertText(textarea: HTMLTextAreaElement, {text, selectionStart, selectionEnd}: SelectionRange) {
  const originalSelectionStart = textarea.selectionStart
  const before = textarea.value.slice(0, originalSelectionStart)
  const after = textarea.value.slice(textarea.selectionEnd)

  if (canInsertText === null || canInsertText === true) {
    textarea.contentEditable = 'true'
    try {
      canInsertText = document.execCommand('insertText', false, text)
    } catch (error) {
      canInsertText = false
    }
    textarea.contentEditable = 'false'
  }

  if (canInsertText && !textarea.value.slice(0, textarea.selectionStart).endsWith(text)) {
    canInsertText = false
  }

  if (!canInsertText) {
    try {
      document.execCommand('ms-beginUndoUnit')
    } catch (e) {
      // Do nothing.
    }
    textarea.value = before + text + after
    try {
      document.execCommand('ms-endUndoUnit')
    } catch (e) {
      // Do nothing.
    }
    textarea.dispatchEvent(new CustomEvent('input', {bubbles: true, cancelable: true}))
  }

  if (selectionStart != null && selectionEnd != null) {
    textarea.setSelectionRange(selectionStart, selectionEnd)
  } else {
    textarea.setSelectionRange(originalSelectionStart, textarea.selectionEnd)
  }
}

function styleSelectedText(textarea: HTMLTextAreaElement, styleArgs: StyleArgs) {
  const text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)

  let result
  if (styleArgs.orderedList) {
    result = orderedList(textarea)
  } else if (styleArgs.multiline && isMultipleLines(text)) {
    result = multilineStyle(textarea, styleArgs)
  } else {
    result = blockStyle(textarea, styleArgs)
  }

  insertText(textarea, result)
}

function expandSelectedText(
  textarea: HTMLTextAreaElement,
  prefixToUse: string,
  suffixToUse: string,
  multiline = false
): string {
  if (textarea.selectionStart === textarea.selectionEnd) {
    textarea.selectionStart = wordSelectionStart(textarea.value, textarea.selectionStart)
    textarea.selectionEnd = wordSelectionEnd(textarea.value, textarea.selectionEnd, multiline)
  } else {
    const expandedSelectionStart = textarea.selectionStart - prefixToUse.length
    const expandedSelectionEnd = textarea.selectionEnd + suffixToUse.length
    const beginsWithPrefix = textarea.value.slice(expandedSelectionStart, textarea.selectionStart) === prefixToUse
    const endsWithSuffix = textarea.value.slice(textarea.selectionEnd, expandedSelectionEnd) === suffixToUse
    if (beginsWithPrefix && endsWithSuffix) {
      textarea.selectionStart = expandedSelectionStart
      textarea.selectionEnd = expandedSelectionEnd
    }
  }
  return textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
}

interface Newlines {
  newlinesToAppend: string
  newlinesToPrepend: string
}

function newlinesToSurroundSelectedText(textarea: HTMLTextAreaElement): Newlines {
  const beforeSelection = textarea.value.slice(0, textarea.selectionStart)
  const afterSelection = textarea.value.slice(textarea.selectionEnd)

  const breaksBefore = beforeSelection.match(/\n*$/)
  const breaksAfter = afterSelection.match(/^\n*/)
  const newlinesBeforeSelection = breaksBefore ? breaksBefore[0].length : 0
  const newlinesAfterSelection = breaksAfter ? breaksAfter[0].length : 0

  let newlinesToAppend
  let newlinesToPrepend

  if (beforeSelection.match(/\S/) && newlinesBeforeSelection < 2) {
    newlinesToAppend = repeat('\n', 2 - newlinesBeforeSelection)
  }

  if (afterSelection.match(/\S/) && newlinesAfterSelection < 2) {
    newlinesToPrepend = repeat('\n', 2 - newlinesAfterSelection)
  }

  if (newlinesToAppend == null) {
    newlinesToAppend = ''
  }

  if (newlinesToPrepend == null) {
    newlinesToPrepend = ''
  }

  return {newlinesToAppend, newlinesToPrepend}
}

interface SelectionRange {
  text: string
  selectionStart: number | undefined
  selectionEnd: number | undefined
}

function blockStyle(textarea: HTMLTextAreaElement, arg: StyleArgs): SelectionRange {
  let newlinesToAppend
  let newlinesToPrepend

  const {prefix, suffix, blockPrefix, blockSuffix, replaceNext, prefixSpace, scanFor, surroundWithNewlines} = arg
  const originalSelectionStart = textarea.selectionStart
  const originalSelectionEnd = textarea.selectionEnd

  let selectedText = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
  let prefixToUse = isMultipleLines(selectedText) && blockPrefix.length > 0 ? `${blockPrefix}\n` : prefix
  let suffixToUse = isMultipleLines(selectedText) && blockSuffix.length > 0 ? `\n${blockSuffix}` : suffix

  if (prefixSpace) {
    const beforeSelection = textarea.value[textarea.selectionStart - 1]
    if (textarea.selectionStart !== 0 && beforeSelection != null && !beforeSelection.match(/\s/)) {
      prefixToUse = ` ${prefixToUse}`
    }
  }
  selectedText = expandSelectedText(textarea, prefixToUse, suffixToUse, arg.multiline)
  let selectionStart = textarea.selectionStart
  let selectionEnd = textarea.selectionEnd
  const hasReplaceNext = replaceNext.length > 0 && suffixToUse.indexOf(replaceNext) > -1 && selectedText.length > 0
  if (surroundWithNewlines) {
    const ref = newlinesToSurroundSelectedText(textarea)
    newlinesToAppend = ref.newlinesToAppend
    newlinesToPrepend = ref.newlinesToPrepend
    prefixToUse = newlinesToAppend + prefix
    suffixToUse += newlinesToPrepend
  }

  if (selectedText.startsWith(prefixToUse) && selectedText.endsWith(suffixToUse)) {
    const replacementText = selectedText.slice(prefixToUse.length, selectedText.length - suffixToUse.length)
    if (originalSelectionStart === originalSelectionEnd) {
      let position = originalSelectionStart - prefixToUse.length
      position = Math.max(position, selectionStart)
      position = Math.min(position, selectionStart + replacementText.length)
      selectionStart = selectionEnd = position
    } else {
      selectionEnd = selectionStart + replacementText.length
    }
    return {text: replacementText, selectionStart, selectionEnd}
  } else if (!hasReplaceNext) {
    let replacementText = prefixToUse + selectedText + suffixToUse
    selectionStart = originalSelectionStart + prefixToUse.length
    selectionEnd = originalSelectionEnd + prefixToUse.length
    const whitespaceEdges = selectedText.match(/^\s*|\s*$/g)
    if (arg.trimFirst && whitespaceEdges) {
      const leadingWhitespace = whitespaceEdges[0] || ''
      const trailingWhitespace = whitespaceEdges[1] || ''
      replacementText = leadingWhitespace + prefixToUse + selectedText.trim() + suffixToUse + trailingWhitespace
      selectionStart += leadingWhitespace.length
      selectionEnd -= trailingWhitespace.length
    }
    return {text: replacementText, selectionStart, selectionEnd}
  } else if (scanFor.length > 0 && selectedText.match(scanFor)) {
    suffixToUse = suffixToUse.replace(replaceNext, selectedText)
    const replacementText = prefixToUse + suffixToUse
    selectionStart = selectionEnd = selectionStart + prefixToUse.length
    return {text: replacementText, selectionStart, selectionEnd}
  } else {
    const replacementText = prefixToUse + selectedText + suffixToUse
    selectionStart = selectionStart + prefixToUse.length + selectedText.length + suffixToUse.indexOf(replaceNext)
    selectionEnd = selectionStart + replaceNext.length
    return {text: replacementText, selectionStart, selectionEnd}
  }
}

function multilineStyle(textarea: HTMLTextAreaElement, arg: StyleArgs) {
  const {prefix, suffix, surroundWithNewlines} = arg
  let text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
  let selectionStart = textarea.selectionStart
  let selectionEnd = textarea.selectionEnd
  const lines = text.split('\n')
  const undoStyle = lines.every(line => line.startsWith(prefix) && line.endsWith(suffix))

  if (undoStyle) {
    text = lines.map(line => line.slice(prefix.length, line.length - suffix.length)).join('\n')
    selectionEnd = selectionStart + text.length
  } else {
    text = lines.map(line => prefix + line + suffix).join('\n')
    if (surroundWithNewlines) {
      const {newlinesToAppend, newlinesToPrepend} = newlinesToSurroundSelectedText(textarea)
      selectionStart += newlinesToAppend.length
      selectionEnd = selectionStart + text.length
      text = newlinesToAppend + text + newlinesToPrepend
    }
  }

  return {text, selectionStart, selectionEnd}
}

function orderedList(textarea: HTMLTextAreaElement): SelectionRange {
  const orderedListRegex = /^\d+\.\s+/
  const noInitialSelection = textarea.selectionStart === textarea.selectionEnd
  let selectionEnd
  let selectionStart
  let text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
  let textToUnstyle = text
  let lines = text.split('\n')
  let startOfLine, endOfLine
  if (noInitialSelection) {
    const linesBefore = textarea.value.slice(0, textarea.selectionStart).split(/\n/)
    startOfLine = textarea.selectionStart - linesBefore[linesBefore.length - 1].length
    endOfLine = wordSelectionEnd(textarea.value, textarea.selectionStart, true)
    textToUnstyle = textarea.value.slice(startOfLine, endOfLine)
  }
  const linesToUnstyle = textToUnstyle.split('\n')
  const undoStyling = linesToUnstyle.every(line => orderedListRegex.test(line))

  if (undoStyling) {
    lines = linesToUnstyle.map(line => line.replace(orderedListRegex, ''))
    text = lines.join('\n')
    if (noInitialSelection && startOfLine && endOfLine) {
      const lengthDiff = linesToUnstyle[0].length - lines[0].length
      selectionStart = selectionEnd = textarea.selectionStart - lengthDiff
      textarea.selectionStart = startOfLine
      textarea.selectionEnd = endOfLine
    }
  } else {
    lines = numberedLines(lines)
    text = lines.join('\n')
    const {newlinesToAppend, newlinesToPrepend} = newlinesToSurroundSelectedText(textarea)
    selectionStart = textarea.selectionStart + newlinesToAppend.length
    selectionEnd = selectionStart + text.length
    if (noInitialSelection) selectionStart = selectionEnd
    text = newlinesToAppend + text + newlinesToPrepend
  }

  return {text, selectionStart, selectionEnd}
}

interface StyleArgs {
  prefix: string
  suffix: string
  blockPrefix: string
  blockSuffix: string
  multiline: boolean
  replaceNext: string
  prefixSpace: boolean
  scanFor: string
  surroundWithNewlines: boolean
  orderedList: boolean
  trimFirst: boolean
}

function numberedLines(lines: string[]) {
  let i
  let len
  let index
  const results = []
  for (index = i = 0, len = lines.length; i < len; index = ++i) {
    const line = lines[index]
    results.push(`${index + 1}. ${line}`)
  }
  return results
}

function applyStyle(button: Element, stylesToApply: Style) {
  const toolbar = button.closest('markdown-toolbar')
  if (!(toolbar instanceof MarkdownToolbarElement)) return

  const defaults = {
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
  }

  const style = {...defaults, ...stylesToApply}

  const field = toolbar.field
  if (field) {
    field.focus()
    styleSelectedText(field, style)
  }
}

export default MarkdownToolbarElement
