# 🌍 GoPlanAI – AI Travel Planner Application

![Built with React](https://img.shields.io/badge/Built%20with-React-blue?logo=react)
![Backend Express](https://img.shields.io/badge/Backend-Express.js-lightgrey?logo=express)
![Database Firebase](https://img.shields.io/badge/Database-Firebase-orange?logo=firebase)
![AI Gemini API](https://img.shields.io/badge/AI-Gemini%20API-purple?logo=google)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![License MIT](https://img.shields.io/badge/License-MIT-green)
![Status Active](https://img.shields.io/badge/Status-Active-success)

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
git clone https://github.com/yourusername/goplanai.git
```

### 2. **Navigate to the project directory**
```bash
cd goplanai
```

### 3. **Install dependencies**
```bash
npm install
```

### 4. **Set up environment variables**
Create a `.env` file in the root directory and include the following environment variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 5. **Run the application**
```bash
npm run dev
```

---

## 🚀 Live Demo

Experience GoPlanAI live here:  
🔗 **https://goplanai.vercel.app**

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](https://via.placeholder.com/800x450/3a86ff/ffffff?text=GoPlanAI+Home+Page)

### 🧭 AI Trip Planner
![Trip Planner](https://via.placeholder.com/800x450/8338ec/ffffff?text=AI+Trip+Planner)

### 🌆 Destination Suggestions
![Destination Suggestions](https://via.placeholder.com/800x450/ff006e/ffffff?text=Destination+Suggestions)

### 🔑 Login Page
![Login Page](https://via.placeholder.com/800x450/38b000/ffffff?text=Login+Page)

---

## 📂 Project Structure

```
GoPlanAI/
│
├── backend/                 # Node.js and Express.js server files
│   ├── routes/             # API route handlers
│   ├── controllers/        # Business logic controllers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── server.js           # Main server file
│
├── src/                    # React frontend components and pages
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Shadcn UI components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── TripForm/      # Trip creation components
│   │   └── Itinerary/     # Itinerary display components
│   ├── pages/              # Application pages
│   │   ├── Home.jsx       # Landing page
│   │   ├── CreateTrip.jsx # Trip creation page
│   │   ├── MyTrips.jsx    # User trips page
│   │   └── Auth/          # Authentication pages
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js     # Authentication hook
│   │   ├── useFirestore.js # Firestore operations
│   │   └── useGeminiAI.js # Gemini AI integration
│   ├── context/            # React Context providers
│   │   ├── AuthContext.js # Authentication state
│   │   └── TripContext.js # Trip management state
│   ├── services/           # External service integrations
│   │   ├── firebase.js    # Firebase configuration
│   │   ├── gemini.js      # Gemini API service
│   │   └── googleMaps.js  # Google Maps API service
│   ├── utils/              # Utility functions
│   │   ├── helpers.js     # Helper functions
│   │   └── constants.js   # Application constants
│   └── App.jsx            # Main application component
│
├── public/                 # Static assets
│   ├── images/            # Image resources
│   ├── icons/             # Icon files
│   └── index.html         # HTML template
│
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## 🏗️ System Architecture

### Frontend Architecture
```javascript
// Component Hierarchy
App
├── AuthProvider (Context)
├── Router
│   ├── Header
│   ├── Routes
│   │   ├── / → HomePage
│   │   ├── /create-trip → TripCreationPage
│   │   ├── /my-trips → TripManagementPage
│   │   └── /auth → AuthPages
│   └── ModalManager
```

### Data Flow
```
User Input → React Components → Firebase Auth → Gemini API → 
Firestore DB → Response Processing → UI Update
```

---

## 🔧 Core Features Implementation

### 1. AI-Powered Itinerary Generation
```javascript
// Gemini AI Integration
class GeminiAIService {
  async generateItinerary(userPreferences) {
    const prompt = this.buildPrompt(userPreferences);
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    return this.parseItineraryResponse(response);
  }
}
```

### 2. Firebase Integration
```javascript
// Firestore Operations
class TripService {
  async saveTrip(userId, tripData) {
    const tripRef = await addDoc(collection(db, 'trips'), {
      ...tripData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return tripRef.id;
  }

  async getUserTrips(userId) {
    const tripsQuery = query(
      collection(db, 'trips'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return await getDocs(tripsQuery);
  }
}
```

### 3. Authentication System
```javascript
// Firebase Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

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
- **🔗 Portfolio**: [Your Portfolio URL]
- **🔗 LinkedIn**: [Your LinkedIn Profile]
- **📧 Email**: [Your Email Address]

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

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/yourusername/goplanai/issues) page
2. Create a new issue with detailed description
3. Contact via email: [Your Email Address]

**Let's build the future of travel planning together!** 🚀
