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
  
  console.log("API response:", data);

    const defects = data.map(comment => {
      const match = comment.body.match(/\bDefect ID:\s*(\S+)\b/);
      if (match) {
        return { "Defect ID": match[1] };
      } else {
        return null;
      }
    }).filter(Boolean);

    console.log("Defects:", defects);

    const defectIds = defects.map(defect => defect["Defect ID"]).join(",");
    console.log("Defect IDs:", defectIds);


  })
  .catch(error => console.error(error));
