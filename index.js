import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// ROUTES
import userSignup from "./src/user/userSignup.js";
import userLogin from "./src/user/userLogin.js";
import redeemStars from "./src/user/redeemStars.js";
import starHistory from "./src/user/starHistory.js";

import adminLogin from "./src/admin/adminLogin.js";
import approveStars from "./src/admin/approveStars.js";
import verifyBill from "./src/admin/verifyBill.js";

app.use("/api/user/signup", userSignup);
app.use("/api/user/login", userLogin);
app.use("/api/user/redeem", redeemStars);
app.use("/api/user/history", starHistory);

app.use("/api/admin/login", adminLogin);
app.use("/api/admin/approve", approveStars);
app.use("/api/admin/verify", verifyBill);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});