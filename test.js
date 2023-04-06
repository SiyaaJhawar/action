const owner = "SiyaaJhawar";
const repo = "action";
const commit_sha = "b63d854b9c2d60ba843e7da1106c8076fe203704";
const url =  `https://api.github.com/repos/SiyaaJhawar/action/commits/7ba17fe7086423a30485d2949cf32255bc2c479d/comments`;
const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_API_TOKEN;

fetch(url, {
  headers: {
    
    "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
    "Accept": "application/vnd.github.v3+json"
  }

})
  .then(response => response.json())
 
 .then(data => {
    console.log(data);
    // assume you have a JSON response stored in a variable called 'data'
    const defects = [{"Defect ID":"1"},{"Defect ID":"2"},{"Defect ID":"3"},{"Defect ID":"4"},{"Defect ID":"5"}];

const defectIds = defects.map(defect => defect["Defect ID"]).join(",");
console.log(defectIds);

// commit the changes with the commitComment

  })
  .catch(error => console.error(error));
