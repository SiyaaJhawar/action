const owner = "SiyaaJhawar";
const repo = "action";
const commit_sha = "b63d854b9c2d60ba843e7da1106c8076fe203704";
const url = `https://api.github.com/repos/SiyaaJhawar/action/commits/b63d854b9c2d60ba843e7da1106c8076fe203704/comments`;
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
      const commentTexts = data.map(comment => comment.body);
 const defectRegex = /([A-Z0-9]{3})-(?=C)\w+/g
 const defectIds = commentTexts.flatMap(text => {
  const matches = [];
  let match;
  while ((match = defectRegex.exec(text))) {
    matches.push([match[1], match[2]]);
  }
  return matches;
});

const outputString = defectIds.map(([prefix, suffix]) => `${prefix}-${suffix}`).join(", ");


console.log(outputString);
  })
  .catch(error => console.error(error));
