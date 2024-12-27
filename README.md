

https://github.com/user-attachments/assets/baacb746-59c1-4277-bce6-32f01194bf91



## Getting started

To get started, follow these steps:

1. Install dependencies with `npm install`
2. Create and seed the database with `npm run db:init`
3. Start the development server with `npm run dev`

### Additional commands


- `npm run db:reset` to reset the database to the initial state
- `npm run db:seed` to seed the database
- `npm run db:studio` to open the Prisma Studio
- `npm run lint` to run ESLint
- `npm run lint:fix` to run ESLint and fix errors

## Project structure

- `app/` contains the front-end code
- `server/` contains the back-end code
- `prisma/` contains the database, schema, and migrations

**Front-end**
- [React Router](https://reactrouter.com/en/main) for routing
- [tRPC (React Query)](https://trpc.io/docs/client/react) for API calls
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Tailwind](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components - the entire catalog of components is available in `app/components/ui`
- [Vite](https://vite.dev/) as the build tool

**Back-end**
- [tRPC](https://trpc.io/) as the API framework
- [Prisma](https://www.prisma.io/) as the database ORM
- [SQLite](https://www.sqlite.org/) as the database
