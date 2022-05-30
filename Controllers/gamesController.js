import connection from "./../db.js";

export async function getGames(req, res){
    const nameGame = req.query.name;
    console.log("recebo", nameGame);

    const filteredGame = [];

    try {
        const games = await connection.query(`
            SELECT games.*, categories.name as "categoryName" 
            FROM games 
            JOIN categories 
            ON games."categoryId" = categories.id;`);

        if (nameGame){
            let game = new RegExp(`^${nameGame.toLowerCase()}`);
            for (let i = 0; i < games.rows.length; i++){
                if(game.test(games.rows[i].name.toLowerCase())){
                    filteredGame.push(games.rows[i]);
                }
            }
            res.status(200).send(filteredGame);
        }
        else{
            res.status(200).send(games.rows);
        }

    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao buscar jogos");
    }
}

export async function addGame(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    
    try {
        const registerGame = await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);`, 
        [name, image, stockTotal, categoryId, pricePerDay]);

        res.status(201);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao cadastrar jogo");
    }

}