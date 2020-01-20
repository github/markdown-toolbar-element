export default class MarkdownToolbarElement extends HTMLElement {
  readonly field: HTMLTextAreaElement | undefined | null;
}

declare global {
  interface Window {
    MarkdownToolbarElement: typeof MarkdownToolbarElement
  }
  interface HTMLElementTagNameMap {
    'markdown-toolbar': MarkdownToolbarElement
  }
}