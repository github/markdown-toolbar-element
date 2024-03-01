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
  unorderedList?: boolean
  prefixSpace?: boolean
}

const styles = new WeakMap<Element, Style>()
const manualStyles = {
  'header-1': {prefix: '# '},
  'header-2': {prefix: '## '},
  'header-3': {prefix: '### '},
  'header-4': {prefix: '#### '},
  'header-5': {prefix: '##### '},
  'header-6': {prefix: '###### '},
  bold: {prefix: '**', suffix: '**', trimFirst: true},
  italic: {prefix: '_', suffix: '_', trimFirst: true},
  quote: {prefix: '> ', multiline: true, surroundWithNewlines: true},
  code: {
    prefix: '`',
    suffix: '`',
    blockPrefix: '```',
    blockSuffix: '```'
  },
  link: {prefix: '[', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://'},
  image: {prefix: '![', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://'},
  'unordered-list': {
    prefix: '- ',
    multiline: true,
    unorderedList: true
  },
  'ordered-list': {
    prefix: '1. ',
    multiline: true,
    orderedList: true
  },
  'task-list': {prefix: '- [ ] ', multiline: true, surroundWithNewlines: true},
  mention: {prefix: '@', prefixSpace: true},
  ref: {prefix: '#', prefixSpace: true},
  strikethrough: {prefix: '~~', suffix: '~~', trimFirst: true}
} as const

class MarkdownButtonElement extends HTMLElement {
  constructor() {
    super()
    const apply = (event: Event) => {
      const style = styles.get(this)
      if (!style) return
      event.preventDefault()
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
  connectedCallback() {
    const level = parseInt(this.getAttribute('level') || '3', 10)
    this.#setLevelStyle(level)
  }

  static get observedAttributes() {
    return ['level']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name !== 'level') return
    const level = parseInt(newValue || '3', 10)
    this.#setLevelStyle(level)
  }

  #setLevelStyle(level: number) {
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
  connectedCallback() {
    styles.set(this, {prefix: '**', suffix: '**', trimFirst: true})
  }
}

if (!window.customElements.get('md-bold')) {
  window.MarkdownBoldButtonElement = MarkdownBoldButtonElement
  window.customElements.define('md-bold', MarkdownBoldButtonElement)
}

class MarkdownItalicButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '_', suffix: '_', trimFirst: true})
  }
}

if (!window.customElements.get('md-italic')) {
  window.MarkdownItalicButtonElement = MarkdownItalicButtonElement
  window.customElements.define('md-italic', MarkdownItalicButtonElement)
}

class MarkdownQuoteButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '> ', multiline: true, surroundWithNewlines: true})
  }
}

if (!window.customElements.get('md-quote')) {
  window.MarkdownQuoteButtonElement = MarkdownQuoteButtonElement
  window.customElements.define('md-quote', MarkdownQuoteButtonElement)
}

class MarkdownCodeButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '`', suffix: '`', blockPrefix: '```', blockSuffix: '```'})
  }
}

if (!window.customElements.get('md-code')) {
  window.MarkdownCodeButtonElement = MarkdownCodeButtonElement
  window.customElements.define('md-code', MarkdownCodeButtonElement)
}

class MarkdownLinkButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '[', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://'})
  }
}

if (!window.customElements.get('md-link')) {
  window.MarkdownLinkButtonElement = MarkdownLinkButtonElement
  window.customElements.define('md-link', MarkdownLinkButtonElement)
}

class MarkdownImageButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '![', suffix: '](url)', replaceNext: 'url', scanFor: 'https?://'})
  }
}

if (!window.customElements.get('md-image')) {
  window.MarkdownImageButtonElement = MarkdownImageButtonElement
  window.customElements.define('md-image', MarkdownImageButtonElement)
}

class MarkdownUnorderedListButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '- ', multiline: true, unorderedList: true})
  }
}

if (!window.customElements.get('md-unordered-list')) {
  window.MarkdownUnorderedListButtonElement = MarkdownUnorderedListButtonElement
  window.customElements.define('md-unordered-list', MarkdownUnorderedListButtonElement)
}

class MarkdownOrderedListButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '1. ', multiline: true, orderedList: true})
  }
}

