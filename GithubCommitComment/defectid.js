import fetch from 'node-fetch';

const getDefectIds = async () => {
  const owner = "SiyaaJhawar";
  const repo = "action";
  const url = process.env.INPUT_GITHUB_URL;
  const username = process.env.GITHUB_USERNAME;
  const password = process.env.GITHUB_API_TOKEN;
  const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await fetch(url, {
      headers: {    
        "Authorization": `Basic ${encodedCredentials}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    const data = await response.json();
    const commentTexts = data.map(comment => comment.body);
    const defectRegex = /([A-Z]{1}[A-Z]{2,})-\d+/g;
    const defectIds = commentTexts.flatMap(text => text.match(defectRegex));
    const commaSeparatedIds = defectIds.join(', ');
    return commaSeparatedIds;
  } catch (error) {
    console.error(error);
  }
};

export { getDefectIds };



