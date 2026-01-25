# Vite will pick these up automatically if you're doing `npm run build`

# Build the React app
FROM node:22-slim AS frontend-builder
WORKDIR /app

# Update system packages to reduce vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get clean

ARG EARLGREY_LAT
ARG EARLGREY_LON

# Copy package files and install dependencies
COPY earlgrey.web/package.json earlgrey.web/package-lock.json ./
RUN npm install

# Remember to grab the backend url
ENV VITE_BACKEND_URL=

# Copy the rest (dist, node_modules, obj are excluded via .dockerignore)
COPY earlgrey.web ./
RUN npm run build

# ----------------------------------------------------------------------------------

# Build the backend
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-builder
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["EarlGrey.API/EarlGrey.API.csproj", "EarlGrey.API/"]
RUN dotnet restore "EarlGrey.API/EarlGrey.API.csproj"
COPY . .
WORKDIR "/src/EarlGrey.API"
RUN dotnet publish "EarlGrey.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# ----------------------------------------------------------------------------------

# Final stage: Combine NGINX and ASP.NET backend
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Copy the backend publish output
COPY --from=backend-builder /app/publish .

# Install NGINX
RUN apt-get update && apt-get install -y nginx && apt-get clean

# Copy the React build to the NGINX html directory
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Configure NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 9090

# Start NGINX and ASP.NET backend
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["sh", "/start.sh"]
