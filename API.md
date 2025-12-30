# API Documentation

## Authentication

| Method | Endpoint                       | Description                    |
| :----- | :----------------------------- | :----------------------------- |
| POST   | `/api/register`                | Register a new user            |
| POST   | `/api/login`                   | Login with email/password      |
| POST   | `/api/logout`                  | Logout (requires auth token)   |
| POST   | `/api/auth/check-availability` | Check if email/username exists |
| GET    | `/api/user`                    | Get current user info          |

### QR Login

| Method | Endpoint                         | Description                                  |
| :----- | :------------------------------- | :------------------------------------------- |
| GET    | `/api/auth/qr/generate`          | Generate QR session ID                       |
| GET    | `/api/auth/qr/check/{sessionId}` | Check status of QR session                   |
| POST   | `/api/auth/qr/approve`           | Approve QR login from mobile (requires auth) |

### Two-Factor Auth

| Method | Endpoint           | Description                   |
| :----- | :----------------- | :---------------------------- |
| POST   | `/api/2fa/setup`   | Setup 2FA (Returns Secret/QR) |
| POST   | `/api/2fa/confirm` | Confirm 2FA Setup with OTP    |

## Products & Commerce

| Method | Endpoint                             | Description                        |
| :----- | :----------------------------------- | :--------------------------------- |
| GET    | `/api/products`                      | List all products                  |
| GET    | `/api/products/{id}`                 | Get product details                |
| POST   | `/api/products/{id}/purchase`        | Purchase a product (Auth required) |
| GET    | `/api/products/{id}/check-ownership` | Check if user owns product/service |
| GET    | `/api/orders`                        | List user's order history          |

## Wallet

| Method | Endpoint                   | Description                        |
| :----- | :------------------------- | :--------------------------------- |
| GET    | `/api/wallet`              | Get wallet balance                 |
| POST   | `/api/wallet/deposit`      | Deposit funds (Create transaction) |
| GET    | `/api/wallet/transactions` | List transaction history           |

## Esoteric Services

| Method | Endpoint                    | Description                        |
| :----- | :-------------------------- | :--------------------------------- |
| GET    | `/api/services`             | List available services            |
| POST   | `/api/services/{type}`      | Generic service handler            |
| GET    | `/api/tarot`                | Tarot reading service              |
| POST   | `/api/astrology/natal`      | Calculate Natal Chart (Bản Đồ Sao) |
| POST   | `/api/tu-vi/lap-la-so`      | Create Tu Vi horoscope             |
| POST   | `/api/numerology/calculate` | Calculate Numerology (Thần Số Học) |

## Academy (Học Viện)

| Method | Endpoint                             | Description                      |
| :----- | :----------------------------------- | :------------------------------- |
| GET    | `/api/academy/categories`            | List course categories           |
| GET    | `/api/academy/category/{slug}`       | Get courses by category          |
| GET    | `/api/academy/course/{slug}`         | Get course details               |
| POST   | `/api/academy/courses/{id}/purchase` | Enroll/Buy course                |
| POST   | `/api/academy/lessons/complete`      | Mark lesson as completed         |
| GET    | `/api/academy/courses/{id}/progress` | Get progress for specific course |
| GET    | `/api/academy/my-progress`           | Get overall learning progress    |

## User System

| Method | Endpoint                          | Description                    |
| :----- | :-------------------------------- | :----------------------------- |
| POST   | `/api/user/avatar`                | Upload user avatar             |
| PUT    | `/api/user/profile`               | Update user profile info       |
| GET    | `/api/notifications`              | List notifications             |
| GET    | `/api/notifications/unread-count` | Get unread notification count  |
| POST   | `/api/notifications/{id}/read`    | Mark notification as read      |
| POST   | `/api/notifications/read-all`     | Mark all notifications as read |
| DELETE | `/api/notifications/{id}`         | Delete notification            |
| GET    | `/api/tasks`                      | List daily tasks/quests        |
| POST   | `/api/tasks/{id}/claim`           | Claim task reward              |

## Admin

| Method | Endpoint                       | Description           |
| :----- | :----------------------------- | :-------------------- |
| GET    | `/api/admin/dashboard`         | Admin dashboard stats |
| GET    | `/api/admin/wallet/statistics` | Wallet system stats   |
| GET    | `/api/admin/users`             | List all users        |
| PUT    | `/api/admin/users/{id}`        | Update user (Admin)   |
| DELETE | `/api/admin/users/{id}`        | Delete user (Admin)   |

## System

| Method | Endpoint    | Description             |
| :----- | :---------- | :---------------------- |
| GET    | `/api/test` | Test backend connection |
