#!/bin/bash
set -e

# Change to backend folder and start Hardhat node in background
cd /cert-validator/backend
echo "Starting Hardhat node..."
npx hardhat node &

# Wait for the node to fully start
sleep 5

# Deploy contracts (ensure we're in the backend folder)
echo "Deploying contracts..."
npx hardhat run scripts/deploy.js --network localhost

# Change to API folder and start the API server
cd /cert-validator/api
echo "Starting API server..."
node index.js
