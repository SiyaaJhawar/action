import JiraApi from 'jira-connector';

const defectRegex = new RegExp("([A-Z]{2,3})-\\d+");

const jiraUrl = "https://swgup.atlassian.net/rest/api/2/search/?filter=allissues";
const jiraAuth = {
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_API_TOKEN
};

const commentTexts = ['WFL-1105', 'WFL-101', 'SWT-1', 'SWT-2', 'WFL-1015', 'WFL-1010', 'WFL-1001', 'WFL-1002', 'CLDP-1003', 'WFL-1001', 'WFL-1101'];
const defectIds = commentTexts.flatMap(text => {
  const matches = [];
  let match;
  while ((match = defectRegex.exec(text))) {
    matches.push([match[1], match[2]]);
  }
  return matches;
});

const jira = new JiraApi({
  host: jiraUrl,
  basic_auth: jiraAuth
});

const pageSize = 50;
const totalPages = Math.ceil(defectIds.length / pageSize);

for (let page = 0; page < totalPages; page++) {
  const startIndex = page * pageSize;
  const endIndex = Math.min((page + 1) * pageSize, defectIds.length);
  const batch = defectIds.slice(startIndex, endIndex);

  batch.forEach(defectId => {
    jira.search.search({
      jql: `key=${defectId[0]}-${defectId[1]} AND labels != int_deploy`,
      fields: ['labels']
    }, function(error, searchResult) {
      if (error) {
        console.error(error);
        return;
      }

      const issues = searchResult.issues;
      if (issues.length === 0) {
        console.log(`Issue ${defectId[0]}-${defectId[1]} not found`);
        return;
      }

      const issue = issues[0];
      const labels = issue.fields.labels;
      labels.push('int_deploy');

      jira.issue.editIssue({
        issueKey: issue.key,
        issue: {
          fields: {
            labels: labels
          }
        }
      }, function(error, updatedIssue) {
        if (error) {
          console.error(error);
        } else {
          console.log(`Label "int_deploy" added to issue ${updatedIssue.key}`);
        }
      });
    });
  });
}
