const owner = "SiyaaJhawar";
const repo = "action";
const commit_sha = "b63d854b9c2d60ba843e7da1106c8076fe203704";
const url = `https://api.github.com/repos/SiyaaJhawar/action/git/commits/b63d854b9c2d60ba843e7da1106c8076fe203704`;
const token = "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"

fetch(url, {
  headers: {
    
    "Authorization": `Token ${token}`,
    "Accept": "application/vnd.github.v3+json"
  }

})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Do something with the data
  })
  .catch(error => console.error(error));
