var Emitter = require('emitter')

module.exports = TagInput

function TagInput(input, opts) {
  if (!(this instanceof TagInput)) return new TagInput(input, opts)
  Emitter(this)
  var me = this
  var opts = opts || {}
  var doc = opts.document || document

  var model = { tags: [] }
  var view = { container: null, tags: null }

  build()

  this.addtag = function (tag) {
    if (model.tags.indexOf(tag) !== -1)
      return

    model.tags.push(tag)

    var li = buildElement({ name: 'li' })
    li.setAttribute('data', tag)
    li.innerText = tag
    li.onclick = function (e) {
      e.preventDefault()
      input.focus()
    }

    var del = buildElement({ name: 'a' })
    del.innerText = 'x'
    del.href = '#'
    del.onclick = this.removetag.bind(this, tag)
    li.appendChild(del)

    view.tags.appendChild(li)

    this.emit('add', tag)
  }

  this.removetag = function (tag) {
    var i = model.tags.indexOf(tag)
    if (i === -1)
      return

    model.tags.splice(i, 1)

    var children = view.tags.childNodes
    var child
    for (i = 0; i < children.length; i++) {
      child = children[i]
      if (child.getAttribute('data') === tag)
        break;
    }
    view.tags.removeChild(child)

    this.emit('remove', tag)
  }

  this.tags = function () {
    return model.tags
  }

  function build() {
    view.container = buildElement({ name: 'div', cls: 'taginputContainer' })
    view.tags = buildElement({ name: 'ul' })

    view.container.appendChild(view.tags)
    input.parentNode.insertBefore(view.container, input)

    input.parentNode.removeChild(input)
    view.container.appendChild(input)

    input.onchange = function (e) {
      e.preventDefault()
      me.addtag(e.target.value)
      e.target.value = ''
    }
  }

  function buildElement(params) {
    if (!params.name) throw new Error('Expected name parameter')
    var element = doc.createElement(params.name)

    if (params.cls) {
      if (params.cls.join)
        element.className = params.cls.join(' ')
      else
        element.className = params.cls
    }

    return element
  }
}

