# Next.js CI/CD Boilerplate with GitHub Actions

This is a **Next.js boilerplate** designed for **automated CI/CD** using **GitHub Actions** and **Docker**. It simplifies the deployment process by automatically building and pushing Docker images to **GitHub Container Registry (GHCR)**.

## 🚀 Features

- **Next.js 15** with **React 19**
- **CI/CD pipeline** powered by **GitHub Actions**
- **Dockerized** for easy deployment
- **Multi-arch image build** (`linux/amd64`, `linux/arm64`)
- **Environment variables support** via `build-args`
- **Uses NPM as the default package manager**

## 🛠️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Jszigeti/nextjs-ci-cd-boilerplate.git
cd nextjs-ci-cd-boilerplate
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run in development mode

```bash
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4️⃣ Build the project

```bash
npm run build
```

## 📜 Available Scripts

This project includes several useful commands:

| Command               | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| `npm run dev`         | Runs Next.js in development mode with TurboPack                                        |
| `npm run build`       | Builds the application for production                                                  |
| `npm run start`       | Starts the production server                                                           |
| `npm run lint`        | Runs ESLint to check for code issues                                                   |
| `npm run format`      | Formats the codebase using Prettier                                                    |
| `npm run clean`       | Removes `.next`, `node_modules`, and `package-lock.json`, then reinstalls dependencies |
| `npm run prebuild`    | Runs `lint` and `format` before building the project                                   |
| `npm run postinstall` | Displays a success message after dependencies installation                             |

## 📦 Docker Support

### Build and run the Docker container locally

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

### Dockerfile Overview

The `Dockerfile` is optimized for **Next.js standalone mode**, ensuring a lightweight and efficient build.

#### **Using Build Arguments**

You can pass **environment variables** during the build process using `build-args`. Example:

```bash
docker build -t nextjs-app \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com .
```

These variables are defined in the `Dockerfile` as:

```dockerfile
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
```

This ensures that **sensitive credentials are not baked into the image** but rather passed dynamically during deployment.

## 🚀 GitHub Actions CI/CD

This project includes a **GitHub Actions workflow** (`.github/workflows/docker-build.yml`) that automatically builds and pushes Docker images on:

- **On push to or merge into `develop`** → Builds and pushes an image with the `dev` tag
- **On push to or merge into `main`** → Builds and pushes an image with the `prod` tag

### Workflow Overview

1. **Builds the Next.js app** using `next build`
2. **Creates a multi-arch Docker image** (`linux/amd64`, `linux/arm64`)
3. **Pushes the image to GHCR** (`ghcr.io/your-username/your-repo:dev` or `prod`)

#### 🔧 **GitHub Actions Workflow**

```yaml
name: Build & Push Prod Image

on:
  push:
    branches:
      - main

jobs:
  build-prod:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Determine Tag
        id: set-tag
        run: |
          REPO_NAME=${GITHUB_REPOSITORY,,}
          echo "REPO_NAME=$REPO_NAME" >> $GITHUB_ENV

      - name: Build and Push Prod Image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          platforms: linux/amd64,linux/arm64
          tags: ghcr.io/${{ env.REPO_NAME }}:prod
          build-args: |
            NEXT_PUBLIC_API_BASE_URL=${{ secrets.NEXT_PUBLIC_API_BASE_URL }}
```

## 📜 .dockerignore Configuration

To keep the image lightweight, we exclude unnecessary files:

```
Dockerfile
.dockerignore
node_modules
npm-debug.log*
yarn.lock
yarn-error.log
pnpm-lock.yaml
.next
out
.git
.gitignore
.github
.DS_Store
.vscode
.idea
```

## 🏆 Best Practices

### 1️⃣ Use Watchtower for Automated Deployment
Watchtower can automatically update running containers when a new image is pushed to your registry.
```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower --interval 30
```

### 2️⃣ Use Portainer for Easier Management
Portainer provides a web-based UI for managing Docker containers, images, networks, and volumes.
```bash
docker run -d \
  --name=portainer \
  -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

## 📌 Contributing

Feel free to submit **pull requests** or **open issues** if you find a bug or want to enhance the project!

## 📜 License

This project does not have a specific license. Feel free to reuse and adapt the code as needed for your own projects!

---

🎉 **Happy coding with Next.js & GitHub Actions!** 🚀