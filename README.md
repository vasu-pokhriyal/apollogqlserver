The Apollo graphql server consists of implementation of github octokit library

Installation
nmp install
npm start 

create a file .env,and add personal token from github
node version : 14.20


Api documentation
1) get all repositories
    query{
  repositories(page:1) {
    name
    size 
    owner
  }
}
    sample response

    {
    "data": {
        "repositories": [
            {
                "name": "hello",
                "size": "0",
                "owner": "vasu-pokhriyal"
            },
            {
                "name": "repoA",
                "size": "16435",
                "owner": "vasu-pokhriyal"
            },
            {
                "name": "repoB",
                "size": "16436",
                "owner": "vasu-pokhriyal"
            },
            {
                "name": "vasu-pokhriyal.github.io",
                "size": "147190",
                "owner": "vasu-pokhriyal"
            }
        ]
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////

2)get single repository
    query{
  singleRepos(owner:"vasu-pokhriyal",name:"repoA") {
    name
    size 
    owner
    isPrivate
  }
}
    sample response
    query{
  singleRepos(owner:"vasu-pokhriyal",name:"repoA") {
    name
    size 
    owner
    isPrivate
    totalFiles
    webHooks{
      id,type, name,url
    }
  }
}
