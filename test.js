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
  const defects = data.map(comment => {
      const defectId = comment.body.match(/Defect ID: (\w+-\d+)/);
      return { "Defect ID": defectId ? defectId[1] : "" };
    });
    console.log(defects);
    const defectIds = defects.map(defect => defect["Defect ID"]).join(",");
    console.log(defectIds);

  })
  .catch(error => console.error(error));
