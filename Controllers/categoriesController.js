import connection from "../db.js";

export async function getAllCategories(req, res){
    try {
        const categories = await connection.query("SELECT * FROM categories");
        res.status(200).send(categories.rows);
        
    } catch (error) {
        console.log("erro categorias", error);
        res.status(500).send("Ocorreu um erro ao buscar as categorias");
    }
}

export async function addCategories(req, res){
    const newCategory = req.body;
    console.log(req.body);
    try {
        const verifyCategory = await connection.query(`
            SELECT * FROM categories 
            WHERE "name"=$1`, [newCategory.name]);
        if(verifyCategory.rows.length !== 0) return res.status(409).send("Esta categoria já existe!!");
        
        const result = await connection.query(`
            INSERT INTO categories (name) 
            VALUES ($1);`, [newCategory.name]);
        
        res.sendStatus(201);
    } catch (error) {
        console.log("erro", error);
        res.status(500).send("erro ao registrar categoria");
        
    }
}