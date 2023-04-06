const octokit = new Octokit({
  auth: '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'
})

await octokit.request('GET /repos/{owner}/{repo}/git/commits/b63d854b9c2d60ba843e7da1106c8076fe203704}', {
  owner: 'SiyaaJhawar',
  repo: 'action',
  comment_id: 'b63d854b9c2d60ba843e7da1106c8076fe203704',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
    'Accept: application/vnd.github+json'
  }
})
