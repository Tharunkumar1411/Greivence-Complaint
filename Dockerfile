FROM node:15.13-alpine

WORKDIR /Greivence-Complaint

ENV PATH = "./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

CMD ["npm", "start"]

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=grievence /Greivence-Complaint/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]