if (!window.customElements.get('md-ordered-list')) {
  window.MarkdownOrderedListButtonElement = MarkdownOrderedListButtonElement
  window.customElements.define('md-ordered-list', MarkdownOrderedListButtonElement)
}

class MarkdownTaskListButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '- [ ] ', multiline: true, surroundWithNewlines: true})
  }
}

if (!window.customElements.get('md-task-list')) {
  window.MarkdownTaskListButtonElement = MarkdownTaskListButtonElement
  window.customElements.define('md-task-list', MarkdownTaskListButtonElement)
}

class MarkdownMentionButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '@', prefixSpace: true})
  }
}

if (!window.customElements.get('md-mention')) {
  window.MarkdownMentionButtonElement = MarkdownMentionButtonElement
  window.customElements.define('md-mention', MarkdownMentionButtonElement)
}

class MarkdownRefButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '#', prefixSpace: true})
  }
}

if (!window.customElements.get('md-ref')) {
  window.MarkdownRefButtonElement = MarkdownRefButtonElement
  window.customElements.define('md-ref', MarkdownRefButtonElement)
}

class MarkdownStrikethroughButtonElement extends MarkdownButtonElement {
  connectedCallback() {
    styles.set(this, {prefix: '~~', suffix: '~~', trimFirst: true})
  }
}

if (!window.customElements.get('md-strikethrough')) {
  window.MarkdownStrikethroughButtonElement = MarkdownStrikethroughButtonElement
  window.customElements.define('md-strikethrough', MarkdownStrikethroughButtonElement)
}

function applyFromToolbar(event: Event) {
  const {target, currentTarget} = event
  if (!(target instanceof Element)) return
  const mdButton = target.closest('[data-md-button]')
  if (!mdButton || mdButton.closest('markdown-toolbar') !== currentTarget) return
  const mdButtonStyle = mdButton.getAttribute('data-md-button')
  const style = manualStyles[mdButtonStyle as keyof typeof manualStyles]
  if (!style) return
  event.preventDefault()
  applyStyle(target, style)
}

function setFocusManagement(toolbar: MarkdownToolbarElement) {
  toolbar.addEventListener('keydown', focusKeydown)
  toolbar.setAttribute('tabindex', '0')
  toolbar.addEventListener('focus', onToolbarFocus, {once: true})
}

function unsetFocusManagement(toolbar: MarkdownToolbarElement) {
  toolbar.removeEventListener('keydown', focusKeydown)
  toolbar.removeAttribute('tabindex')
  toolbar.removeEventListener('focus', onToolbarFocus)
}

class MarkdownToolbarElement extends HTMLElement {
  static observedAttributes = ['data-no-focus']

  connectedCallback(): void {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'toolbar')
    }
    if (!this.hasAttribute('data-no-focus')) {
      setFocusManagement(this)
    }
    this.addEventListener('keydown', keydown(applyFromToolbar))
    this.addEventListener('click', applyFromToolbar)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name !== 'data-no-focus') return
    if (newValue === null) {
      setFocusManagement(this)
    } else {
      unsetFocusManagement(this)
    }
  }

  disconnectedCallback(): void {
    unsetFocusManagement(this)
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
  if (styleArgs.orderedList || styleArgs.unorderedList) {
    result = listStyle(textarea, styleArgs)
  } else if (styleArgs.multiline && isMultipleLines(text)) {
    result = multilineStyle(textarea, styleArgs)
  } else {
    result = blockStyle(textarea, styleArgs)
  }

  insertText(textarea, result)
}

