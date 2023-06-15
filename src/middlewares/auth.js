import supabase from "../../config/supabase.config.js";

const verifyUser = async (req, res, next) => {
  const { access_token } = req.headers;
  // console.log(access_token, req.headers, "access token");

  if (!access_token) {
    return res.status(401).json({ error: "Forbidden" });
  }

  const { data, error } = await supabase.auth.getUser(access_token);

  if (error || !data) {
    console.log(error, user);
    return res.status(401).json({ error: "Forbidden" });
  }

  req.user = data.user;

  next();
};

export { verifyUser };
