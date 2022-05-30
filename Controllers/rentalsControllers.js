import connection from "../db.js";

// {
//     id: 1,
//     customerId: 1,
//     gameId: 1,
//     rentDate: '2021-06-20',    // data em que o aluguel foi feito
//     daysRented: 3,             // por quantos dias o cliente agendou o aluguel
//     returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
//     originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
//     delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
//   }


//post /rentals
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

//get /rentals
export async function getRentals(req, res){
    try {
        const rentalList = await connection.query(`SELECT * FROM rentals`);
        res.status(200).send(rentalList.rows);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao buscar aluguéis");
    }

}