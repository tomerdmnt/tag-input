window.onload = function () {
  var taginput = new TagInput(document.getElementById('tags'))
  
  taginput.bind('import', function (tagsList) {
    console.log('import ' + tagsList.join(','))
    console.log(taginput.tags())
  })

  taginput.bind('add', function (tag) {
    console.log(tag + ' added')
    console.log(taginput.tags())
  })

  taginput.bind('remove', function (tag) {
    console.log(tag + ' removed')
    console.log(taginput.tags())
  })
  
  taginput.importTags(['123', '234'])
}
