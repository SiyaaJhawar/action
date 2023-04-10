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
  const commentTexts = data.map(comment => comment.body);
  const defectRegex = /([A-Z]{1}[A-Z]{2,})-\d+/g;
  const defectIds = commentTexts.flatMap(text => text.match(defectRegex));
  console.log(defectIds);

  })
  .catch(error => console.error(error));
