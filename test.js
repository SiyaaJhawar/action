const owner = "SiyaaJhawar";
const repo = "action";
const commit_sha = "b63d854b9c2d60ba843e7da1106c8076fe203704";
const url =  `https://api.github.com/repos/SiyaaJhawar/action/commits/7ba17fe7086423a30485d2949cf32255bc2c479d/comments`;
const username = process.env.GITHUB_USERNAME;
#const username = '${{ secrets.GITHUB_USERNAME }}';
#const password = '${{ secrets.GITHUB_API_TOKEN }}';

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
  const defects = [
      {"Defect ID":"WFL-110"},
      {"Defect ID":"WFL-101"},
      {"Defect ID":"WFL-1001"},
      {"Defect ID":"WFL-1101"}
    ];
    const defectIds = defects.map(defect => defect["Defect ID"]).join(",");
    console.log(defectIds);
  })
  .catch(error => console.error(error));
