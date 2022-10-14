function AjaxGetFile(path,callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback && callback(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", path, true);
  xmlhttp.send();
}