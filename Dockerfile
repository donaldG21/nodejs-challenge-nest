# Base image
FROM node:16 AS development

# Fast, disk space efficient package manager
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Create app directory
WORKDIR /usr/src/app

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN pnpm fetch

# Bundle app source
COPY --chown=node:node . .

RUN pnpm install --offline

# Use the node user from the image (instead of the root user)
USER node
