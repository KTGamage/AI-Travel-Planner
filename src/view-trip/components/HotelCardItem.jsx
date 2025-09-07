// import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function HotelCardItem({ hotel }) {

// const [photoUrl, setPhotoUrl] = useState();

//     useEffect(() => {
//         hotel&&GetPlacePhoto();
//     }, [hotel])

//     const GetPlacePhoto = async() => {
//         const data ={
//             textQuery:hotel?.hotelName
//         }
//         const result = await GetPlaceDetails(data).then(resp =>{
//             console.log(resp.data.places[0].photos[3].name);

//             const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
//             setPhotoUrl(PhotoUrl);
//             // console.log( PhotoUrl);
//         })
//     }

//   return (
//     <div>
//       <Link
//         to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
//         target="_blank"
//       >
//         <div className="hover:scale-105 transition-all cursor-pointer">
//           <img src={photoUrl?photoUrl:'/placeholder.jpg'} className="rounded-xl h-[180px] w-full object-cover" />
//           <div className="my-2 flex flex-col gap-2">
//             <h2 className="font-medium text-black">{hotel?.hotelName}</h2>
//             <h2 className="text-xs text-gray-500">🌏 {hotel?.hotelAddress}</h2>
//             <h2 className="text-sm text-black">💰 {hotel?.price}</h2>
//             <h2 className="text-sm text-black">⭐ {hotel?.rating} Stars</h2>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default HotelCardItem;

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, DollarSign } from "lucide-react";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    setLoading(true);
    const data = {
      textQuery: hotel?.hotelName,
    };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
        target="_blank"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:shadow-lg">
          <div className="relative h-48 overflow-hidden">
            {loading ? (
              <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : (
              <img
                src={photoUrl || "/placeholder.jpg"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={hotel?.hotelName}
                onLoad={() => setLoading(false)}
              />
            )}
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-gray-800 line-clamp-1 mb-2">
              {hotel?.hotelName}
            </h2>

            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin size={16} className="mr-1 text-red-500" />
              <span className="line-clamp-1" >{hotel?.hotelAddress}</span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-amber-500">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm font-medium">{hotel?.rating} Stars</span>
              </div>
              
              <div className="flex items-center text-green-600 from-neutral-medium text-sm">
                <span>{hotel?.price}</span>
              </div>
            </div>
            
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
