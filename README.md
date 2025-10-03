# User Management App

Hey there! This is a user management application I built as part of my internship task. It's a simple but functional app that lets you view, add, edit, and delete users.

## What Does It Do?

(Rreshtat e parë që përshkruanin konceptin e thjeshtë janë hequr)

## Technologies I Used

•⁠  ⁠*React* - The main framework for building the UI
•⁠  ⁠*TypeScript* - For type safety and better code quality
•⁠  ⁠*Redux Toolkit* - To manage the state of locally created users
•⁠  ⁠*React Query (TanStack Query)* - For fetching and caching data from the API
•⁠  ⁠*React Router* - To handle navigation between the user list and user details pages
•⁠  ⁠*React Hook Form* - For form validation when adding or editing users
•⁠  ⁠*shadcn/ui* - For pre-built, accessible UI components like buttons, cards, tables, and dialogs
•⁠  ⁠*Tailwind CSS* - For styling everything

## How I Structured Everything

### API Layer (api/users.ts)

Simple functions to fetch users from the JSONPlaceholder API. One fetches all users, and another fetches a single user by ID.

### State Management (Redux Toolkit)

Redux stores users that are created locally. Only local users can be edited or deleted.

### Data Fetching (React Query)

React Query handles all API calls and caching. Custom hooks combine API data with local Redux data:

•⁠  ⁠*useUsers* - Combines users from the API with locally created users
•⁠  ⁠*useUserDetails* - Fetches a single user's details, checking local storage first

### Components

•⁠  ⁠*UserCard* - Displays user info in a card format for the grid view
•⁠  ⁠*UserTable* - Shows users in a table format
•⁠  ⁠*AddUserDialog* - Modal form for creating new users
•⁠  ⁠*EditUserDialog* - Modal form for editing existing local users
•⁠  ⁠*UserListSkeleton* - Loading placeholders while data is fetched
•⁠  ⁠*Layout* - Main layout wrapper with a header

### Routing

•⁠  ⁠⁠ / ⁠ - Home page showing all users
•⁠  ⁠⁠ /user/:id ⁠ - Detail page for individual users

## About the Project

Before starting the app, run:

```bash
npm install
npm run dev