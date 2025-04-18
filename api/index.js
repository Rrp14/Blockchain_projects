const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { ethers } = require("ethers");
require("dotenv").config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route: serve landing page (e.g., home.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});

const CREDENTIALS_FILE = "./institution_credentials.json";

// Load smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("../backend/artifacts/contracts/Certificate.sol/Certificate.json").abi;
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Helper: Load saved credentials if exists
function getSavedCredentials() {
  if (fs.existsSync(CREDENTIALS_FILE)) {
    const data = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
    return JSON.parse(data);
  }
  return null;
}

// Institution login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const saved = getSavedCredentials();

  if (saved) {
    const isMatch = username === saved.username && (await bcrypt.compare(password, saved.password));
    return isMatch ? res.json({ success: true }) : res.status(401).json({ success: false });
  }

  if (
    username === process.env.INSTITUTION_USERNAME &&
    password === process.env.INSTITUTION_PASSWORD
  ) {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
});

// Update Institution credentials
app.post("/change-institution-password", async (req, res) => {
  const { newUsername, newPassword } = req.body;

  if (!newUsername || !newPassword) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const credentials = { username: newUsername, password: hashedPassword };

  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2));
  res.json({ success: true, message: "Credentials updated successfully" });
});

// Issue certificate
const sendCertificateEmail = require("./utils/sendEmail");

app.post("/issue", async (req, res) => {
  try {
    const { name, course, date, issuer, userEmail } = req.body;

    const id = generateCertificateId(name, date);
    const tx = await contract.issueCertificate(id, name, course, date, issuer);
    await tx.wait();

    const certData = { id, name, course, date, issuer };

    // Send email
    if (userEmail) {
      await sendCertificateEmail(userEmail, "Your Issued Certificate", certData);
    }

    res.json({ success: true, txHash: tx.hash, certificateId: id });
  } catch (error) {
    console.error("❌ Error issuing certificate:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// app.post("/issue", async (req, res) => {
//   try {
//     const {  name, course, date, issuer } = req.body;
//     const id = generateCertificateId(name, date); // Original implementation
//     const tx = await contract.issueCertificate(id, name, course, date, issuer);
//     await tx.wait();
//     res.json({ success: true, txHash: tx.hash, certificateId: id });
//   } catch (error) {
//     console.error("❌ Error issuing certificate:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// Validate certificate
app.get("/validate/:id", async (req, res) => {
  try {
    const certArray = await contract.getCertificate(req.params.id);
    const certificate = {
      id: certArray[0],
      name: certArray[1],
      course: certArray[2],
      date: certArray[3],
      issuer: certArray[4],
    };
    res.json({success:true,certificate});
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

function generateCertificateId(name, date) {
  const timestamp = new Date(date).getTime();
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit
  const namePart = name.toLowerCase().replace(/\s+/g, '').substring(0, 4); // 1st 4 chars
  return `${namePart}-${timestamp.toString(36)}-${randomPart}`;
}


app.listen(3000, () => console.log("✅ API running on http://localhost:3000"));

