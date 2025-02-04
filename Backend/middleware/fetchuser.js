const jwt=require('jsonwebtoken');
const JWT_SECRET = "Inotebook$madeby@Thour&it'sformakingnotes";
const fetchuser=(req,res,next)=>{
    let success=false;
    // Get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({success,error:"token not found"});
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(200).send({success,error:"Please authenticate using a valid token"});
    }
}
module.exports=fetchuser;