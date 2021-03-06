// Generated by CoffeeScript 1.7.1
(function() {
  window.prepare = function() {
    var status, url;
    $('#urls').css('visibility', 'hidden');
    $('#download').css('visibility', 'hidden');
    status = $('#status');
    status.css('color', 'black');
    status.text('Loading...');
    url = $('#url').val();
    if (!extractId(url)) {
      status.css('color', 'red');
      status.text('Invalid URL');
      return;
    }
    return extract(url).done(function(result) {
      var title, urls;
      title = result.title;
      status.text("Loading formats for video '" + title + "'");
      urls = $('#urls');
      urls.empty();
      urls.css('visibility', 'visible');
      $.each(result.formats, function(_, fmt) {
        var elem, ext, note;
        if (!fmt.height) {
          return;
        }
        note = fmt.format_note;
        if (note && note.indexOf('DASH video') !== -1) {
          note += ' (no audio!)';
        }
        ext = fmt.ext;
        elem = $('<option></option>');
        elem.text("" + fmt.ext + ": " + fmt.height + "p " + (note || ''));
        elem.val(JSON.stringify({
          url: fmt.url,
          name: "" + title + "." + ext
        }));
        return urls.append(elem);
      });
      status.text('');
      return $('#download').css('visibility', 'visible');
    });
  };

  window.download_item = function() {
    var dlink, obj;
    dlink = $('<a></a>');
    obj = JSON.parse($('#urls').val());
    console.log(obj);
    dlink.attr('href', obj.url);
    dlink.attr('download', obj.name);
    console.log(dlink);
    return dlink.get(0).click();
  };

}).call(this);
