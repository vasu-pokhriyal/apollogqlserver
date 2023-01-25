const typeDef = `#graphql
  type Repository {
    name:String
    size:String
    owner:String
   
    
  }
 
  type webHook {
    id:String
    type:String
    name:String
    url:String
  }
  type singleRepo {
    name:String
    size:String
    owner:String
    isPrivate:String
    totalFiles:String
    webHooks:[webHook]
  }

 
  type Query {
    repositories(page:Int):[Repository]
    singleRepos(owner:String, name:String):singleRepo
  }
`;



export {typeDef}