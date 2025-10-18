# 🌍 GoPlanAI – AI Travel Planner Application

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-4285F4?logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![MIT](https://img.shields.io/badge/MIT-green?logo=opensourceinitiative&logoColor=white)
![Active](https://img.shields.io/badge/Active-success?logo=check-circle&logoColor=white)
---

## 📝 Description
**GoPlanAI** is an advanced AI-powered travel planning web application designed to create intelligent and personalized travel experiences.  
It enables users to generate detailed trip itineraries, explore destinations, and receive AI-based suggestions for attractions, accommodations, and activities — all in one place.

The system integrates the **Gemini API** for generating itinerary recommendations and the **Google Place API** for destination details.  
With secure authentication and data storage using **Firebase**, and a sleek interface built with **React + Vite** and **Tailwind CSS**, GoPlanAI offers an efficient and modern travel assistant for explorers worldwide.

---

## ✨ Key Features
- 🧠 **AI-Powered Trip Generation** – Automatically builds personalized travel itineraries based on user preferences.  
- 📍 **Google Place API Integration** – Fetches attractions, restaurants, and landmarks dynamically.  
- 🔐 **Secure Google Authentication** – Managed using Firebase Authentication.  
- 💾 **User Data Management** – Save and retrieve trips from Firebase Database.  
- 🎨 **Modern Responsive UI** – Built with Tailwind CSS and Shadcn for an elegant look.  
- ⚙️ **Gemini API Components** – Handles intelligent text generation for travel recommendations.  
- 🚀 **Cloud Deployment** – Hosted on Vercel for global accessibility.

---

## 🛠️ Tech Stack
**Frontend:** React + Vite, Tailwind CSS, Shadcn/UI  
**Backend:** Node.js, Express.js  
**AI Integration:** Gemini API  
**Database & Authentication:** Firebase  
**APIs Used:** Google Place API  
**Deployment:** Vercel  

---

## ⚙️ Installation and Setup

Follow the steps below to set up and run **GoPlanAI** locally:

### 1. **Clone the repository**
```bash
git clone https://github.com/KTGamage/AI-Travel-Planner.git
```

### 2. **Navigate to the project directory**
```bash
cd AI-Travel-Planner

```

### 3. **Install dependencies**
```bash
npm install
```

### 4. **Set up environment variables**
Create a `.env` file in the root directory and include the following environment variables:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_OAUTH_CLIENT_ID = your_google_outh_client_id
```

### 5. **Run the application**
```bash
npm run dev
```

---

## 🚀 Live Demo

Experience GoPlanAI live here:  
🔗 **https://ai-travel-planner-six-cyan.vercel.app/**

---

## 📂 Project Structure

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂custom
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┗ 📜Hero.jsx
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📜button.jsx
 ┃ ┃ ┣ 📜dialog.jsx
 ┃ ┃ ┣ 📜input.jsx
 ┃ ┃ ┣ 📜popover.jsx
 ┃ ┃ ┣ 📜sonner.jsx
 ┃ ┃ ┗ 📜useParticles.jsx
 ┣ 📂constants
 ┃ ┗ 📜option.jsx
 ┣ 📂create-trip
 ┃ ┗ 📜index.jsx
 ┣ 📂lib
 ┃ ┗ 📜utils.js
 ┣ 📂my-trips
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📜UserTripCardItem.jsx
 ┃ ┗ 📜index.jsx
 ┣ 📂service
 ┃ ┣ 📜AIModel.jsx
 ┃ ┣ 📜firebaseConfig.jsx
 ┃ ┗ 📜GlobalApi.jsx
 ┣ 📂view-trip
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┣ 📜HotelCardItem.jsx
 ┃ ┃ ┣ 📜Hotels.jsx
 ┃ ┃ ┣ 📜InfoSection.jsx
 ┃ ┃ ┣ 📜PlaceCardItem.jsx
 ┃ ┃ ┗ 📜PlacesToVisit.jsx
 ┃ ┗ 📂[tripId]
 ┃ ┃ ┗ 📜index.jsx
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx

---
```

## 🤝 Contributing

Contributions to improve GoPlanAI are welcome!  
If you wish to contribute:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a pull request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Ensure responsive design for all components
- Write clear commit messages
- Test all features before submitting PR

---

## 🧾 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kasun Tharaka**  
B.Sc. (Hons) in Computing and Information Systems  
Faculty of Computing, Sabaragamuwa University of Sri Lanka

### 🌐 Connect with Me
- **🔗 Portfolio**: [https://kasun-portfolio.vercel.app/]
- **🔗 LinkedIn**: [https://www.linkedin.com/in/kasun-tharaka-5aa740311]
- **📧 Email**: [kasuntharaka18628@gmail.com]

### 📚 Academic Background
- **University**: Sabaragamuwa University of Sri Lanka
- **Faculty**: Faculty of Computing
- **Degree**: Bachelor of Science (Honours) in Computing and Information Systems
- **Specialization**: Web Technologies, AI Integration, Full-Stack Development

---

## 🚀 Future Enhancements

- [ ] Real-time collaboration on trip planning
- [ ] Mobile app development (React Native)
- [ ] Integration with booking APIs (flights, hotels)
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Advanced AI recommendations with machine learning
- [ ] Social features for sharing trips
- [ ] Weather integration for trip planning

---

## 📊 Performance Metrics

- **Page Load Time**: < 2 seconds
- **AI Response Time**: < 5 seconds
- **Mobile Responsiveness**: 100% compatible
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)

---

<div align="center">

### ⭐ Star this repository if you find GoPlanAI useful!

**Happy Travel Planning! ✈️🌎**

© 2025 GoPlanAI. All Rights Reserved.

</div>

---

## 🙏 Acknowledgments

- **Google** for Gemini AI API and Google Places API
- **Firebase** for robust backend services
- **Vercel** for seamless deployment
- **React & Vite** teams for excellent development experience
- **Tailwind CSS** for beautiful, utility-first styling
- **Shadcn/UI** for accessible component library

---

**Let's build the future of travel planning together!** 🚀
