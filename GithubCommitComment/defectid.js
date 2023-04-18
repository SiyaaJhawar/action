import fetch from 'node-fetch';





const owner = "SiyaaJhawar";
const repo = "action";

const url = process.env.GITHUB_URL;
const username = process.env.GITHUB_USERNAME;
                                            
const password = process.env.GITHUB_API_TOKEN;
const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

fetch(url, {
  headers: {
    
 "Authorization": `Basic ${encodedCredentials}`,
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
  const commaSeparatedIds = defectIds.join(', ');

console.log(commaSeparatedIds);
 



  })
  .catch(error => console.error(error));
