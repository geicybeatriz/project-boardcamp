import rentalSchema from "./Schemas/rentalSchema.js";

import connection from "../db.js";

export async function rentalValidate(req, res, next){
    const validation = rentalSchema.validate(req.body, {abortEarly: false});
    if(validation.error){
        console.log("erro", validate);
        return res.status(400).send(validate.error.details[0].message);
    }

    try {
        const customers = await connection.query(`
            SELECT * FROM customers WHERE id=$1;`, 
            [req.body.customerId]);
        if(customers.rows.length === 0) return res.status(400).send("usuário não encontrado");

        const games = await connection.query(`
            SELECT * FROM games WHERE id=$1;`, 
            [req.body.gameId]);
        if(games.rows.length === 0) return res.status(400).send("usuário não encontrado");

        const verifyGameAvailability = await connection.query(`
            SELECT "stockTotal" FROM games WHERE id=$1;`, 
            [req.body.gameId]);
        if(verifyGameAvailability.rows[0].stockTotal < 1) return res.status(400).send("o jogo não está disponível");

        res.status(200).send("passei na validação");

    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao cadastrar cliente");
    }

    next();
}