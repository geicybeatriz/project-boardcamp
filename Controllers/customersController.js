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
    

}

export async function updateCustomer(req, res){

}