function expandSelectionToLine(textarea: HTMLTextAreaElement) {
  const lines = textarea.value.split('\n')
  let counter = 0
  for (let index = 0; index < lines.length; index++) {
    const lineLength = lines[index].length + 1
    if (textarea.selectionStart >= counter && textarea.selectionStart < counter + lineLength) {
      textarea.selectionStart = counter
    }
    if (textarea.selectionEnd >= counter && textarea.selectionEnd < counter + lineLength) {
      textarea.selectionEnd = counter + lineLength - 1
    }
    counter += lineLength
  }
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

interface UndoResult {
  text: string
  processed: boolean
}
function undoOrderedListStyle(text: string): UndoResult {
  const lines = text.split('\n')
  const orderedListRegex = /^\d+\.\s+/
  const shouldUndoOrderedList = lines.every(line => orderedListRegex.test(line))
  let result = lines
  if (shouldUndoOrderedList) {
    result = lines.map(line => line.replace(orderedListRegex, ''))
  }

  return {
    text: result.join('\n'),
    processed: shouldUndoOrderedList
  }
}

function undoUnorderedListStyle(text: string): UndoResult {
  const lines = text.split('\n')
  const unorderedListPrefix = '- '
  const shouldUndoUnorderedList = lines.every(line => line.startsWith(unorderedListPrefix))
  let result = lines
  if (shouldUndoUnorderedList) {
    result = lines.map(line => line.slice(unorderedListPrefix.length, line.length))
  }

  return {
    text: result.join('\n'),
    processed: shouldUndoUnorderedList
  }
}

function makePrefix(index: number, unorderedList: boolean): string {
  if (unorderedList) {
    return '- '
  } else {
    return `${index + 1}. `
  }
}

function clearExistingListStyle(style: StyleArgs, selectedText: string): [UndoResult, UndoResult, string] {
  let undoResultOpositeList: UndoResult
  let undoResult: UndoResult
  let pristineText
  if (style.orderedList) {
    undoResult = undoOrderedListStyle(selectedText)
    undoResultOpositeList = undoUnorderedListStyle(undoResult.text)
    pristineText = undoResultOpositeList.text
  } else {
    undoResult = undoUnorderedListStyle(selectedText)
    undoResultOpositeList = undoOrderedListStyle(undoResult.text)
    pristineText = undoResultOpositeList.text
  }
  return [undoResult, undoResultOpositeList, pristineText]
}

function listStyle(textarea: HTMLTextAreaElement, style: StyleArgs): SelectionRange {
  const noInitialSelection = textarea.selectionStart === textarea.selectionEnd
  let selectionStart = textarea.selectionStart
  let selectionEnd = textarea.selectionEnd

  // Select whole line
  expandSelectionToLine(textarea)

  const selectedText = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)

  // If the user intent was to do an undo, we will stop after this.
  // Otherwise, we will still undo to other list type to prevent list stacking
  const [undoResult, undoResultOpositeList, pristineText] = clearExistingListStyle(style, selectedText)

  const prefixedLines = pristineText.split('\n').map((value, index) => {
    return `${makePrefix(index, style.unorderedList)}${value}`
  })

  const totalPrefixLength = prefixedLines.reduce((previousValue, _currentValue, currentIndex) => {
    return previousValue + makePrefix(currentIndex, style.unorderedList).length
  }, 0)

  const totalPrefixLengthOpositeList = prefixedLines.reduce((previousValue, _currentValue, currentIndex) => {
    return previousValue + makePrefix(currentIndex, !style.unorderedList).length
  }, 0)

  if (undoResult.processed) {
    if (noInitialSelection) {
      selectionStart = Math.max(selectionStart - makePrefix(0, style.unorderedList).length, 0)
      selectionEnd = selectionStart
    } else {
      selectionStart = textarea.selectionStart
      selectionEnd = textarea.selectionEnd - totalPrefixLength
    }
    return {text: pristineText, selectionStart, selectionEnd}
  }

  const {newlinesToAppend, newlinesToPrepend} = newlinesToSurroundSelectedText(textarea)
  const text = newlinesToAppend + prefixedLines.join('\n') + newlinesToPrepend

  if (noInitialSelection) {
    selectionStart = Math.max(selectionStart + makePrefix(0, style.unorderedList).length + newlinesToAppend.length, 0)
    selectionEnd = selectionStart
  } else {
    if (undoResultOpositeList.processed) {
      selectionStart = Math.max(textarea.selectionStart + newlinesToAppend.length, 0)
      selectionEnd = textarea.selectionEnd + newlinesToAppend.length + totalPrefixLength - totalPrefixLengthOpositeList
    } else {
      selectionStart = Math.max(textarea.selectionStart + newlinesToAppend.length, 0)
      selectionEnd = textarea.selectionEnd + newlinesToAppend.length + totalPrefixLength
    }
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
  unorderedList: boolean
  trimFirst: boolean
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
    unorderedList: false,
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
