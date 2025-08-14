import express from "express";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

// مسیرهای Auth
app.use("/auth", authRoutes);

// اجرای سرور
app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
});
