import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getNavSubLinkss = (req, res) => {
  const q = 
     "SELECT * FROM tbl_navbarsublinks WHERE linksid = ?"
  db.query(q, 3, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getNavSubLinks = (req, res) => {
  const q =
    "SELECT * FROM tbl_navbarsublinks WHERE linksid = ? ";   

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addNavSubLinks = (req, res) => {
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

export const deleteNavSubLinks = (req, res) => {
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

