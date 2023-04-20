import fetch from 'node-fetch';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraApiToken = process.env.JIRA_API_TOKEN;
const jiraUrl = process.env.INPUT_JIRA_URL;
const auth = 'Basic ' + Buffer.from(`${jiraUsername}:${jiraApiToken}`).toString('base64');

const checkIssues = async () => {
  const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };
  try {
    const response = await fetch(jiraUrl, { headers });
    const json = await response.json();

    if (json.issues === undefined || json.issues.length === 0) {
      console.log('GO');
    } else if (Object.keys(json).length === 0) {
      console.log('GO');
    } else {
      console.log('NOGO');
    }
  } catch (error) {
    console.error(error);
  }
};

checkIssues();

