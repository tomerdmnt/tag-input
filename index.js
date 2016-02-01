var TagInput = function (input, opts) {
  var self = this
  this.opts = opts || {}

  this.model = { tags: [] }
  this.view = { container: null, tags: null, input: input }

  this.view.container = document.createElement('div')
  this.view.container.className = 'taginputContainer'
  this.view.container.style = input.style
  this.view.tags = document.createElement('ul')

  this.view.container.appendChild(this.view.tags)
  input.parentNode.insertBefore(this.view.container, input)

  input.parentNode.removeChild(input)
  this.view.container.appendChild(input)

  input.onkeyup = function (e) {
    if (e.which === 13) {
      e.preventDefault()
      self.addtag(e.target.value)
      e.target.value = ''
      return false
    }
  }

  input.onkeydown = function (e) {
    if (e.which === 8) {
      var currentTags = self.tags()
      if (this.value.length === 0 && currentTags.length > 0) {
        self.removetag(currentTags[currentTags.length - 1])
      }
    }
  }

  input.onfocus = function (e) {
    this.parentNode.className = 'taginputContainer focus'
  }

  input.onblur = function (e) {
    this.parentNode.className = 'taginputContainer'
  }

  this.view.container.onclick = function (e) {
    input.focus()
  }

  return this
}

TagInput.prototype.bind = function (event, func) {
  this._events = this._events || {}
  this._events[event] = this._events[event] || []
  this._events[event].push(func)
}

TagInput.prototype.unbind = function (event, func) {
  this._events = this._events || {}
  if (event in this._events === false) return
  this._events[event].splice(this._events[event].indexOf(func), 1)
}

TagInput.prototype.trigger = function (event, func) {
  this._events = this._events || {}
  if (event in this._events === false) return
  for (var i = 0; i < this._events[event].length; i++) {
    this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
  }
}

TagInput.prototype.addtag = function (tag) {
  var self = this
  if (this.model.tags.indexOf(tag) !== -1)
    return

  this.model.tags.push(tag)

  var li = document.createElement('li')
  li.setAttribute('data', tag)
  li.innerText = tag
  li.onclick = function (e) {
    e.preventDefault()
    self.view.input.focus()
  }

  var del = document.createElement('a')
  del.innerText = 'x'
  del.href = '#'
  del.onclick = this.removetag.bind(this, tag)
  li.appendChild(del)

  this.view.tags.appendChild(li)

  this.trigger('add', tag)
}

TagInput.prototype.importTags = function (tagsList) {
  var self = this
  if (this.model.tags.indexOf(tagsList) !== -1)
    return

  this.model.tags.push(tagsList)

  var li, del
  for (var i = 0; i < tagsList.length; i++) {
    li = document.createElement('li')
    li.setAttribute('data', tagsList[i])
    li.innerText = tagsList[i]
    li.onclick = function (e) {
      e.preventDefault()
      self.view.input.focus()
    }

    del = document.createElement('a')
    del.innerText = 'x'
    del.href = '#'
    del.onclick = this.removetag.bind(this, tagsList[i])
    li.appendChild(del)

    this.view.tags.appendChild(li)
  }

  this.trigger('import', tagsList)
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
      break
  }
  this.view.tags.removeChild(child)

  this.trigger('remove', tag)
}

TagInput.prototype.tags = function () {
  return this.model.tags
}
