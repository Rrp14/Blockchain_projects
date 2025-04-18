FROM node:18

WORKDIR /cert-validator

# Copy entire project into container
COPY . .

# Install backend (Hardhat) dependencies
WORKDIR /cert-validator/backend
RUN npm install

# Install API dependencies
WORKDIR /cert-validator/api
RUN npm install

# Go back to root
WORKDIR /cert-validator

# (Optional) Debug: Show the content of hardhat.config.js
RUN echo "hardhat.config.js content:" && cat /cert-validator/backend/hardhat.config.js

# Expose the API port (and Hardhat RPC port if needed)
EXPOSE 3000
EXPOSE 8545

# Copy entrypoint script and set execute permission
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Use the entrypoint script as the container command
CMD ["bash", "entrypoint.sh"]
