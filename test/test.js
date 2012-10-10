var TagInput = require('tag-input')

window.onload = function () {
  var taginput = TagInput(document.getElementById('tags'))

  taginput.on('add', function (tag) {
    console.log(tag + ' added')
    console.log(taginput.tags())
  })

  taginput.on('remove', function (tag) {
    console.log(tag + ' removed')
    console.log(taginput.tags())
  })
}
