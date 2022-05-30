import customerSchema from "./Schemas/customerSchema.js";

export async function customerValidate(req, res, next){
    const customer = req.body;

    const validate = customerSchema.validate(customer, {abortEarly: false});
        if(validate.error){
            console.log("erro", validate);
            return res.status(400).send(validate.error.details[0].message);
        }
    next();
}