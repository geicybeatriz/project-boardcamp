import connection from "./../db.js";

//TODO: criar função que valida os dados do cliente, 
// pesquisar por regex que possam ajudar no cpf, telefone
//estrutura do cliente
// procurar por query strings, pq eu esqueci kkkkkkkk
const customer = {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
}

// criar funções para o endpoint
export async function getAllCustomers(req, res){

}

export async function getCustomerById(req, res){
    
}

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

export async function updateCustomer(req, res){

}