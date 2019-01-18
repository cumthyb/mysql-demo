window.Ajax = (function (w) {
  function ajax() {
    this.set = {
      type: 'get',
      url: "",
      data: "",
      async: true,
      timeout: 10000,
      dataType: 'text',
      content_type:'application/x-www-form-urlencoded',
      success: null,
      error: null
    };
    this.datas = '';
  };
  
  ajax.prototype = {
    init: function (a) {
      var _t = this;
      _t.extend(_t.set, a);
      for (var n in _t.set.data) { _t.datas += n + '=' + encodeURI(_t.set.data[n]) + '&' };
      this.datas = this.datas + new Date().getTime();
      var xhr = w.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      if (_t.set.type == 'get' && this.datas) {
        _t.set.url += '?' + this.datas + new Date().getTime();
      };
      xhr.open(_t.set.type, _t.set.url, _t.set.async);
      xhr.timeout = _t.set.timeout;
      xhr.onreadystatechange = function () {
        try {
          if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
              switch (true) {
                case (_t.set.dataType.toLowerCase() == 'text'):
                  _t.set.success && _t.set.success(xhr.responseText);
                  break;
                case (_t.set.dataType.toLowerCase() == 'xml'):
                  _t.set.success && _t.set.success(xhr.responseXML);
                  break;
                default:
                  try {
                    _t.set.success && _t.set.success(JSON.parse(xhr.responseText));
                  } catch (e) {
                    _t.set.success && _t.set.success(xhr.responseText);
                  };
                  break;
              };
            } else {
              _t.set.error && _t.set.error(xhr.status);
            };
          };
        } catch (e) {
          _t.set.error && _t.set.error();
        }
      };
      if (_t.set.type.toLowerCase() == 'get') {
        xhr.send();
      } else {
        xhr.setRequestHeader("Content-type", _t.set.content_type);
        xhr.send(_t.set);
      };
    },
    extend: function (n, n1) {
      for (var i in n1) { n[i] = n1[i] };
    }
  };
  return {
    init: function (json) {
      new ajax().init(json);
    }
  }
})(window);