export const getJoin = (req, res) => res.render("join", { pageTitle: "JJoin" });
export const postJoin = (req, res) => res.redirect("/");
export const Useredit = (req, res) => res.send("User edit");
export const Userremove = (req, res) => res.send("User remove");
export const login = (req, res) => res.send("login");
export const seeUser = (req, res) => res.send("seeUser");
export const logout = (req, res) => res.send("logout");
