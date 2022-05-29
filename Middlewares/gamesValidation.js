import gameSchema from "./Schemas/gameSchema.js";

export async function gameValidation(req, res, next){
    const game = req.body;
    if((game.name.length === 0) || (game.stockTotal <= 0) || (game.pricePerDay <= 0) || (!game.categoryId)){
        return res.sendStatus(400);
    } 

    const validate = gameSchema.validate(req.body, {abortEarly: false});
        if(validate.error){
            console.log(validate);
            return res.status(422).send(validate.error.details[0].message);
        }
    console.log("passou", req.body);
    next();
}