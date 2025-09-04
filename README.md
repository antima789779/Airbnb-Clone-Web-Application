
# 🏡 Airbnb Clone –  Web Application

A full-featured backend for an Airbnb-style rental platform built with **Node.js**, **Express**, and **MongoDB**. This project handles user authentication, session management, image uploads, and property listings.

## 🚀 Live Demo
https://airbnb-kj1b.onrender.com/listings

---

## 🛠️ Tech Stack

| Layer        | Technology Used                  |
|--------------|----------------------------------|
| Runtime      | Node.js v22.11.0                 |
| Framework    | Express.js                       |
| Database     | MongoDB + Mongoose               |
| Templating   | EJS + EJS-Mate                   |
| Auth         | Passport.js + Passport-Local     |
| File Uploads | Multer + Cloudinary              |
| Sessions     | Express-Session + Connect-Mongo  |
| Validation   | Joi                              |
| Environment  | dotenv                           |

---

## 📦 Dependencies

Key packages used:

- `express`, `mongoose`, `passport`, `passport-local`, `passport-local-mongoose`
- `ejs`, `ejs-mate`, `method-override`, `connect-flash`
- `express-session`, `connect-mongo`, `cookie-parser`
- `multer`, `@fluidjs/multer-cloudinary`, `cloudinary`
- `dotenv`, `joi`

---

## 📁 Project Structure


airbnbfinal/ ├── models/              # Mongoose models ├── routes/              # Express route handlers ├── views/               # EJS templates ├── public/              # Static assets ├── app.js / index.js    # Entry point ├── .env                 # Environment variables ├── package.json         # Project metadata └── README.md            # Project documentation

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js v22.11.0
- MongoDB running locally or via Atlas
- Cloudinary account for image hosting

### Installation

```bash
# Clone the repository
🔗 git clone https://github.com/yourusername/airbnbfinal.git
cd airbnbfinal

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your MongoDB URI, Cloudinary credentials, and session secret

# Run the server
node app.js
🎯 Features
- 🧾 User registration and login
- 🏠 Create, edit, and delete property listings
- 📸 Upload images to Cloudinary
- 🔐 Secure sessions and flash messaging
- 🧼 Form validation with Joi
- 🗂️ RESTful routing with method override

📌 Future Enhancements
- 🗺️ Map integration with Google Maps API
- 📅 Booking system with calendar view
- 💳 Payment gateway integration
- 📱 Responsive frontend with React
📃 License
This project is licensed under the ISC License.
👨‍💻 Author
Made with ❤️ by [Antima Yadav]
🔗 https://github.com/antima789779






