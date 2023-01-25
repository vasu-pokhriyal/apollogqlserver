import repo from './services/repositoryServices.js'


export const resolvers = {

    Query: {
  
        repositories: (parent,args) => {
          
            return repo.getAllRepos(args.page);
         
        },
        singleRepos(parent, args) {
           
            return repo.getRepo(args.owner, args.name);
        }
    },
  
  };