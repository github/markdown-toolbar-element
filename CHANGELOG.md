# Changelog

- We use [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
- Mark breaking changes with `BREAKING:`. Be sure to include instructions on
  how applications should be upgraded.
- Include a link to your pull request.
- Don't include changes that are purely internal. The CHANGELOG should be a
  useful summary for people upgrading their application, not a replication
  of the commit log.

## 0.2.0

- Update link button to render email markdown (PR #8)
- Expose `insertText` and `newlinesToSurroundSelectedText` as public (PR #4)
- Fix ordered and unordered list injector (PR #3)
- Remove `contenteditable` attribute as it blocks users from editing the textarea after injecting markdown on IE11 (PR #2)
- Add the following govpseak injectors: H2, H3, H4, CTA (call to action), email and address (PR #1)

## 0.1.0

- Initial release forked from [github/markdown-toolbar-element](https://github.com/github/markdown-toolbar-element/releases/tag/v0.1.0)
