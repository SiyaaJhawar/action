import axios from 'axios';
const jiraUrl = 'https://swgup.atlassian.net/rest/api/2/search/?filter=allissues';
const githubUrl = 'https://api.github.com/repos/SiyaaJhawar/action/commits/7ba17fe7086423a30485d2949cf32255bc2c479d/comments';
const jiraUsername = process.env.JIRA_USERNAME;
const jiraPassword = process.env.JIRA_API_TOKEN;
const githubToken = process.env.GITHUB_API_TOKEN;
const defectRegex = /DEFECT-\d+/g;

async function addLabelToMatchingJiraIssue(defectId) {
  try {
    const issueResponse = await axios.get(`${jiraUrl}/${defectId}`, {
      auth: { username: jiraUsername, password: jiraPassword }
    });
    if (issueResponse.data.key === defectId) {
      const labelResponse = await axios.post(`${jiraUrl}/${defectId}/labels`, { labels: ['matched'] }, {
        auth: { username: jiraUsername, password: jiraPassword }
      });
      console.log(`Label added to Jira issue ${defectId}`);

      // Check if the defect ID matches with the commit comment defect ID
      const commitCommentDefectIds = commit.commit.message.match(defectRegex);
      if (commitCommentDefectIds && commitCommentDefectIds.includes(defectId)) {
        const intDeployLabelResponse = await axios.post(`${jiraUrl}/${defectId}/labels`, { labels: ['int_deploy'] }, {
          auth: { username: jiraUsername, password: jiraPassword }
        });
        console.log(`'int_deploy' label added to Jira issue ${defectId}`);
      }
    }
  } catch (err) {
    console.error(`Failed to add label to Jira issue ${defectId}`, err);
  }
}


async function compareCommitCommentWithJiraIssue() {
  try {
    const commitsResponse = await axios.get(githubUrl, {
      headers: { Authorization: `token ${githubToken}` }
    });
    for (const commit of commitsResponse.data) {
      const message = commit.commit.message;
      const defectIds = message.match(defectRegex);
      if (defectIds) {
        for (const defectId of defectIds) {
          await addLabelToMatchingJiraIssue(defectId);
        }
      }
    }
  } catch (err) {
    console.error('Failed to compare GitHub commit comments with Jira issues', err);
  }
}

compareCommitCommentWithJiraIssue();
