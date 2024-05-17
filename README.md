
# Next.js Blogging Platform

## Introduction
This project is a blogging platform developed using Next.js and MongoDB. It allows users to perform CRUD operations on blog posts, supports pagination, and is styled with Tailwind CSS for a responsive design.

## Features
- CRUD operations on blog posts.
- Pagination support to navigate through posts.
- Dynamic interactions using Next.js API routes.
- Responsive design using Tailwind CSS.

## Installation
To install the necessary packages, run the following command:
```bash
npm install
```

## Running the Project
To start the development server, run:
```bash
npm run dev
```
This will serve the site at `http://localhost:3000`.

## API Endpoints
The application provides several endpoints for managing blog posts:

### GET `/api/posts`
Fetches paginated list of posts.
- **Query Parameters**:
  - `page`: Specifies the page number.
  - `limit`: Specifies the number of posts per page.

### POST `/api/posts`
Creates a new post.
- **Body Parameters**:
  - `title`: Title of the post.
  - `content`: Content of the post.

### PUT `/api/posts/:postId`
Updates an existing post specified by its ID.
- **URL Parameters**:
  - `postId`: Unique identifier of the post.
- **Body Parameters**:
  - `title`: Updated title of the post.
  - `content`: Updated content of the post.

### DELETE `/api/posts/:postId`
Deletes a specific post by its ID.
- **URL Parameters**:
  - `postId`: Unique identifier of the post to be deleted.

### GET `/api/posts/:postId`
Retrieves a specific post by its ID.
- **URL Parameters**:
  - `postId`: Unique identifier of the post.

## Usage Examples
Here are some examples on how to interact with the API using a tool like curl or through any HTTP client like Postman.

## Examples

### Add Post

![Add Post](https://github.com/hamzaennassel/CodingChallenge-SoftwareEngineerIntern-Hamza-Ennassel/assets/134778417/f6bca55d-a280-4294-802f-f550ab6b01a2)

### List Posts

![list Posts](https://github.com/hamzaennassel/CodingChallenge-SoftwareEngineerIntern-Hamza-Ennassel/assets/134778417/83bba79c-e902-4781-b76c-4ad4d02133d2)


### Update Post

![Update Post](https://github.com/hamzaennassel/CodingChallenge-SoftwareEngineerIntern-Hamza-Ennassel/assets/134778417/7f523676-8b73-424e-957f-2315e745a68a)

### Show Post

![Show Post](https://github.com/hamzaennassel/CodingChallenge-SoftwareEngineerIntern-Hamza-Ennassel/assets/134778417/1fd0206a-187a-4b9e-9f61-47267d5e7425)

## License
This project is open-sourced under the MIT License. See the LICENSE file for more information.
