import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "JJoin" });

export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const usernameexsist = await User.exists({
    // $OR ->둘중 하나만 TRUE 가 되면 TRUE임
    $or: [{ username }, { email }],
  });
  if (password !== password2) {
    const ERRMSG = "비밀번호와 비밀번호 확인이 서로 다릅니다.";
    return res.status(400).render("join", { pageTitle: "JJoin", ERRMSG });
  }
  if (usernameexsist) {
    const ERRMSG = "중복된 유저이름 또는 이메일 입니다.";
    return res.status(400).render("join", { pageTitle: "JJoin", ERRMSG });
  }
  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    ERRMSG = error._message;
    return res.status(400).render("join", { pageTitle: "JJoin", ERRMSG });
  }
};

export const getlogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postlogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const comparePW = await bcrypt.compare(password, user.password);
  //해쉬 값 서로비교함                      ↑유저입력 PW   ↑DB에 있는 비밀번호

  let ERRMSG = "존재하지 않는 계정입니다.";
  if (!user) {
    return res.status(400).render("login", { pageTitle: "Login", ERRMSG });
  }
  if (!comparePW) {
    ERRMSG = "비밀번호가 틀렸습니다.";
    return res.status(400).render("login", { pageTitle: "Login", ERRMSG });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const Useredit = (req, res) => res.send("User edit");

export const Userremove = (req, res) => res.send("User remove");

export const seeUser = (req, res) => res.send("seeUser");

export const logout = (req, res) => res.send("logout");

// res.status( ) 200->OK
// - 400(Bad Request): 서버가 요청의 구문을 인식하지 못할 때 발생한다
// - 404(Not Found): 서버가 요청한 페이지를 찾을 수 없을 때  발생한다
