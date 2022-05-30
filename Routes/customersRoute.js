import { addCustomer, getAllCustomers, getCustomerById, updateCustomer} from "../Controllers/customersController.js";
import { customerValidate } from "../Middlewares/CustomerValidation.js";
import { Router } from "express";

const customerController = Router();
customerController.get("/customers", getAllCustomers);
customerController.get("/customers/id", getCustomerById);
customerController.post("/customers", customerValidate, addCustomer);
customerController.put("/customers/:id", updateCustomer);

export default customerController;