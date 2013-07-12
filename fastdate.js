window.fastdate = function(input, config) {

  config = config || {};

  var blur = function(e) {
    var text = input.val();
    if(/^\d\d?-\d\d?-\d\d$/.test(text)) {
      // prepend 19 or 20 to the 2-digit year
      var prefix = text.substr(0, text.length - 2);
      var shortYear = text.substr(text.length - 2);
      var year = 2000 + new Number(shortYear);
      var now = new Date().getFullYear();
      if(config.past === true) {
        if(year > now) {
          year = year - 100;
        }
      } else if(config.future !== true) {
        if(year > 2040) {
          year = year - 100;
        }
      }
      input.val(prefix + year);
    }
  };

  var keyUp = function(e) {
    var code = e.which;
    var caretPos = getCaretPos();
    var text = input.val();
    if(caretPos == text.length) {
      // We only aid the user if the cursor is at the end
      if(isDateSeparator(code)) {
        if(text.length > 0 && text.charAt(text.length - 1) != '-') {
          input.val(text + '-');
        }
      }
      if(isDigit(code)) {
        if(/^\d\d$/.test(text) || /^\d\d?-\d\d$/.test(text)) {
          input.val(text + '-');
        }
      }
    }
  };

  var keyDown = function(e) {
    var code = e.which;
    // allow only digits and date separators
    if(!isDigit(code) && code > '9'.charCodeAt(0) && (code < 112 || code > 123) && e.ctrlKey != 1) {
      var caretPos = getCaretPos();
      if(caretPos == input.val().length) {
        // We only aid the user if the cursor is at the end
        e.preventDefault();
      }
    }
  };

  // private utility functions
  var getCaretPos = function() {
    if(typeof input[0].selectionStart == 'number') {
      return input[0].selectionStart;
    } else if(document.selection && input[0].createTextRange) {
      var rng = document.selection.createRange();
      rng.collapse(true);
      rng.moveStart('character', -input.val().length);
      return rng.text.length;
    }
    return -1;
  };

  // 0-9 (numpad or normal)
  var isDigit = function(keyCode) {
    return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
  };

  // '-', '.' or '/' (numpad or normal)
  var isDateSeparator = function(keyCode) {
    return (keyCode == 189 || keyCode == 190 || keyCode == 191 || keyCode == 109 || keyCode == 110 || keyCode == 111)
  };

  input.on('blur', blur);
  input.on('keyup', keyUp);
  input.on('keydown', keyDown);

}