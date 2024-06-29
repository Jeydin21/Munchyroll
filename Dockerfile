FROM node:lts-alpine
WORKDIR /munchyroll
COPY . .
ENV NEXT_PUBLIC_CONSUMET_API="https://consumet-public.vercel.app"
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000