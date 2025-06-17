# Product Requirement Document

Better way to implement this flow, that is:

In the frontend application you need to read the file, create chunks and then send to our API.

- We going to create a crypto hash that will be the Primary Key to create the CSV
- So, we going to create a chunks with the file
- Send each chunk to API with unique hash

## Controller API

**Upload Parameters**

- file_encrypt_key: string
- file_chunk: string
- file_name?: string
- file_type?: string
- file_status?: finished

## Models

- Products
  - name
  - price
  - expiration_at
  - currencies

- Uploads
  - file_encrypt_key
  - file_name
  - file_type
  - file_size
  - file_status = importing | finished 

## Start application

**Frontend**

`cd packages/frontend && pnpm install && pnpm dev`


**Backend**

`cd packages/backend && bundle install --jobs 3`

`bin/dev`


## Routes API

- List all of uploads
  - `GET /api/v1/uploads/csv`

- Create a new upload
  - `POST /api/v1/uploads/csv`

  - Parameters:
    - file_encrypt_key: string
    - file_chunk: string
    - file_name?: string
    - file_type?: string
    - file_status?: finished

- List all of products
  - `GET /api/v1/products`


## Authorization Header`

`Authorization: Token token=<token>`

> **Note** Mocked token: `mysecrettouploadcsv`