import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getProducts = (req, res) => {
  
  if(req.query.bestsellers){
    const q = 
    "SELECT * FROM tbl_products WHERE product_typeid=?"

     db.query(q, [req.query.bestsellers], (err, data) => {
    if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });

  }else if(req.query.newarrivals){
    const q =
    "SELECT  * FROM tbl_products WHERE product_typeid=? ORDER By id DESC LIMIT 0,4";

    db.query(q, [req.query.newarrivals],(err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      }); 
  }else if(req.query.newarrivals2){
    const q =
    "SELECT * FROM tbl_products WHERE product_typeid=? ORDER By id DESC LIMIT 4,8";

    db.query(q, [req.query.newarrivals2],(err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });
  }else if(req.query.trending){
    const q =
    "SELECT  * FROM tbl_products WHERE product_typeid=? ORDER By id DESC LIMIT 0,4";

    db.query(q, [req.query.trending],(err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });    
  }else if(req.query.trending2){
    const q =
    "SELECT  * FROM tbl_products WHERE product_typeid=? ORDER By id DESC LIMIT 4,8";

    db.query(q, [req.query.trending2],(err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });
  }else if(req.query.toprated){
      const q =
      "SELECT  * FROM tbl_products WHERE product_typeid=? ORDER By id DESC LIMIT 0,4";

      db.query(q, [req.query.toprated],(err, data) => {
        if (err) return res.status(500).send(err);
          return res.status(200).json(data);
        });
  }else if(req.query.toprated2){
    const q =
    "SELECT  * FROM tbl_products WHERE product_typeid=? ORDER By id DESC LIMIT 4,8";

    db.query(q, [req.query.toprated2],(err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });

  }else if(req.query.newproducts){
    const q =
    "SELECT p.id,p.title,p.img,p.promotion,MAX(i.img_name) as imgname FROM tbl_products p LEFT JOIN tbl_product_img i ON p.id=i.product_id WHERE p.product_typeid=? GROUP BY p.title,p.img ORDER BY p.id DESC LIMIT ?";

    db.query(q, [req.query.newproducts, 12], (err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });

  }else if(req.query.cat){
    const q =
    "SELECT * FROM tbl_products WHERE cat=?";

    db.query(q, [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });

  }else{
    const q =
    "SELECT * FROM tbl_products";

    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });
  }
 
};

export const getProduct = (req, res) => {
  const q =
    "SELECT g.id, `username`, img, profilePic, `cat` FROM tbl_users u JOIN tbl_gallery g ON u.id = g.userid WHERE g.id = ? ";
    

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addProduct = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("ไม่รับรอง!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO tbl_blog(`title`, `desc`, `img`, `cat`, `createdAt`,`userid`) VALUES (?)";
      

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.createdAt,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deleteProduct = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM tbl_blog WHERE `id` = ? AND `userid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updateProduct = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE tbl_blog SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `userid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
