import { response } from "express";
import { db } from "../db.js";
import bcrypt, { hash } from "bcrypt";
const salt = 10;

export const register = (req, res) => {
    const sql = "INSERT INTO tbl_users (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err,hash) => {
        if(err) return res.json({Error: "เกิดปัญหาในการเข้ารหัสสำหรับ password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error:"การอินเสิรทข้อมูลมีปัญหาบน Server"});
            return res.json({Status: "ได้สร้างบัญชีผู้ใช้ใหม่สำเร็จแล้ว"});
        });
    });    
};

export const login = (req, res) => {
    const sql = "SELECT * FROM tbl_users WHERE email = ?"
    db.query(sql, [req.body.email], (err,data) => {
        if(err) return res.json({Error: "การเข้าสู่ระบบเกิดปัญหาใน Server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err,response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    return res.json({Status: "เข้าสู่ระบบสำเร็จ"});
                }else{
                    return res.json({Error: "รหัสผ่านไม่ถูกต้อง"});
                }
            });
        }else{
            return res.json({Error: "ไม่มีชื่อผู้ใช้หรืออีเมล์นี้อยู่ในระบบ"});
        }
    });
};

export const logout = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?"
};

export const users = (req, res) => {
    const sql = "SELECT * FROM tbl_users";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Error:"การเรียกข้อมูล User มีปัญหา"});
        return res.json(result);
    });    
};