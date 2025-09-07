// import { Button } from '@/components/ui/button';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react';
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

// function PlaceCardItem({place}) {

//   const [photoUrl, setPhotoUrl] = useState();
  
//       useEffect(() => {
//           place&&GetPlacePhoto();
//       }, [place])
  
//       const GetPlacePhoto = async() => {
//           const data ={  
//               textQuery:place.placeName
//           }
//           const result = await GetPlaceDetails(data).then(resp =>{
//               console.log(resp.data.places[0].photos[3].name);
  
//               const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
//               setPhotoUrl(PhotoUrl);
//               // console.log( PhotoUrl);
//           })
//       }


//   return (
//     <Link to ={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}target ='_blank'>
//     <div className='border rounded-xl p-5 mt-2 flex gap-5 hover:scale-105 tansition-all hover:shadow-md cursor-pointer'>
//         <img src={photoUrl?photoUrl:'/placeholder.jpg'}
//         className=' h-[180px] w-[180px] rounded-xl object-cover'
//         />

//         <div>
//             <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>
//             <p className='text-sm text-gray-400 '>{place.placeDetails}</p>
//             <h2 className='mt- text-black' >🚗 {place.timeToTravel}</h2>
//             <Button className='size-sm '><FaMapLocationDot /></Button>
//         </div>

//     </div>
//     </Link>
//   )
// }

// export default PlaceCardItem;


import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place])

  const GetPlacePhoto = async() => {
    setLoading(true);
    const data = {  
      textQuery: place.placeName
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
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target='_blank'>
      <div className='bg-white rounded-2xl p-5 mt-4 flex flex-col md:flex-row gap-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100'>
        <div className="relative h-48 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-xl">
          {loading ? (
            <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          ) : (
            <img 
              src={photoUrl || '/placeholder.jpg'}
              className='h-full w-full object-cover'
              alt={place.placeName}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>

        <div className="flex-1">
          <h2 className='font-bold text-lg text-gray-800 mb-2'>{place.placeName}</h2>
          <p className='text-sm text-gray-600 mb-4 line-clamp-10'>{place.placeDetails}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-1 text-red-500" />
              <span className="text-sm">{place.timeToTravel}</span>
            </div>
            
            <Button className="rounded-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-md">
              <FaMapLocationDot size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem;

