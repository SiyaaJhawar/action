import { XMLHttpRequest } from "xmlhttprequest";

 
var xhr = new XMLHttpRequest();
var username = "swatg139@gmail.com";
var apiToken = "ATATT3xFfGF0mqSJBvyjdoYaK7MSraNbWxCKhCD38fo80eo_GTkgyX6oLGRQ8HmiOHaG0axUg0uexz7UhY6_Acl297byxTRK5H7-CCuqPVOCKvdQZM1nn9OnmFV_ZSBqRkVUfgIQBj-NhaB1R35Cw1MXx2Z0noVPapKlTVVDhdAElbHVYaWd2HQ=60DEC96F";
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
        console.log(result.hasOwnProperty(key));
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
