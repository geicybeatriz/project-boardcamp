import connection from "./../db.js";

export async function addCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try {
        const checkCPF = await connection.query(`
        SELECT * 
        FROM customers 
        WHERE cpf=$1`, [cpf]);
        if(checkCPF.rows.length !== 0){
            return res.status(409).send("Este usuário já está cadastrado");
        }

        await connection.query(`
            INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4);`, 
            [name, phone, cpf, birthday]);

        res.status(201).send("cadastro realizado com sucesso");
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao cadastrar cliente");
    }
}

export async function getAllCustomers(req, res){
    const cpf = req.query.cpf;
    const filterCPF = [];

    try {
        const customers = await connection.query(`SELECT * FROM customers;`);

        if(cpf){
            let listCpf = new RegExp(`^${cpf}`);
            for (let i = 0; i < customers.rows.length; i++){
                if(listCpf.test(customers.rows[i].cpf)){
                    filterCPF.push(customers.rows[i]);
                }
            }
            res.status(200).send(filterCPF);
        }
        else{
            res.status(200).send(customers.rows);
        }        
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao listar clientes");
    }

}

export async function getCustomerById(req, res){
    const id = parseInt(req.params.id);

    try {
        if(isNaN(id)) return res.status(400).send("id inválido");

        const customers = await connection.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
        if(customers.rows.length === 0) return res.status(404).send("usuário não encontrado");

        res.status(200).send(customers.rows);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao buscar cliente");
    }
}

export async function updateCustomer(req, res){
    const id = parseInt(req.params.id);
    const {name, phone, cpf, birthday} = req.body;

    try {
        if(isNaN(id)) return res.status(400).send("id inválido");

        const checkCPF = await connection.query(`
            SELECT * 
            FROM customers 
            WHERE cpf=$1 AND id!=$2`, [cpf, id]);
        if(checkCPF.rows.length !== 0){
            return res.status(409).send("Este usuário já está cadastrado");
        }

        await connection.query(`
            UPDATE customers   
            SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5;`, 
            [name, phone, cpf, birthday, id]);
        
        res.sendStatus(200);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao atualizar os dados do cliente");
    }
}