import bcrypt from "bcrypt";
import db from "../db.js";

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res
      .status(400)
      .send({ message: "Full name, email, and password are required" });
  }

  try {
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(409).send({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
      [fullname, email, hashedPassword]
    );

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  if (!loginEmail || !loginPassword) {
    return res
      .status(400)
      .send({ message: "Email and password are required" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [loginEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const foundUser = result.rows[0];

    // Compare hashed password


    const match = await bcrypt.compare(loginPassword, foundUser.password_hash);
    if (!match) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    res.status(200).send({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).send({ message: "Internal server error" });
  }
};
