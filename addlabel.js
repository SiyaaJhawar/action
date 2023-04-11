import axios from 'axios';
import btoa from 'btoa';

const jiraUrl = 'https://swgup.atlassian.net/rest/api/2/search/?filter=allissues';
const githubUrl = 'https://api.github.com/repos/SiyaaJhawar/action/commits/7ba17fe7086423a30485d2949cf32255bc2c479d/comments';
const jiraUsername = process.env.JIRA_USERNAME;
const jiraPassword = process.env.JIRA_API_TOKEN;
const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_API_TOKEN;

const defectRegex = /([A-Z]{1}[A-Z]{2,})-\d+/g;

async function compareCommitCommentWithJiraIssue() {
  try {
    const commitsResponse = await axios.get(githubUrl, {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
  
      }
    });
    const commentTexts = commitsResponse.data.map(comment => comment.body);
    const defectIds = commentTexts.flatMap(text => text.match(defectRegex));
    console.log(`Found the following defect IDs in commit comments: ${defectIds}`);

    for (const defectId of defectIds) {
        const issueResponse = await axios.get(`${jiraUrl}/issue/${defectId}`, {
         headers: {
         "Authorization": `Basic ${btoa(`${jiraUsername}:${jiraPassword}`)}`,
          "Accept": "application/json"
      }
      });
      if (issueResponse.data.key === defectId) {
        const labelResponse = await axios.post(`${jiraUrl}/issue/${defectId}/labels`, { 
  labels: ['int_deploy']
}, {
  headers: {
    "Authorization": `Basic ${btoa(`${jiraUsername}:${jiraPassword}`)}`,
    "Content-Type": "application/json"
  }
});

        console.log(`Label added to Jira issue ${defectId}`);
      }
    }
  } catch (err) {
    console.error('Failed to compare GitHub commit comments with Jira issues', err);
  }
}

compareCommitCommentWithJiraIssue();




