// import { db } from "@/service/firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { useNavigation } from "react-router-dom";
// import UserTripCardItem from "./components/UserTripCardItem";

// function MyTrips() {
//   const navigation = useNavigation();

//   const [userTrips, setUserTrips] = useState([]);

//   useEffect(() => {
//     GetUserTrips();
//   }, []);

//   // Used to get All the user Trips

//   const GetUserTrips = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       navigation("/");
//       return;
//     }

   

//     const q = query(
//       collection(db, "AITrips"),
//       where("userEmail", "==", user?.email)
//     );

//     const querySnapshot = await getDocs(q);
//     setUserTrips([]);
//     querySnapshot.forEach((doc) => {
//       //   doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       setUserTrips((prevVal) => [...prevVal, doc.data()]);
//     });
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 py-5 mt-3">
//       <h2 className="font-bold text-3xl ">My Trips</h2>

//       <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
//         {userTrips?.length>0?userTrips.map((trip, index) => (
//           <UserTripCardItem trip={trip} key={index}/>
//         ))
//           : [1,2,3,4,5,7,8,9,10].map((trip, index) =>(
//             <div key={index} className="h-[180px] w-full bg-slate-200 animate animate-pulse rounded-xl"></div>
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default MyTrips;


import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { Plane, MapPin, Calendar, Users } from "lucide-react";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  // Used to get All the user Trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

    // Handle trip deletion
  const handleDeleteTrip = (tripId) => {
    setUserTrips(userTrips.filter(trip => trip.id !== tripId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-3xl mb-8 text-gray-800">My Trips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-4 shadow animate-pulse">
                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Plane className="text-blue-500 mr-3" size={28} />
          <h2 className="font-bold text-3xl text-gray-800">My Trips</h2>
        </div>

        {userTrips.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Plane className="text-blue-500" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
            <button 
              onClick={() => navigate('/create-trip')}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTrips.map((trip, index) => (
              <UserTripCardItem key={trip.id} 
                trip={trip} 
                onDelete={handleDeleteTrip}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;