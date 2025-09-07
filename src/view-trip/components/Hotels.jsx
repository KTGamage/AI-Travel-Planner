// import React from "react";
// import HotelCardItem from "./HotelCardItem";

// function Hotels({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
//         {trip?.tripData?.hotels?.map((hotel, index) => (
//          <HotelCardItem hotel ={hotel}/>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Hotels;


import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
      
      {(!trip?.tripData?.hotels || trip.tripData.hotels.length === 0) && (
        <div className="text-center py-10 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">No hotel recommendations available</p>
        </div>
      )}
    </div>
  );
}

export default Hotels;