import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getCategorys = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM tbl_category WHERE cat=?"
    : "SELECT * FROM tbl_category";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getCategory = (req, res) => {
  const q =
    "SELECT g.id, `username`, img, profilePic, `cat` FROM tbl_users u JOIN tbl_gallery g ON u.id = g.userid WHERE g.id = ? ";
    

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addCategory = (req, res) => {
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

export const deleteCategory = (req, res) => {
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

export const updateCategory = (req, res) => {
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
