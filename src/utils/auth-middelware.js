import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const cookie = req.headers.cookie;

  if (!cookie) {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Unauthorized: No token provided" }));
    return;
  }

  const token = cookie?.split("token=")[1]?.split(";")[0];

  if (!token) {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Unauthorized: No token provided" }));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Unauthorized: Invalid token" }));
  }
}
