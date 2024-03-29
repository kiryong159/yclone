import User from "../models/User";
import Video from "../models/Video";
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
  req.flash("info", "Hello~");
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.flash("info", "bye~");
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
    req.flash("info", "Hello~");
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
// res.status( ) 200->OK
// - 400(Bad Request): 서버가 요청의 구문을 인식하지 못할 때 발생한다
// - 404(Not Found): 서버가 요청한 페이지를 찾을 수 없을 때  발생한다

export const loginKakao = (req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  // http://localhost 빼면 작동안됨 (카카오 api 페이지에 등록된것만 사용가능)
  // 카카오 api 페이지에서 동의항목을 체크해야  scope작동함
  const config = {
    response_type: "code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: "https://ggrongsyclone.fly.dev/user/kakaofinish",
    scope: "account_email,profile_nickname",
  };
  const params = new URLSearchParams(config).toString();
  res.redirect(`${baseURL}?${params}`);
};

export const finishKakao = async (req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/token";
  //Host: kauth.kakao.com + /oauth/token +@를 POST하라는 뜻같음
  const config = {
    //Required O 인것들
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: "https://ggrongsyclone.fly.dev/user/kakaofinish",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "post",
      headers: {
        Content_type: "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  //console.log(tokenRequest);
  if ("access_token" in tokenRequest) {
    const baseURL = "https://kapi.kakao.com/v2/user/me";
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch(baseURL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    //.json() 안해주면 데이터 이상한거 줌
    console.log(userRequest);
    // console.log(userRequest.kakao_account.profile.nickname);
    let user = await User.findOne({
      email: userRequest.kakao_account.email,
    });
    if (!user) {
      user = await User.create({
        email: userRequest.kakao_account.email,
        username: userRequest.id,
        password: "",
        socialOnly: true,
        name: userRequest.kakao_account.profile.nickname,
        location: userRequest.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    req.flash("info", "Hello~");
    return res.redirect("/");
  } else {
    //엑세스 토큰없을때
    return res.redirect("/");
  }
};

export const getUseredit = (req, res) => {
  return res.render("user-edit", { pageTitle: "User Edit" });
};

export const postUseredit = async (req, res) => {
  const _id = req.session.user._id;
  const { avatarUrl } = req.session.user;
  const { email, username, location, name } = req.body;
  const { file } = req;

  if (req.session.user.username !== username) {
    const findUser = await User.exists({ username: username });
    if (findUser) {
      req.flash("error", "username중복입니다.");
      return res.redirect("/");
    }
  }
  if (req.session.user.email !== email) {
    const findEmail = await User.findOne({ email: email });
    console.log(findEmail);
    if (findEmail) {
      req.flash("error", "email중복입니다.");
      return res.redirect("/");
    }
  }
  const isFly = process.env.NODE_ENV === "production";
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      location,
      name,
      username,
      email,
      avatarUrl: file ? file.location : avatarUrl,
    },
    { new: true }
  );

  req.session.user = updatedUser;
  req.flash("info", "변경 성공");

  return res.redirect("/");
};

export const getChangePW = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "깃헙,카카오 아이디는 비밀번호가 없습니다.");
    return res.redirect("/");
  }
  return res.render("changepw", { pageTitle: "Change Password" });
};

export const postChangePW = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPW, newPW, newPW1 },
  } = req;

  const user = await User.findById(_id);
  const comparePW = await bcrypt.compare(oldPW, user.password);
  if (!comparePW) {
    req.flash("error", "이전 비밀번호가 틀렸습니다.");
    return res.status(400).redirect("changepw");
  }
  if (newPW !== newPW1) {
    req.flash("error", "새로운비밀번호/비밀번호확인 이 틀렸습니다.");
    return res.status(400).redirect("changepw");
  }
  req.flash("info", "변경성공");
  user.password = newPW;
  await user.save();
  // save를 해야지 비밀번호가 hash화 됨
  // 만약 위에서 user.password를 사용하지않고 session에서 찾은 password를 사용했다면
  // 밑에서 req.session.user.password = newpw 같이 업데이트를 해줘야 바뀜
  // 비밀번호 변경후 로그아웃으로 보내버리면 session을 파괴해서 상관없는듯??
  // findbyid update 하면 "pre" save가 작동안해서 일케하는듯.
  return res.redirect("/");
};

export const seeUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: { path: "owner", model: "user" },
  });
  if (!user) {
    req.flash("error", "유저를 찾을수 없습니다.");
    return res.status(404).render("404");
  }
  return res.render("profile", {
    pageTitle: `${user.name} 의 Pro file`,
    user,
  });
};
