import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
app.use(cors({
    origin: "https://form-vk.vercel.app/", 
    methods: "GET,POST",
    credentials: true
}));
app.use(express.json());


console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);
console.log("DB DATABASE:", process.env.DB_DATABASE);
console.log("PORT:", process.env.PORT);

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Handle MySQL connection errors and reconnect
function handleDisconnect() {
    db.connect(err => {
        if (err) {
            console.error("Database connection failed:", err);
            setTimeout(handleDisconnect, 5000); // Try reconnecting after 5s
        } else {
            console.log("Connected to MySQL!");
        }
    });

    db.on("error", err => {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection lost. Reconnecting...");
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect(); // Start connection handling

// Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Get All Users
app.get("/users", (req, res) => {
    const q1 = "SELECT * FROM users";
    db.query(q1, (err, result) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Failed to fetch users", details: err });
        }
        return res.status(200).json(result);
    });
});

// User Signup
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const q1 = "INSERT INTO users(email, password) VALUES(?, ?)";
    db.query(q1, [email, password], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Failed to insert user", details: err });
        }
        return res.status(201).json({ message: "User added successfully", insertId: result.insertId });
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
