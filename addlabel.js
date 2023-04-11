import axios from 'axios';
import btoa from 'btoa';

const jiraUrl = 'https://swgup.atlassian.net/rest/api/2';
const githubUrl = 'https://api.github.com/repos/SiyaaJhawar/action/commits/7ba17fe7086423a30485d2949cf32255bc2c479d/comments';
const jiraUsername = process.env.JIRA_USERNAME;
const jiraPassword = process.env.JIRA_API_TOKEN;
const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_API_TOKEN;

const defectRegex = /DEFECT-\d+/g;

async function compareCommitCommentWithJiraIssue() {
  try {
    const commitsResponse = await axios.get(githubUrl, {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    for (const commit of commitsResponse.data) {
      const message = commit.commit.message;
      const defectIds = message.match(defectRegex);
      if (defectIds) {
        for (const defectId of defectIds) {
          const issueResponse = await axios.get(`${jiraUrl}/issue/${defectId}`, {
            auth: { username: jiraUsername, password: jiraPassword }
          });
          if (issueResponse.data.key === defectId) {
            const labelResponse = await axios.post(`${jiraUrl}/issue/${defectId}/labels`, { labels: ['int_deploy'] }, {
              auth: { username: jiraUsername, password: jiraPassword }
            });
            console.log(`Label added to Jira issue ${defectId}`);
          }
        }
      }
    }
  } catch (err) {
    console.error('Failed to compare GitHub commit comments with Jira issues', err);
  }
}

compareCommitCommentWithJiraIssue();

