import { Button } from '@/components/ui/button';
import React from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
  return (
    <Link to ={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}target ='_blank'>
    <div className='border rounded-xl p-5 mt-2 flex gap-5 hover:scale-105 tansition-all hover:shadow-md cursor-pointer'>
        <img src='/placeholder.jpg'
        className='w-[130px] h-[130px] rounded-xl'
        />

        <div>
            <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>
            <p className='text-sm text-gray-400 '>{place.placeDetails}</p>
            <h2 className='mt- text-black' >🚗 {place.timeToTravel}</h2>
            <Button className='size-sm '><FaMapLocationDot /></Button>
        </div>

    </div>
    </Link>
  )
}

export default PlaceCardItem;