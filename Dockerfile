# FROM node:18

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# CMD ["npm", "start"]

# EXPOSE 3000

FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
