// import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";

// function UserTripCardItem({trip}) {

//       const [photoUrl, setPhotoUrl] = useState();
    
//         useEffect(() => {
//             trip&&GetPlacePhoto();
//         }, [trip])
    
//         const GetPlacePhoto = async() => {
//             const data ={  
//                 textQuery:trip?.userSelection?.location?.label
//             }
//             const result = await GetPlaceDetails(data).then(resp =>{
//                 console.log(resp.data.places[0].photos[3].name);
    
//                 const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
//                 setPhotoUrl(PhotoUrl);
//                 // console.log( PhotoUrl);
//             })
//         }
    

//   return (
//     <Link to={'/view-trip/'+trip?.id}>
//     <div className="hover:scale-105 transition-all">
//     <img src={photoUrl?photoUrl: "/placeholder.jpg"} className="rounded-xl h-[180px] w-full object-cover" />
//       <div>
//         <h2 className="font-bold text-lg text-black">{trip?.userSelection?.location?.label}</h2>
//         <h2 className ='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget}  for {trip?.userSelection?.traveler}</h2>
//       </div>
//     </div>
//     </Link>
//   )
// }

// export default UserTripCardItem;

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Wallet, ArrowRight, Trash2 } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { toast } from "sonner";

function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    setLoading(true);
    const data = {
      textQuery: trip?.userSelection?.location?.label
    };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent navigation to the trip details
    e.stopPropagation(); // Prevent event bubbling
    
    if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "AITrips", trip.id));
      toast.success("Trip deleted successfully");
      if (onDelete) {
        onDelete(trip.id); // Call the parent component's delete handler
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
        aria-label="Delete trip"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        ) : (
          <Trash2 size={16} />
        )}
      </button>
      
      <Link to={'/view-trip/' + trip?.id}>
        <div className="relative h-48 overflow-hidden">
          {loading ? (
            <div className="h-full w-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading image...</div>
            </div>
          ) : (
            <img 
              src={photoUrl || "/placeholder.jpg"} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={trip?.userSelection?.location?.label}
              onLoad={() => setLoading(false)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-800 line-clamp-1 mb-2">
            {trip?.userSelection?.location?.label}
          </h2>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-1 text-blue-500" />
              <span>{trip?.userSelection?.noOfDays} Days</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Users size={16} className="mr-1 text-blue-500" />
              <span>{trip?.userSelection?.traveler}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Wallet size={16} className="mr-1 text-blue-500" />
              <span className="line-clamp-1">{trip?.userSelection?.budget}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1 text-blue-500" />
              <span className="line-clamp-1">Trip</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-blue-600 font-medium text-sm">
            <span>View Details</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserTripCardItem;