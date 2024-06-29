FROM node:lts-alpine
WORKDIR /munchyroll
COPY . .
ENV NEXT_PUBLIC_CONSUMET_API="https://consumet-public.vercel.app"
RUN npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000