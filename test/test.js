describe('markdown-toolbbar-element', function() {
  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('markdown-toolbar')
      assert.equal('MARKDOWN-TOOLBAR', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.MarkdownToolbarElement()
      assert.equal('MARKDOWN-TOOLBAR', el.nodeName)
    })
  })

  describe('after tree insertion', function() {
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
      event.key = hotkey
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

    beforeEach(function() {
      const container = document.createElement('div')
      container.innerHTML = `
        <markdown-toolbar for="textarea_id">
          <md-bold>bold</md-bold>
          <md-header>header</md-header>
          <md-italic>italic</md-italic>
          <md-quote>quote</md-quote>
          <md-code>code</md-code>
          <md-link>link</md-link>
          <md-img>image</md-img>
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

    afterEach(function() {
      document.body.innerHTML = ''
    })

    describe('bold', function() {
      it('bold selected text when you click the bold icon', function() {
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **|quick|** brown fox jumps over the lazy dog', visualValue())
      })

      it('bolds selected text with hotkey', function() {
        focus()
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        pressHotkey('b')
        assert.equal('The **|quick|** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold empty selection and textarea inserts ** with cursor ready to type inside', function() {
        setVisualValue('|')
        clickToolbar('md-bold')
        assert.equal('**|**', visualValue())
      })

      it('bold empty selection with previous text inserts ** with cursor ready to type inside', function() {
        setVisualValue('The |')
        clickToolbar('md-bold')
        assert.equal('The **|**', visualValue())
      })

      it('bold when there is leading whitespace in selection', function() {
        setVisualValue('|\n \t Hello world|')
        clickToolbar('md-bold')
        assert.equal('\n \t **|Hello world|**', visualValue())
      })

      it('bold when there is trailing whitespace in selection', function() {
        setVisualValue('|Hello world \n|')
        clickToolbar('md-bold')
        assert.equal('**|Hello world|** \n', visualValue())
      })

      it('bold selected word when cursor is at the start of the word', function() {
        setVisualValue('The |quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **|quick** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is in the middle of the word', function() {
        setVisualValue('The qui|ck brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **qui|ck** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is at the end of the word', function() {
        setVisualValue('The quick| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The **quick|** brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is at the start of the first word', function() {
        setVisualValue('|The quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('**|The** quick brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is in the middle of the first word', function() {
        setVisualValue('T|he quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('**T|he** quick brown fox jumps over the lazy dog', visualValue())
      })

      it('bold selected word when cursor is at the end of the first word', function() {
        setVisualValue('The| quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('**The|** quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbolds selected bold inner text when you click the bold icon', function() {
        setVisualValue('The **|quick|** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbolds selected bold outer text when you click the bold icon', function() {
        setVisualValue('The |**quick**| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the start of the word', function() {
        setVisualValue('The **|quick** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is in the middle of the word', function() {
        setVisualValue('The **qui|ck** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The qui|ck brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the end of the word', function() {
        setVisualValue('The **quick|** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is before the bold syntax', function() {
        setVisualValue('The |**quick** brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The |quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is after the bold syntax', function() {
        setVisualValue('The **quick**| brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The quick| brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the start of the first word', function() {
        setVisualValue('**|The** quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('|The quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is in the middle of the first word', function() {
        setVisualValue('**T|he** quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('T|he quick brown fox jumps over the lazy dog', visualValue())
      })

      it('unbold selected word when cursor is at the end of the first word', function() {
        setVisualValue('**The|** quick brown fox jumps over the lazy dog')
        clickToolbar('md-bold')
        assert.equal('The| quick brown fox jumps over the lazy dog', visualValue())
      })
    })

    describe('italic', function() {
      it('italicizes selected text when you click the italics icon', function() {
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _|quick|_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicizes selected text with hotkey', function() {
        focus()
        setVisualValue('The |quick| brown fox jumps over the lazy dog')
        pressHotkey('i')
        assert.equal('The _|quick|_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicize when there is leading whitespace in selection', function() {
        setVisualValue('|  \nHello world|')
        clickToolbar('md-italic')
        assert.equal('  \n_|Hello world|_', visualValue())
      })

      it('italicize when there is trailing whitespace in selection', function() {
        setVisualValue('|Hello world\n \t|')
        clickToolbar('md-italic')
        assert.equal('_|Hello world|_\n \t', visualValue())
      })

      it('italicize empty selection and textarea inserts * with cursor ready to type inside', function() {
        setVisualValue('|')
        clickToolbar('md-italic')
        assert.equal('_|_', visualValue())
      })

      it('italicize empty selection with previous text inserts * with cursor ready to type inside', function() {
        setVisualValue('The |')
        clickToolbar('md-italic')
        assert.equal('The _|_', visualValue())
      })

      it('italicize selected word when cursor is at the start of the word', function() {
        setVisualValue('The |quick brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _|quick_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicize selected word when cursor is in the middle of the word', function() {
        setVisualValue('The qui|ck brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _qui|ck_ brown fox jumps over the lazy dog', visualValue())
      })

      it('italicize selected word when cursor is at the end of the word', function() {
        setVisualValue('The quick| brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The _quick|_ brown fox jumps over the lazy dog', visualValue())
      })

      it('unitalicizes selected italic text when you click the italic icon', function() {
        setVisualValue('The _|quick|_ brown fox jumps over the lazy dog')
        clickToolbar('md-italic')
        assert.equal('The |quick| brown fox jumps over the lazy dog', visualValue())
      })
    })

    describe('quote level', function() {
      it('inserts selected quoted sample if you click the quote icon', function() {
        setVisualValue('')
        clickToolbar('md-quote')
        assert.equal('> |', visualValue())
      })

      it('quotes the selected text when you click the quote icon', function() {
        setVisualValue('|Butts|\n\nThe quick brown fox jumps over the lazy dog')
        clickToolbar('md-quote')
        assert.equal('> |Butts|\n\nThe quick brown fox jumps over the lazy dog', visualValue())
      })

      it('prefixes newlines when quoting an existing line on an existing', function() {
        setVisualValue('The quick brown fox jumps over the lazy dog|Butts|')
        clickToolbar('md-quote')
        assert.equal('The quick brown fox jumps over the lazy dog\n\n> |Butts|', visualValue())
      })

      it('quotes multiple lines when you click the quote icon', function() {
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

      it('unquotes multiple lines when you click the quote icon', function() {
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

    describe('mention', function() {
      it('inserts @ into an empty text area if you click the mention icon', function() {
        setVisualValue('')
        clickToolbar('md-mention')
        assert.equal('@|', visualValue())
      })

      it('inserts a space before the @ if there is not one before it', function() {
        setVisualValue('butts|')
        clickToolbar('md-mention')
        assert.equal('butts @|', visualValue())
      })

      it('treats any white space like a space', function() {
        setVisualValue('butts\n|')
        clickToolbar('md-mention')
        assert.equal('butts\n@|', visualValue())
      })
    })

    describe('lists', function() {
      it('turns line into list when you click the unordered list icon', function() {
        setVisualValue('One\n|Two|\nThree\n')
        clickToolbar('md-unordered-list')
        assert.equal('One\n\n- |Two|\n\nThree\n', visualValue())
      })

      it('turns multiple lines into list when you click the unordered list icon', function() {
        setVisualValue('One\n|Two\nThree|\n')
        clickToolbar('md-unordered-list')
        assert.equal('One\n\n|- Two\n- Three|\n', visualValue())
      })

      it('prefixes newlines when a list is created on the last line', function() {
        setVisualValue("Here's a list:|One|")
        clickToolbar('md-unordered-list')
        assert.equal("Here's a list:\n\n- |One|", visualValue())
      })

      it('surrounds list with newlines when a list is created on an existing line', function() {
        setVisualValue("Here's a list:|One|\nThis is text after the list")
        clickToolbar('md-unordered-list')
        assert.equal("Here's a list:\n\n- |One|\n\nThis is text after the list", visualValue())
      })

      it('undo the list when button is clicked again', function() {
        setVisualValue('|Two|')
        clickToolbar('md-unordered-list')
        assert.equal('- |Two|', visualValue())
        clickToolbar('md-unordered-list')
        assert.equal('|Two|', visualValue())
      })

      it('creates ordered list by selecting one line', function() {
        setVisualValue('apple\n|pear|\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\n\n|1. pear|\n\nbanana\n', visualValue())
      })

      it('undo an ordered list by selecting one line', function() {
        setVisualValue('apple\n|1. pear|\nbanana\n')
        clickToolbar('md-ordered-list')
        assert.equal('apple\n|pear|\nbanana\n', visualValue())
      })

      it('creates ordered list with incrementing values by selecting multiple lines', function() {
        setVisualValue('|One\nTwo\nThree|\n')
        clickToolbar('md-ordered-list')
        assert.equal('|1. One\n2. Two\n3. Three|\n', visualValue())
      })

      it('undo an ordered list by selecting multiple styled lines', function() {
        setVisualValue('|1. One\n2. Two\n3. Three|\n')
        clickToolbar('md-ordered-list')
        assert.equal('|One\nTwo\nThree|\n', visualValue())
      })
    })

    describe('code', function() {
      it('surrounds a line with backticks if you click the code icon', function() {
        setVisualValue("|puts 'Hello, world!'|")
        clickToolbar('md-code')
        assert.equal("`|puts 'Hello, world!'|`", visualValue())
      })

      it('surrounds multiple lines with triple backticks if you click the code icon', function() {
        setVisualValue('|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|')
        clickToolbar('md-code')
        assert.equal('```\n|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|\n```', visualValue())
      })

      it('removes backticks from a line if you click the code icon again', function() {
        setVisualValue("`|puts 'Hello, world!'|`")
        clickToolbar('md-code')
        assert.equal("|puts 'Hello, world!'|", visualValue())
      })

      it('removes triple backticks on multiple lines if you click the code icon', function() {
        setVisualValue('```\n|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|\n```')
        clickToolbar('md-code')
        assert.equal('|class Greeter\n  def hello_world\n    "Hello World!"\n  end\nend|', visualValue())
      })
    })

    describe('links', function() {
      it('inserts link syntax with cursor in description', function() {
        setVisualValue('|')
        clickToolbar('md-link')
        assert.equal('[|](url)', visualValue())
      })

      it('selected url is wrapped in link syntax with cursor in description', function() {
        setVisualValue("GitHub's homepage is |https://github.com/|")
        clickToolbar('md-link')
        assert.equal("GitHub's homepage is [|](https://github.com/)", visualValue())
      })

      it('cursor on url is wrapped in link syntax with cursor in description', function() {
        setVisualValue("GitHub's homepage is https://git|hub.com/")
        clickToolbar('md-link')
        assert.equal("GitHub's homepage is [|](https://github.com/)", visualValue())
      })

      it('selected plan text is wrapped in link syntax with cursor in url', function() {
        setVisualValue("GitHub's |homepage|")
        clickToolbar('md-link')
        assert.equal("GitHub's [homepage](|url|)", visualValue())
      })
    })

    describe('images', function() {
      it('inserts image syntax with cursor in description', function() {
        setVisualValue('|')
        clickToolbar('md-img')
        assert.equal('![|](url)', visualValue())
      })

      it('selected url is wrapped in image syntax with cursor in description', function() {
        setVisualValue("GitHub's logo is |https://assets-cdn.github.com/images/modules/logos_page/Octocat.png|")
        clickToolbar('md-img')
        assert.equal("GitHub's logo is ![|](https://assets-cdn.github.com/images/modules/logos_page/Octocat.png)", visualValue())
      })

      it('cursor on url is wrapped in image syntax with cursor in description', function() {
        setVisualValue("GitHub's logo is https://assets-cdn.git|hub.com/images/modules/logos_page/Octocat.png")
        clickToolbar('md-img')
        assert.equal("GitHub's logo is ![|](https://assets-cdn.github.com/images/modules/logos_page/Octocat.png)", visualValue())
      })

      it('selected plan text is wrapped in image syntax with cursor in url', function() {
        setVisualValue("GitHub's |logo|")
        clickToolbar('md-img')
        assert.equal("GitHub's ![logo](|url|)", visualValue())
      })
    })
  })
})
