describe('markdown-toolbar-element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('markdown-toolbar')
      assert.equal('MARKDOWN-TOOLBAR', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.MarkdownToolbarElement()
      assert.equal('MARKDOWN-TOOLBAR', el.nodeName)
    })
  })

  describe('in shadow DOM', function () {
    it('finds field and inserts markdown', function () {
      const div = document.createElement('div')
      const shadow = div.attachShadow({mode: 'open'})
      shadow.innerHTML = `<markdown-toolbar for="id"><md-bold>bold</md-bold></markdown-toolbar><textarea id="id"></textarea>`
      document.body.append(div)

      const toolbar = shadow.querySelector('markdown-toolbar')
      assert(toolbar.field, 'textarea is found')

      toolbar.querySelector('md-bold').click()
      assert(toolbar.field.value, '****')
    })
  })

  describe('after tree insertion', function () {
    function focus() {
      const textarea = document.querySelector('textarea')
      const event = document.createEvent('Event')
      event.initEvent('focus', false, true)
      textarea.dispatchEvent(event)
    }

    function pressHotkey(hotkey) {
      const textarea = document.querySelector('textarea')
      const osx = navigator.userAgent.indexOf('Macintosh') !== -1
      const event = document.createEvent('Event')
      event.initEvent('keydown', true, true)
      event.metaKey = osx
      event.ctrlKey = !osx
      event.shiftKey = hotkey === hotkey.toUpperCase()

      // emulate existing osx browser bug
      // https://bugs.webkit.org/show_bug.cgi?id=174782
      event.key = osx ? hotkey.toLowerCase() : hotkey

      textarea.dispatchEvent(event)
    }

    function clickToolbar(selector) {
      const toolbar = document.querySelector('markdown-toolbar')
      toolbar.querySelector(selector).click()
    }

    function visualValue() {
      const textarea = document.querySelector('textarea')
      const before = textarea.value.slice(0, textarea.selectionStart)
      const selection = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
      const after = textarea.value.slice(textarea.selectionEnd)
      if (selection) {
        return `${before}|${selection}|${after}`
      } else {
        return `${before}|${after}`
      }
    }

    function setVisualValue(value) {
      const textarea = document.querySelector('textarea')
      let idx
      const parts = value.split('|', 3)
      textarea.value = parts.join('')
      switch (parts.length) {
        case 2:
          idx = parts[0].length
          textarea.setSelectionRange(idx, idx)
          break
        case 3:
          idx = parts[0].length
          textarea.setSelectionRange(idx, idx + parts[1].length)
          break
      }
    }

    beforeEach(function () {
      const container = document.createElement('div')
      container.innerHTML = `
        <markdown-toolbar for="textarea_id">
          <md-bold>bold</md-bold>
          <md-header>header</md-header>
          <md-header level="1">h1</md-header>
          <div hidden>
            <md-header level="5">h5</md-header>
          </div>
          <md-header level="10">h1</md-header>
          <div data-md-button>Other button</div>
          <md-italic>italic</md-italic>
          <md-strikethrough>strikethrough</md-strikethrough>
          <md-quote>quote</md-quote>
          <md-code>code</md-code>
          <md-link>link</md-link>
          <md-image>image</md-image>
          <md-unordered-list>unordered-list</md-unordered-list>
          <md-ordered-list>ordered-list</md-ordered-list>
          <md-task-list>task-list</md-task-list>
          <md-mention>mention</md-mention>
          <md-ref>ref</md-ref>
        </markdown-toolbar>
        <textarea id="textarea_id"></textarea>
      `
      document.body.append(container)
    })

    afterEach(function () {
      document.body.innerHTML = ''
    })

    describe('focus management', function () {
      function focusFirstButton() {
        const button = document.querySelector('md-bold')
        button.focus()
      }

      function pushKeyOnFocussedButton(key) {
        const event = document.createEvent('Event')
        event.initEvent('keydown', true, true)
        event.key = key
        document.activeElement.dispatchEvent(event)
      }

      function getElementsWithTabindex(index) {
        return [...document.querySelectorAll(`markdown-toolbar [tabindex="${index}"]`)]
      }

      beforeEach(() => {
        document.querySelector('markdown-toolbar').focus()
      })

      it('moves focus to next button when ArrowRight is pressed', function () {
        focusFirstButton()
        pushKeyOnFocussedButton('ArrowRight')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-header')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
        pushKeyOnFocussedButton('ArrowRight')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-header[level="1"]')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
        pushKeyOnFocussedButton('ArrowRight')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-header[level="10"]')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
      })

      it('cycles focus round to last element from first when ArrowLeft is pressed', function () {
        focusFirstButton()
        pushKeyOnFocussedButton('ArrowLeft')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-ref')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
        pushKeyOnFocussedButton('ArrowLeft')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-mention')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
      })

      it('focussed first/last button when Home/End key is pressed', function () {
        focusFirstButton()
        pushKeyOnFocussedButton('End')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-ref')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
        pushKeyOnFocussedButton('End')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-ref')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
        pushKeyOnFocussedButton('Home')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-bold')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
        pushKeyOnFocussedButton('Home')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('md-bold')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
      })

      it('counts `data-md-button` elements in the focussable set', function () {
        focusFirstButton()
        pushKeyOnFocussedButton('ArrowRight')
        pushKeyOnFocussedButton('ArrowRight')
        pushKeyOnFocussedButton('ArrowRight')
        pushKeyOnFocussedButton('ArrowRight')
        assert.equal(getElementsWithTabindex(-1).length, 15)
        assert.deepEqual(getElementsWithTabindex(0), [document.querySelector('div[data-md-button]')])
        assert.deepEqual(getElementsWithTabindex(0), [document.activeElement])
      })
    })

    describe('hotkey case-sensitivity', function () {
      it('does not bold selected text when using the uppercased hotkey', function () {
        focus()
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        pressHotkey('B') // capital `B` instead of lowercase `b`
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })
    })

    describe('bold', function () {
      it('bold selected text when you click the bold icon', function () {
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **|quick|** brown fox jumps over the lazy dog', visualValue())
      })

      it('bolds selected text with hotkey', function () {
        focus()
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        pressHotkey('b')
        assert.equal('The **|quick|** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold empty selection and textarea inserts ** with cursor ready to type inside', function () {
        setVisualValue('|')
        clickToolbar('md-bold')
        assert.equal('**|**', visualValue())
      })

      it('bold empty selection with previous text inserts ** with cursor ready to type inside', function () {
        setVisualValue('The |')
        clickToolbar('md-bold')
        assert.equal('The **|**', visualValue())
      })

      it('bold when there is leading whitespace in selection', function () {
        setVisualValue('|\n \t Hello world|')
        clickToolbar('md-bold')
        assert.equal('\n \t **|Hello world|**', visualValue())
      })

      it('bold when there is trailing whitespace in selection', function () {
        setVisualValue('|Hello world \n|')
        clickToolbar('md-bold')
        assert.equal('**|Hello world|** \n', visualValue())
      })

      it('bold selected word when cursor is at the start of the word', function () {
        setVisualValue('The |quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **|quick** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is in the middle of the word', function () {
        setVisualValue('The qui|ck brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **qui|ck** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is at the end of the word', function () {
        setVisualValue('The quick| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **quick|** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is at the start of the first word', function () {
        setVisualValue('|The quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('**|The** quick brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is in the middle of the first word', function () {
        setVisualValue('T|he quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('**T|he** quick brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is at the end of the first word', function () {
        setVisualValue('The| quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('**The|** quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbolds selected bold inner text when you click the bold icon', function () {
        setVisualValue('The **|quick|** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbolds selected bold outer text when you click the bold icon', function () {
        setVisualValue('The |**quick**| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the start of the word', function () {
        setVisualValue('The **|quick** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is in the middle of the word', function () {
        setVisualValue('The **qui|ck** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The qui|ck brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the end of the word', function () {
        setVisualValue('The **quick|** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is before the bold syntax', function () {
        setVisualValue('The |**quick** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is after the bold syntax', function () {
        setVisualValue('The **quick**| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the start of the first word', function () {
        setVisualValue('**|The** quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('|The quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is in the middle of the first word', function () {
        setVisualValue('**T|he** quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('T|he quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the end of the first word', function () {
        setVisualValue('**The|** quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The| quick brown fox jumps over the lazy dog', visualValue())
      })
    })

    describe('italic', function () {
      it('italicizes selected text when you click the italics icon', function () {
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _|quick|_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicizes selected text with hotkey', function () {
        focus()
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        pressHotkey('i')
        assert.equal('The _|quick|_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicize when there is leading whitespace in selection', function () {
        setVisualValue('|  \nHello world|')
        clickToolbar('md-italic')
        assert.equal('  \n_|Hello world|_', visualValue())
      })

      it('italicize when there is trailing whitespace in selection', function () {
        setVisualValue('|Hello world\n \t|')
        clickToolbar('md-italic')
        assert.equal('_|Hello world|_\n \t', visualValue())
      })

      it('italicize empty selection and textarea inserts * with cursor ready to type inside', function () {
        setVisualValue('|')
        clickToolbar('md-italic')
        assert.equal('_|_', visualValue())
      })

      it('italicize empty selection with previous text inserts * with cursor ready to type inside', function () {
        setVisualValue('The |')
        clickToolbar('md-italic')
        assert.equal('The _|_', visualValue())
      })

      it('italicize selected word when cursor is at the start of the word', function () {
        setVisualValue('The |quick brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _|quick_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicize selected word when cursor is in the middle of the word', function () {
        setVisualValue('The qui|ck brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _qui|ck_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicize selected word when cursor is at the end of the word', function () {
        setVisualValue('The quick| brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _quick|_ brown fox jumps over the lazy dog', visualValue())
      })

      it('unitalicizes selected italic text when you click the italic icon', function () {
        setVisualValue('The _|quick|_ brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })
    })

    describe('strikethrough', function () {
      it('strikes through selected text when you click the strikethrough icon', function () {
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        clickToolbar('md-strikethrough')
        assert.equal('The ~~|quick|~~ brown fox jumps over the lazy dog', visualValue())
      })

      it('strikes through when there is leading whitespace in selection', function () {
        setVisualValue('|  \nHello world|')
        clickToolbar('md-strikethrough')
        assert.equal('  \n~~|Hello world|~~', visualValue())
      })

      it('strikes through when there is trailing whitespace in selection', function () {
        setVisualValue('|Hello world\n \t|')
        clickToolbar('md-strikethrough')
        assert.equal('~~|Hello world|~~\n \t', visualValue())
      })

      it('strikes through empty selection and textarea inserts ~~ with cursor ready to type inside', function () {
        setVisualValue('|')
        clickToolbar('md-strikethrough')
        assert.equal('~~|~~', visualValue())
      })

      it('strikes through empty selection with previous text inserts ~~ with cursor ready to type inside', function () {
        setVisualValue('The |')
        clickToolbar('md-strikethrough')
        assert.equal('The ~~|~~', visualValue())
      })

      it('strikes through selected word when cursor is at the start of the word', function () {
        setVisualValue('The |quick brown fox jumps over the lazy dog')
        clickToolbar('md-strikethrough')
        assert.equal('The ~~|quick~~ brown fox jumps over the lazy dog', visualValue())
      })

      it('strikes through selected word when cursor is in the middle of the word', function () {
        setVisualValue('The qui|ck brown fox jumps over the lazy dog')
        clickToolbar('md-strikethrough')
        assert.equal('The ~~qui|ck~~ brown fox jumps over the lazy dog', visualValue())
      })

      it('strikes through selected word when cursor is at the end of the word', function () {
        setVisualValue('The quick| brown fox jumps over the lazy dog')
        clickToolbar('md-strikethrough')
        assert.equal('The ~~quick|~~ brown fox jumps over the lazy dog', visualValue())
      })

      it('un-strikes through selected struck-through text when you click the strikethrough icon', function () {
        setVisualValue('The ~~|quick|~~ brown fox jumps over the lazy dog')
        clickToolbar('md-strikethrough')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })
    })

    describe('quote level', function () {
      it('inserts selected quoted sample if you click the quote icon', function () {
        setVisualValue('')
        clickToolbar('md-quote')
        assert.equal('> |', visualValue())
      })

      it('quotes the selected text when you click the quote icon', function () {
        setVisualValue('|Butts|\n\nThe quick brown fox jumps over the lazy dog')
        clickToolbar('md-quote')
        assert.equal('> |Butts|\n\nThe quick brown fox jumps over the lazy dog', visualValue())
      })

      it('quotes full line of text when you click the quote icon', function () {
        setVisualValue('|The quick brown fox jumps over the lazy dog')
        clickToolbar('md-quote')
        assert.equal('> |The quick brown fox jumps over the lazy dog', visualValue())
      })

      it('prefixes newlines when quoting an existing line on an existing', function () {
        setVisualValue('The quick brown fox jumps over the lazy dog|Butts|')
        clickToolbar('md-quote')
        assert.equal('The quick brown fox jumps over the lazy dog\n\n> |Butts|', visualValue())
      })

      it('quotes multiple lines when you click the quote icon', function () {
        setVisualValue('|Hey,\n\nThis looks great.\n\nThanks,\nJosh|\n\nEmailed me that last week.')
        clickToolbar('md-quote')
        assert.equal(
          '|> Hey,\n> <TRAILING>\n> This looks great.\n> <TRAILING>\n> Thanks,\n> Josh|\n\nEmailed me that last week.'.replace(
            /<TRAILING>/g,
            ''
          ),
          visualValue()
        )
      })

      it('unquotes multiple lines when you click the quote icon', function () {
        setVisualValue(
          '|> Hey,\n> <TRAILING>\n> This looks great.\n> <TRAILING>\n> Thanks,\n> Josh|\n\nEmailed me that last week.'.replace(
            /<TRAILING>/g,
            ''
          )
        )
        clickToolbar('md-quote')
        assert.equal('|Hey,\n\nThis looks great.\n\nThanks,\nJosh|\n\nEmailed me that last week.', visualValue())
      })
    })

    describe('mention', function () {
      it('inserts @ into an empty text area if you click the mention icon', function () {
        setVisualValue('')
        clickToolbar('md-mention')
        assert.equal('@|', visualValue())
      })

      it('inserts a space before the @ if there is not one before it', function () {
        setVisualValue('butts|')
        clickToolbar('md-mention')
        assert.equal('butts @|', visualValue())
      })

      it('treats any white space like a space', function () {
        setVisualValue('butts\n|')
        clickToolbar('md-mention')
        assert.equal('butts\n@|', visualValue())
      })
    })

    describe('lists', function () {
      it('turns line into list when you click the unordered list icon with selection', function () {
        setVisualValue('One\n|Two|\nThree\n')
        clickToolbar('md-unordered-list')
        assert.equal('One\n\n- |Two|\n\nThree\n', visualValue())
      })

      it('turns line into list when you click the unordered list icon without selection', function () {
        setVisualValue('One\n|Two and two\nThree\n')
        clickToolbar('md-unordered-list')
        assert.equal('One\n\n- |Two and two\n\nThree\n', visualValue())
      })

      it('turns multiple lines into list when you click the unordered list icon', function () {
        setVisualValue('One\n|Two\nThree|\n')
        clickToolbar('md-unordered-list')
        assert.equal('One\n\n|- Two\n- Three|\n', visualValue())
      })

      it('prefixes newlines when a list is created on the last line', function () {
        setVisualValue("Here's a list:|One|")
        clickToolbar('md-unordered-list')
        assert.equal("Here's a list:\n\n- |One|", visualValue())
      })

      it('surrounds list with newlines when a list is created on an existing line', function () {
        setVisualValue("Here's a list:|One|\nThis is text after the list")
        clickToolbar('md-unordered-list')
        assert.equal("Here's a list:\n\n- |One|\n\nThis is text after the list", visualValue())
      })

      it('undo the list when button is clicked again', function () {
        setVisualValue('|Two|')
        clickToolbar('md-unordered-list')
        assert.equal('- |Two|', visualValue())
        clickToolbar('md-unordered-list')
        assert.equal('|Two|', visualValue())
      })

      it('creates ordered list without selection', function () {
        setVisualValue('apple\n|pear\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\n\n1. |\n\npear\nbanana\n', visualValue())
      })

      it('undo an ordered list without selection', function () {
        setVisualValue('apple\n1. |pear\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\n|pear\nbanana\n', visualValue())
      })

      it('undo an ordered list without selection and puts cursor at the right position', function () {
        setVisualValue('apple\n1. pea|r\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\npea|r\nbanana\n', visualValue())
      })

      it('creates ordered list by selecting one line', function () {
        setVisualValue('apple\n|pear|\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\n\n|1. pear|\n\nbanana\n', visualValue())
      })

      it('undo an ordered list by selecting one line', function () {
        setVisualValue('apple\n|1. pear|\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\n|pear|\nbanana\n', visualValue())
      })

      it('creates ordered list with incrementing values by selecting multiple lines', function () {
        setVisualValue('|One\nTwo\nThree|\n')
        clickToolbar('md-ordered-list')
        assert.equal('|1. One\n2. Two\n3. Three|\n', visualValue())
      })

      it('undo an ordered list by selecting multiple styled lines', function () {
        setVisualValue('|1. One\n2. Two\n3. Three|\n')
        clickToolbar('md-ordered-list')
        assert.equal('|One\nTwo\nThree|\n', visualValue())
      })
    })

    describe('code', function () {
      it('surrounds a line with backticks if you click the code icon', function () {
        setVisualValue("|puts 'Hello, world!'|")
        clickToolbar('md-code')
        assert.equal("`|puts 'Hello, world!'|`", visualValue())
      })

      it('surrounds a line with backticks via hotkey', function () {
        focus()
        setVisualValue("|puts 'Hello, world!'|")
        pressHotkey('e')
        assert.equal("`|puts 'Hello, world!'|`", visualValue())
      })

      it('surrounds multiple lines with triple backticks if you click the code icon', function () {
        setVisualValue('|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|')
        clickToolbar('md-code')
        assert.equal('```\n|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|\n```', visualValue())
      })

      it('removes backticks from a line if you click the code icon again', function () {
        setVisualValue("`|puts 'Hello, world!'|`")
        clickToolbar('md-code')
        assert.equal("|puts 'Hello, world!'|", visualValue())
      })

      it('removes triple backticks on multiple lines if you click the code icon', function () {
        setVisualValue('```\n|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|\n```')
        clickToolbar('md-code')
        assert.equal('|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|', visualValue())
      })
    })

    describe('links', function () {
      it('inserts link syntax with cursor in description', function () {
        setVisualValue('|')
        clickToolbar('md-link')
        assert.equal('[|](url)', visualValue())
      })

      it('selected url is wrapped in link syntax with cursor in description', function () {
        setVisualValue("GitHub's homepage is |https://github.com/|")
        clickToolbar('md-link')
        assert.equal("GitHub's homepage is [|](https://github.com/)", visualValue())
      })

      it('cursor on url is wrapped in link syntax with cursor in description', function () {
        setVisualValue("GitHub's homepage is https://git|hub.com/")
        clickToolbar('md-link')
        assert.equal("GitHub's homepage is [|](https://github.com/)", visualValue())
      })

      it('selected plan text is wrapped in link syntax with cursor in url', function () {
        setVisualValue("GitHub's |homepage|")
        clickToolbar('md-link')
        assert.equal("GitHub's [homepage](|url|)", visualValue())
      })
    })

    describe('images', function () {
      it('inserts image syntax with cursor in description', function () {
        setVisualValue('|')
        clickToolbar('md-image')
        assert.equal('![|](url)', visualValue())
      })

      it('selected url is wrapped in image syntax with cursor in description', function () {
        setVisualValue('Octocat is |https://octodex.github.com/images/original.png|')
        clickToolbar('md-image')
        assert.equal('Octocat is ![|](https://octodex.github.com/images/original.png)', visualValue())
      })

      it('cursor on url is wrapped in image syntax with cursor in description', function () {
        setVisualValue('Octocat is https://octodex.git|hub.com/images/original.png')
        clickToolbar('md-image')
        assert.equal('Octocat is ![|](https://octodex.github.com/images/original.png)', visualValue())
      })

      it('selected plan text is wrapped in image syntax with cursor in url', function () {
        setVisualValue("GitHub's |logo|")
        clickToolbar('md-image')
        assert.equal("GitHub's ![logo](|url|)", visualValue())
      })
    })

    describe('header', function () {
      it('inserts header syntax with cursor in description', function () {
        setVisualValue('|title|')
        clickToolbar('md-header')
        assert.equal('### |title|', visualValue())
      })

      it('inserts header 1 syntax with cursor in description', function () {
        setVisualValue('|title|')
        clickToolbar('md-header[level="1"]')
        assert.equal('# |title|', visualValue())
      })

      it('does not insert header for invalid level', function () {
        setVisualValue('|title|')
        clickToolbar('md-header[level="10"]')
        assert.equal('|title|', visualValue())
      })
    })
  })
})
