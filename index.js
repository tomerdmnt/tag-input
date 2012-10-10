var Emitter = require('emitter')

module.exports = TagInput

function TagInput(input, opts) {
  if (!(this instanceof TagInput)) return new TagInput(input, opts)
  this.opts = opts || {}

  this.model = { tags: [] }
  this.view = { container: null, tags: null, input: input }

  build()

  function build() {
    this.view.container = document.createElement('div')
    this.view.container.className = 'taginputContainer'
    this.view.tags = document.createElement('ul')

    this.view.container.appendChild(this.view.tags)
    input.parentNode.insertBefore(this.view.container, input)

    input.parentNode.removeChild(input)
    this.view.container.appendChild(input)

    input.onchange = function (e) {
      e.preventDefault()
      me.addtag(e.target.value)
      e.target.value = ''
    }
  }
}

TagInput.prototype.addtag = function (tag) {
  if (this.model.tags.indexOf(tag) !== -1)
    return

  this.model.tags.push(tag)

  var li = document.createElement('li')
  li.setAttribute('data', tag)
  li.innerText = tag
  li.onclick = function (e) {
    e.preventDefault()
    this.view.input.focus()
  }

  var del = document.createElement('a')
  del.innerText = 'x'
  del.href = '#'
  del.onclick = this.removetag.bind(this, tag)
  li.appendChild(del)

  this.view.tags.appendChild(li)

  this.emit('add', tag)
}

TagInput.prototype.removetag = function (tag) {
  var i = this.model.tags.indexOf(tag)
  if (i === -1)
    return

  this.model.tags.splice(i, 1)

  var children = this.view.tags.childNodes
  var child
  for (i = 0; i < children.length; i++) {
    child = children[i]
    if (child.getAttribute('data') === tag)
      break;
  }
  this.view.tags.removeChild(child)

  this.emit('remove', tag)
}

TagInput.prototype.tags = function () {
  return this.model.tags
}


