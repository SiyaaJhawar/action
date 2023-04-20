import fetch from 'node-fetch';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraApiToken = process.env.JIRA_API_TOKEN;
const jira_url = process.env.INPUT_JIRA_URL;
const auth = 'Basic ' + Buffer.from(`${jiraUsername}:${jiraApiToken}`).toString('base64');

const checkIssues = async () => {
  const jql = process.env.INPUT_JQL ;
  const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };
  try {
    const response = await fetch(encodeURI(`${jira_url}?jql=${jql}`), { headers });

    const json = await response.json();

    let result;
    if (json.issues === undefined || json.issues.length === 0) {
      result = 'GO';
    } else if (Object.keys(json).length === 0) {
      result = 'GO';
    } else {
      result = 'NOGO';
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const output = await checkIssues();
  console.log(output);
};

main();
