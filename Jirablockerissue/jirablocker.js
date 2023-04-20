import fetch from 'node-fetch';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraApiToken = process.env.JIRA_API_TOKEN;
const jiraUrl = process.env.INPUT_JIRA_URL;
const jql = process.env.INPUT_JQL;
const auth = 'Basic ' + Buffer.from(`${jiraUsername}:${jiraApiToken}`).toString('base64');

const checkIssues = async () => {
  const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };
  try {
    const response = await fetch(`${jiraUrl}?jql=${jql}`, { headers });
    const json = await response.json();

    let result;
    let issuesLength = 0;
    let jsonKeys = [];

    if (json.issues === undefined || json.issues.length === 0 || Object.keys(json).length === 0) {
      result = 'GO';
    } else {
      result = 'NOGO';
      issuesLength = json.issues.length;
      jsonKeys = Object.keys(json);
    }

    return { result, issuesLength, jsonKeys };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const main = async () => {
  const { result, issuesLength, jsonKeys } = await checkIssues();
  console.log('Result:', result);
  console.log('Number of issues:', issuesLength);
  console.log('JSON keys:', jsonKeys);
};

main();




