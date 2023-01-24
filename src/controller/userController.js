import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "JJoin" });

export const postJoin = async (req, res) => {
  const { email, username, password, name, loacation } = req.body;
  try {
    await User.create({
      email,
      username,
      password,
      name,
      loacation,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    const ERRMSG = error._message;
    return res.render("join", { pageTitle: "Jjoin", ERRMSG });
  }
};

export const Useredit = (req, res) => res.send("User edit");

export const Userremove = (req, res) => res.send("User remove");

export const login = (req, res) => res.send("login");

export const seeUser = (req, res) => res.send("seeUser");

export const logout = (req, res) => res.send("logout");
