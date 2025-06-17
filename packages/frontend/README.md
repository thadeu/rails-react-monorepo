# Frontend

A part of the monorepo that implements the frontend of the CSV importer application.


## Stack

- pnpm
- react@19
- react-router
- typescript
- tailwindcss + daisyui
- vite

### Installation

Install the dependencies using PNPM to have better performance

```bash
pnpm i
```

### Development

Just start using dev script

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```