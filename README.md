# Servly

Servly is a fullstack application which manages huge amount of data and renders it effectively.

## Features

- Data is fetched parallely for the next page.
- Implemnted virtualization to render 50,0000 rows of data.
- Levaraged shadcn to create awesome ui.
- Implemented rate limit on the api.
- Data is cached and revalidated to ensure speed and data consistancy.

## Technologies

- Express js for building the backend.
- Prisma for schema generation and kyseley as query builder
- Used Next js, tanstack query, tailwind css, for frontend.
- Postgres and Redis for data storing.
- Zod for data validation.
- Typescript.
- Jest for testing.
- Turborepo for managing the repository.

## Chalanges faced

- Setting up the Turborepo
  It took some time to understand the overall setup and idea of turborepo, but it was worth it!
- Implemnting a good type safety in all parts of the repository.
- Rendering 50k rows simultaneously on frontend.
  To achieve this I implemented virtualization.
- Ensuring data consistancy.
  Understood the best cases where we should invalidate cache.
