import { XMLHttpRequest } from "xmlhttprequest";



 
var xhr = new XMLHttpRequest();
var JIRAUSERNAME = process.env.JIRA_USERNAME;
var JIRAAPITOKEN = process.env.JIRA_API_TOKEN;
console.log(`username: ${JIRAUSERNAME}`);
console.log(`APItoken: ${JIRAAPITOKEN}`);

xhr.open("GET", "https://swgup.atlassian.net/rest/api/3/search?filter=allissues", true);
xhr.setRequestHeader('Authorization', 'Basic ' + Buffer.from(Username + ':' + ApiToken).toString('base64'));

xhr.send();
 
xhr.onreadystatechange = function () {
  console.log("readyState = " + this.readyState + ", status = " + this.status);
  if (this.readyState === 4 && this.status === 200) {
    var result = JSON.parse(this.responseText);
    console.log(result);

    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        var val = result[key];
       
       console.log();
        if (Array.isArray(val)) {
          val.forEach(function(item) {
            for (var k in item) {
              if (item.hasOwnProperty(k)) {
            
                console.log(k + ": " + item[k]);
              } 
              }
            });
          }
        else {
          console.log(key + ": " + val);
        }
      }
    }
  }
};
