
# tag-input

  A ~~[component](http://github.com/component/component)~~ that turns a text input element into a pretty tags input.
  Enables you to work with any MVC framework using simple events or you can get the tags from the inner model.

  ![Tags Input](https://raw.github.com/tomerdmnt/tag-input/master/screenshot.jpg)

## Improvement by this fork

  1. No Component and Emitter any more.
  2. Delete previous tag by backspace key.
  3. Able to import tags.
  
  [![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Install
```
npm install https://github.com/gucheen/tag-input.git
```

## Example

``` javascript
var TagInput = require('tag-input');

var taginput = TagInput(document.getElementById('tags'))

taginput.bind('add', function (tag) {
  console.log(tag + ' added')
  console.log(taginput.tags())
})

taginput.bind('import', function (tagsList) {
  console.log('import ' + tagsList.join(','))
  console.log(taginput.tags())
})

taginput.bind('remove', function (tag) {
  console.log(tag + ' removed')
  console.log(taginput.tags())
})

taginput.importTags(['123', '234'])

```

## Notes about style
  The pseudo input style is very basic, so you can adjust its looks to your site, You can extend it by adding to taginputContainer class.

## api

### TagInput(input)
  binds to a text input element

### addtag(tag)
  adds a tag to the tag input from js
  
### import(tagsList)
  adds a list of tags to the tag input from js

### removetag(tag)
  removes a tag from the tag input from js

### event: 'add'
  Called when a tag is added
  
### event: 'import'
  Called when a list of tags is import

### event: 'removed'
  Called when a tag is removed`


