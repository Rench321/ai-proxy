# Use the official Bun image as a base
FROM oven/bun:1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and the lock file to leverage Docker layer caching
COPY package.json bun.lock ./

# Install dependencies using Bun. --frozen-lockfile ensures that
# the exact versions from the lock file are used.
RUN bun install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["bun", "index.ts"]
