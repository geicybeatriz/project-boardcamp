import { categorySchema } from "./Schemas/categoriesSchema.js";

export async function categoryValidation(req, res, next){
    const category = req.body.name;
    if(category.length === 0) return res.sendStatus(400);

    const validate = categorySchema.validate(req.body, {abortEarly: false});
        if(validate.error){
            console.log(validate);
            return res.status(422).send(validate.error.details[0].message);
        }
    next();
}

