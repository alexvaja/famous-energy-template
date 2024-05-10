function updateContent(value, path) {
  console.log("VALUE: " + value);
  
  var path = window.location.pathname;
  var page = path.split("/").pop();

  if (value == 'ro') {
      console.log("RO");
      location.replace("../ro/" + page);
  } else {
      console.log("EN");
      location.replace("../en/" + page);
  }
} 