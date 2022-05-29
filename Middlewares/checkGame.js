import connection from "../db.js";

export async function checkGameExistence(req, res, next){
    const game = req.body;
    
    next();
}