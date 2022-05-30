import connection from "../db.js";

export async function insertRental(req, res){
    const {customerId, gameId, daysRented} = req.body;

    try {
        const rentDate = new Date();

        const pricePerDay = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1`,[gameId]);
        const originalPrice = (pricePerDay.rows[0].pricePerDay)*daysRented;   

        await connection.query(`
            INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, rentDate, daysRented, null, originalPrice, null])

        res.status(201);

    } catch (error) {
        console.log("erro", error);
        res.status(500);
    }
}

export async function getRentals(req, res){
    const {customerId, gameId} = req.query;

    try {
        if(customerId){
            const rentalListUser = await connection.query(`SELECT * FROM rentals WHERE "customerId"=$1;`,
            [customerId]);
            if(rentalListUser.rows.length === 0) return res.status(404).send("usuário não encontrado");
            return res.send(rentalListUser.rows);

        } else if(gameId){
            const rentalListGame = await connection.query(`SELECT * FROM rentals WHERE "gameId"=$1;`,
            [gameId]);
            if(rentalListGame.rows.length === 0) return res.status(404).send("jogo não encontrado");
            return res.send(rentalListGame.rows);

        } else{
            const rentalList = await connection.query(`
                SELECT rentals.*, 
                        games.id as "gameId", 
                        games.name as "gameName", 
                        games."categoryId" as "gameCategoryId", 
                        customers.name as "customerName", 
                        customers.id as "customerId", 
                        categories.id as "categoryId", 
                        categories.name as "categoryName" 
                FROM rentals
                JOIN games
                ON rentals."gameId" = games.id
                JOIN customers
                ON rentals."customerId" = customers.id
                JOIN categories
                ON games."categoryId" = categories.id`);
            if(rentalList.rows.length === 0) return res.status(404).send("Ainda não há registros de aluguéis de jogos");

            const result = rentalList.rows.map((rental) => {
                return ({
                    id:rental.id,
                    customerId: rental.customerId,
                    gameId: rental.gameId,
                    rentDate: rental.rentDate,
                    daysRented: rental.daysRented,
                    returnDate: rental.returnDate,
                    originalPrice:rental.originalPrice,
                    delayFee: rental.delayFee,
                    customer: {
                        id: rental.customerId,
                        name: rental.customerName
                    },
                    game: {
                        id: rental.gameId,
                        name: rental.gameName,
                        categoryId: rental.categoryId,
                        categoryName: rental.categoryName
                    }
                })
            });
            res.status(200).send(result);
        }
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao buscar aluguéis");
    }
}

export async function finishRental(req, res){
    const id = parseInt(req.params.id);
    try {
        const checkRental = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if(checkRental.rows.length === 0 || checkRental.rows[0].returnDate !== null){
            return res.status(400).send("aluguel não encontrado ou já está finalizado");
        }

        const checkGame = await connection.query(`
        SELECT rentals.*, games."pricePerDay" 
        FROM rentals 
        JOIN games
        ON rentals."gameId" = games.id WHERE rentals.id=$1;`, [id]);
        
        const deliveryDateInUTC = new Date();
        const deliveryDateReal = new Date().getTime();
        const dayInMS = 86400000;

        const rentalData = checkGame.rows[0];
        const realReturnDate = (rentalData.rentDate.getTime())+(rentalData.daysRented*dayInMS);
        const daysDelayed = Math.round((realReturnDate-deliveryDateReal)/dayInMS);
        const delayFee = daysDelayed*(rentalData.pricePerDay);

        await connection.query(`
        UPDATE rentals 
        SET "returnDate"=$1, "delayFee"=$2 
        WHERE id=$3;`,
        [deliveryDateInUTC, delayFee, id]);

        res.sendStatus(200);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao finalizar aluguéis");
    }

}
export async function deleteRental(req, res){
    const id = parseInt(req.params.id);

    try {
        const checkRental = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
        if(checkRental.rows.length === 0 || checkRental.rows[0].returnDate !== null){
            return res.status(400).send("aluguel não encontrado ou já está finalizado");
        }
        await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
        res.sendStatus(200);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao deletar aluguel");
    }
}