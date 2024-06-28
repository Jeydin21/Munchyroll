FROM node:lts-alpine
WORKDIR /munchyroll
COPY . .
ENV NEXT_PUBLIC_CONSUMET_API=https://localhost:3001
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
