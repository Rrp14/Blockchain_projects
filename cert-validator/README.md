
# 🧾 Blockchain-based Certificate Validator (Local Hardhat Network)

A decentralized certificate verification system built on a private blockchain (Hardhat), allowing institutions to issue certificates and users to validate them using a unique certificate ID. Includes Firebase Authentication and a printable certificate UI.

---

```

```

---

## ⚙️ 1. Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/)
- [Firebase Console](https://console.firebase.google.com/) project with Email/Password auth enabled
- [Hardhat](https://hardhat.org/) for local Ethereum dev environment

---

## 📦 2. Install Node Modules

Navigate to the `backend/` directory and install dependencies:

```bash
cd backend
npm install
```

---

## 🔐 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Enable **Email/Password Authentication**.
3. Create a **Web App** and get your Firebase config.
4. Add Firebase config to `frontend/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  ...
};
```

---

## 🧠 4. Compile & Deploy Smart Contract Locally

```bash
# Compile contract
npx hardhat compile

# Start Hardhat local node in a separate terminal
npx hardhat node

# Deploy to local blockchain
npx hardhat run scripts/deploy.js --network localhost
```

This will output a contract address like:

```bash
Certificate contract deployed at: 0xABC...
```

Update the `.env` file in `backend/`:

```env
CONTRACT_ADDRESS=0xABC...           # From Hardhat deploy output
PRIVATE_KEY=0xYourLocalPrivateKey   # From Hardhat accounts
```

---

## 🔐 5. Institution Login Setup

Institution credentials are stored in `.env` initially:

```env
INSTITUTION_USERNAME=admin
INSTITUTION_PASSWORD=admin123
```

Once updated via frontend, they are saved hashed in `credentials.json`.

---

## 🧪 6. Run the Backend Server

Make sure you're in the `backend/` folder:

```bash
node server.js
```

Or use `nodemon` for live reload:

```bash
npx nodemon server.js
```

The server runs at: `http://localhost:3000`

---

## 🐳 7. Docker Deployment (Optional for Backend)

Make sure Docker is running. Then from the project root:

```bash
docker-compose up --build
```

This builds and starts the backend server in a container.

---

## 🌐 8. Frontend Usage

Simply open `frontend/index.html` in your browser. You can toggle between:

- **Institution Login** ➝ Issue certificate, update credentials.
- **User Login** ➝ Validate certificates by ID, print them.

No MetaMask or wallet connection is required – runs entirely on local blockchain and Firebase auth.

---

## 🧾 Certificate Format

Certificates contain:

- Certificate ID (unique hash)
- Student Name
- Course / Program
- Date
- Issuer Signature (blockchain validated)

You can **print** them in PDF via browser print or button click.

---

## 🔒 Security Notes

- Institution credentials are hashed and stored securely in `credentials.json`.
- Users authenticate via Firebase.
- All interactions with blockchain are done server-side using `ethers.js`.

---

## 🛠️ Technologies Used

- **Solidity** (Smart Contract)
- **Hardhat** (Blockchain dev environment)
- **Ethers.js** (Contract interaction)
- **Node.js + Express** (Backend API)
- **Firebase Authentication** (User login/registration)
- **HTML/CSS/JS** (Frontend)
- **Docker** (Optional deployment)

---

## 🧹 Future Improvements

- Admin dashboard for issued certificates
- Switch to IPFS for certificate data
- Deploy on testnet/mainnet for global access
- Role-based dashboard (institution vs user)

---

## 📬 Contact

Have questions or want to contribute? Open an issue or contact the maintainer.

---
