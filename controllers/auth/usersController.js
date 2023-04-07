const { responseOk } = require("../../helpers/responses");


const usersController=(req, res, next)=>{

try{
  
  console.log('req',req)
  res.json(responseOk("Success", 201, "Text message created", ));

}
catch(error) {
  next(error);
}
}
module.exports={
    usersController}