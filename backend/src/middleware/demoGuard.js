export function demoGuard(req, res, next) {
  const demo = process.env.DEMO_MODE === "true";
  const writing = ["POST","PUT","PATCH","DELETE"].includes(req.method);
  if (!demo || !writing) return next();

  
  const token = req.headers["x-demo-admin"];
  if (token && token === process.env.DEMO_ADMIN_TOKEN) return next();

  return res.status(403).json({ error: "Demo mode: write operations are disabled." });
}