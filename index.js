Emitter(TagInput.prototype);

function TagInput(input, opts) {
  if (!(this instanceof TagInput)) return new TagInput(input, opts);
  var self = this;
  this.opts = opts || {};

  this.model = {tags: []};
  this.view = {container: null, tags: null, input: input};

  this.view.container = document.createElement('div');
  this.view.container.className = 'taginputContainer';
  this.view.container.style = input.style;
  this.view.tags = document.createElement('ul');

  this.view.container.appendChild(this.view.tags);
  input.parentNode.insertBefore(this.view.container, input);

  input.parentNode.removeChild(input);
  this.view.container.appendChild(input);

  input.onkeyup = function (e) {
    if (e.which === 13) {
      e.preventDefault();
      self.addtag(e.target.value);
      e.target.value = '';
      return false
    }
    if (e.which === 8) {
      e.preventDefault();
      var currentTags = self.tags();
      if (this.value.length === 0 && currentTags.length > 0) {
        self.removetag(currentTags[currentTags.length - 1]);
      }
    }
  };

  input.onfocus = function(e) {
    this.parentNode.className = 'taginputContainer focus';
  };

  input.onblur = function(e) {
    this.parentNode.className = 'taginputContainer';
  };

  this.view.container.onclick = function(e) {
    input.focus();
  }
}

TagInput.prototype.addtag = function (tag) {
  var self = this;
  if (this.model.tags.indexOf(tag) !== -1)
    return;

  this.model.tags.push(tag);

  var li = document.createElement('li');
  li.setAttribute('data', tag);
  li.innerText = tag;
  li.onclick = function (e) {
    e.preventDefault();
    self.view.input.focus()
  };

  var del = document.createElement('a');
  del.innerText = 'x';
  del.href = '#';
  del.onclick = this.removetag.bind(this, tag);
  li.appendChild(del);

  this.view.tags.appendChild(li);

  this.emit('add', tag)
};

TagInput.prototype.import = function (tagArray) {
  var self = this;
  if (this.model.tags.indexOf(tagArray) !== -1)
    return;

  this.model.tags.push(tagArray);

  var li, del;
  for(var i = 0; i<tagArray.length; i++) {
    li = document.createElement('li');
    li.setAttribute('data', tagArray[i]);
    li.innerText = tagArray[i];
    li.onclick = function (e) {
      e.preventDefault();
      self.view.input.focus();
    };

    del = document.createElement('a');
    del.innerText = 'x';
    del.href = '#';
    del.onclick = this.removetag.bind(this, tagArray[i]);
    li.appendChild(del);

    this.view.tags.appendChild(li);
  }

  this.emit('import', tagArray);
};

TagInput.prototype.removetag = function (tag) {
  var i = this.model.tags.indexOf(tag);
  if (i === -1)
    return;

  this.model.tags.splice(i, 1);

  var children = this.view.tags.childNodes;
  var child;
  for (i = 0; i < children.length; i++) {
    child = children[i];
    if (child.getAttribute('data') === tag)
      break;
  }
  this.view.tags.removeChild(child);

  this.emit('remove', tag)
};

TagInput.prototype.tags = function () {
  return this.model.tags
};
