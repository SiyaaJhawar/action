import { XMLHttpRequest } from "xmlhttprequest";

 
var xhr = new XMLHttpRequest();
var username = process.env.JIRA_USERNAME;
var apiToken = process.env.JIRA_API_TOKEN;
console.log(`Username: ${username}`);
console.log(`API Token: ${apiToken}`);
xhr.open("GET", "https://swgup.atlassian.net/rest/api/3/search?filter=allissues", true);
xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + apiToken));
xhr.send();
 
xhr.onreadystatechange = function () {
  console.log("readyState = " + this.readyState + ", status = " + this.status);
  if (this.readyState === 4 && this.status === 200) {
    var result = JSON.parse(this.responseText);
    console.log(result);

    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        var val = result[key];
       
       
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
