# Helper Bees Angular App

This Angular application is a quiz-based application with authentication and route protection.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd ../Helper-bees-app-task
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
ng serve
```

The application will run at `http://localhost:4200/` by default.

## Authentication

- The application uses a login mechanism for authentication.
- To access the application, use the following credentials:

  - Username: emilys
  - Password: emilyspass

## Route Protection

- The app initially opens the **Login Page** (no specific path is required).
- If the user is already logged in, they will be redirected to the **Intro Page** automatically.
- After logging in, the user’s name will be displayed near the logout icon.
- Route guards are implemented to protect routes and prevent unauthorized access.

## Features

- Responsive design.
- Authentication with route guards.
- User name display upon login.

## Dependencies

- Angular
- RxJS
- ngx-bootstrap
- SCSS



