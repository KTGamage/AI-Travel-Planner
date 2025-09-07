// import React from "react";
// import PlaceCardItem from "./PlaceCardItem";

// function PlacesToVisit({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-lg">Places to Visit</h2>
//       <div>
//         {trip.tripData?.itinerary.map((item, index) => (
//           <div className='mt-5'>
//               <h2 className="font-medium text-lg">{item.day}</h2>
//               <div className="grid md:grid-cols-2 gap-5">
//               {item.plans.map((place, index) => (
//                 <div className="">
//                   <h2 className="font-medium text-sm text-orange-600">
//                     {place.timeDuration}
//                   </h2>
//                   <PlaceCardItem place={place} />
//                 </div>
//               ))}
//               </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;


import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Places to Visit</h2>
      
      <div className="space-y-8">
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className='bg-gray-50 p-5 rounded-2xl'>
            <h2 className="font-semibold text-xl text-gray-700 mb-4 pb-2 border-b border-gray-200">{item.day}</h2>
            
            <div className="grid grid-cols-1 gap-5">
              {item.plans.map((place, idx) => (
                <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-blue-500">
                  <h2 className="font-medium text-sm text-blue-600 mb-2">
                    {place.timeDuration}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {(!trip.tripData?.itinerary || trip.tripData.itinerary.length === 0) && (
        <div className="text-center py-10 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">No itinerary available</p>
        </div>
      )}
    </div>
  );
}

export default PlacesToVisit;