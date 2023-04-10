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
    const commentTexts = data.map(({ body }) => body);
    const defectRegex = /([A-Z0-9]{3})-(?=C\w{2})\w+/g;
    const defectIds = commentTexts.flatMap(text => {
      const matches = text.matchAll(defectRegex);
      return Array.from(matches, match => [match[1], match[2]]);
    });

    if (defectIds.length === 0) {
      console.log("No matches found.");
    } else {
      const filteredDefectIds = defectIds
        .map(([prefix, suffix]) => `${prefix}-${suffix}`)
        .filter(defectId => /^[A-Z]+-\d+$/.test(defectId));
      if (filteredDefectIds.length === 0) {
        console.log("No valid defect IDs found.");
      } else {
        const outputString = filteredDefectIds.join(", ");
        console.log(outputString);
      }
    }
  })
  .catch(error => console.error(error));