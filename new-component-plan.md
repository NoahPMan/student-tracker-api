# New Component Plan

For my project, I need to add one extra backend feature that we didn't cover in class. I looked at a few options and here's what I found:

## Option 1: Express-rate-limit
- **What it does:** Stops people from sending too many requests to the API in a short time.
- **Why it's useful:** Helps prevent spam and protects the server from overload.
- **How to add it:** Install the package and use it as middleware in `app.ts`.

## Option 2: Nodemailer
- **What it does:** Sends emails from the server.
- **Why it's useful:** Could send confirmation emails when a student registers.
- **How to add it:** Install Nodemailer and set up an email service.

## Option 3: Multer
- **What it does:** Lets users upload files.
- **Why it's useful:** Could allow students to upload assignments.
- **How to add it:** Install Multer and create an upload route.

---

### My Choice
I picked **Nodemailer** because sending emails is important for user communication. For example, when a student signs up, they can get a confirmation email.

- Install it:
  ```bash
  npm install nodemailer