FROM node:lts-alpine
WORKDIR /munchyroll
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000