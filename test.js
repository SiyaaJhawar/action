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
  const comments = data.map(item => item.body);
  const regex = /Defect ID: (\w+)/g;
  const defectIds = comments
    .flatMap(comment => comment.match(regex))
    .map(match => match.split(":")[1].trim())
    .join(",");
  console.log(defectIds);
  })
  .catch(error => console.error(error));
