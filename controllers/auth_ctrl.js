import { db } from "../db.js";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
 
};

export const login = (req, res) => {
  
};

export const logout = (req, res) => {
 
};

export const users = (req, res) => {
    const sql = "SELECT * FROM tbl_login";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Error:"การเรียกข้อมูล User มีปัญหา"});
        return res.json(result);
    });    
};