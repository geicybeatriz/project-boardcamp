import { categorySchema } from "./Schemas/categoriesSchema.js";

export async function categoryValidation(req, res, next){
    const category = req.body;
    const validate = categorySchema.validate(category, {abortEarly: false});
        if(validate.error){
            console.log(validate);
            return res.status(422).send(validate.error.details[0].message);
        }
    next();
}

