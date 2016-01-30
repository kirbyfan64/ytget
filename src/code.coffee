window.prepare = ->
  $('#urls').css 'visibility', 'hidden'
  $('#download').css 'visibility', 'hidden'

  status = $ '#status'
  status.css 'color', 'black'
  status.text 'Loading...'
  url = $('#url').val()
  if not extractId url
    status.css 'color', 'red'
    status.text 'Invalid URL'
    return

  extract(url).done (result) ->
    title = result.title
    status.text "Loading formats for video '#{title}'"
    urls = $ '#urls'
    urls.empty()
    urls.css 'visibility', 'visible'
    $.each result.formats, (_, fmt) ->
      return if !fmt.height
      note = fmt.format_note
      if note and note.indexOf('DASH video') != -1
        note += ' (no audio!)'
      ext = fmt.ext
      elem = $ '<option></option>'
      elem.text "#{fmt.ext}: #{fmt.height}p #{note or ''}"
      elem.val JSON.stringify {url: fmt.url, name: "#{title}.#{ext}"}
      urls.append elem
    status.text ''
    $('#download').css 'visibility', 'visible'

window.download_item = ->
  obj = JSON.parse $('#urls').val()
  console.log obj
  downloadFile obj.url, obj.name
