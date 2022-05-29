import connection from "../db.js";

export async function checkGameExistence(req, res, next){
    const game = req.body;
    try {
        const verifyGame = await connection.query(`SELECT * FROM games WHERE "name"=$1`, [game.name]);
        if(verifyGame.rows.length !== 0) return res.status(409).send("Esta jogo já existe no banco de dados!!");

        const verifyGameCategory = await connection.query(`SELECT * FROM categories WHERE "id"=$1`, [game.categoryId]);
        if(verifyGameCategory.rows.length === 0) return res.status(400).send("a categoria não existe no banco de dados");
        
        res.sendStatus(200);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("erro na checagem do game");
    }
        
    next();
}