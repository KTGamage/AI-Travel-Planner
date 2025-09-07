// import { Button } from '@/components/ui/button';
// import { GetPlaceDetails } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react';
// import { IoIosSend } from "react-icons/io";

// const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1440&maxWidthPx=1440&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

// function InfoSection({trip}) {

//     const [photoUrl, setPhotoUrl] = useState();

//     useEffect(() => {
//         trip&&GetPlacePhoto();
//     }, [trip])

//     const GetPlacePhoto = async() => { 
//         const data ={  
//             textQuery:trip?.userSelection?.location?.label
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
//         <img src={photoUrl?photoUrl:'/placeholder.jpg'}className = 'h-[340px] w-full object-cover rounded-xl'/>

//     <div className='flex justify-between items-center'>
//     <div className='my-5 flex flex-col gap-2'>
//         <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
//         <div className='flex gap-5'>
//             <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️ {trip.userSelection?.noOfDays}Day</h2>
//             <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip.userSelection?.budget}Budget</h2>
//             <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🍾 No.Of Traveler: {trip.userSelection?.traveler}</h2>

//         </div>
//     </div>
//     <Button><IoIosSend /></Button>
//     </div>

//     </div>
//   )
// }

// export default InfoSection


import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Calendar, Users, DollarSign } from 'lucide-react';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1440&maxWidthPx=1440&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({trip}) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async() => { 
    setLoading(true);
    const data = {  
      textQuery: trip?.userSelection?.location?.label
    }
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
  }

  return (
    <div className="mb-8">
      <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-md">
        {loading ? (
          <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading image...</div>
          </div>
        ) : (
          <img 
            src={photoUrl || '/placeholder.jpg'} 
            className="w-full h-full object-cover" 
            alt={trip?.userSelection?.location?.label}
            onLoad={() => setLoading(false)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        <div className="flex flex-col gap-3">
          <h2 className='font-bold text-2xl md:text-3xl text-gray-800'>{trip?.userSelection?.location?.label}</h2>
          
          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-xs md:text-sm'>
              <Calendar size={14} className="mr-1" />
              <span>{trip.userSelection?.noOfDays} Day{trip.userSelection?.noOfDays > 1 ? 's' : ''}</span>
            </div>
            
            <div className='flex items-center px-3 py-1 bg-green-100 rounded-full text-green-700 text-xs md:text-sm'>
              <DollarSign size={14} className="mr-1" />
              <span>{trip.userSelection?.budget} Budget</span>
            </div>
            
            <div className='flex items-center px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-xs md:text-sm'>
              <Users size={14} className="mr-1" />
              <span>{trip.userSelection?.traveler} Traveler{trip.userSelection?.traveler > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        
        <Button className="rounded-full px-6 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg">
          <IoIosSend className="mr-2" size={18} />
          Share
        </Button>
      </div>
    </div>
  )
}

export default InfoSection;
