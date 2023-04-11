// const currentUser = require('../../services/auth/currentUser')
const { responseOk } = require("../../helpers/responses");
const currentUserController=(res,req,next)=>{
// const {_id:id}=req.user;
// const {_id}= req.params;
console.log('req.user',req.user)
// const user = currentUser(id)
res.json(responseOk("Success", 201, `Current user ${id} fined`, user));

}


module.exports=currentUserController