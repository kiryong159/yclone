import User from "../models/User";
import fetch from "node-fetch";
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
  const user = await User.findOne({ username, socialOnly: false });
  let ERRMSG = "존재하지 않는 계정입니다.";
  if (!user) {
    return res.status(400).render("login", { pageTitle: "Login", ERRMSG });
  }
  const comparePW = await bcrypt.compare(password, user.password);
  //해쉬 값 서로비교함                      ↑유저입력 PW   ↑DB에 있는 비밀번호
  if (!comparePW) {
    ERRMSG = "비밀번호가 틀렸습니다.";
    return res.status(400).render("login", { pageTitle: "Login", ERRMSG });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const Useredit = (req, res) => res.send("User edit");

export const seeUser = (req, res) => res.send("seeUser");

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const loginGithub = (req, res) => {
  const baseURL = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finishGithub = async (req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRETS,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const ApiUrl = "https://api.github.com";
    const userRequest = await (
      await fetch(`${ApiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    //console.log(userRequest);
    const emailRequest = await (
      await fetch(`${ApiUrl}/user/emails`, {
        headers: { Authorization: `token ${access_token}` },
      })
    ).json();
    // console.log(emailRequest);
    const emailObj = emailRequest.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        avatarUrl: userRequest.avatar_url,
        username: userRequest.login,
        password: "",
        socialOnly: true,
        name: userRequest.name,
        location: userRequest.location,
      });
    }
    // DB와 깃헙의 이메일이 동일한 사람이 나타나면 로그인 시켜줌.
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
// res.status( ) 200->OK
// - 400(Bad Request): 서버가 요청의 구문을 인식하지 못할 때 발생한다
// - 404(Not Found): 서버가 요청한 페이지를 찾을 수 없을 때  발생한다

export const loginKakao = (req, res) => {
  res.redirect("/");
};
