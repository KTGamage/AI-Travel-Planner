export const SelectTravelesList=[
    {
        id:1,
        title: 'Just me',
        desc: 'A sole travels in exploration',
        icon:'✈️',
        people: '1'
    },
    {
        id:2,
        title: 'A Couple',
        desc: "Two travels in tandem",
        icon: '🥂',
        people: '2 People'
    },
    {
         id:3,
         title: 'Family',
         desc: 'A group of fun loving adventure',
         icon: '🏡',
         people: '3 to 5 people'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seeks',
        icon: '🔥',
        people: '5 to 10 people'

    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Cheap',
        desc:'Stay conscious of costs',
        icon: '💰',
    },
    {
        id:2,
        title: 'Moderate',
        desc:'Keep cost on the average side',
        icon: '💵',
    },
    {
        id:3,
        title: 'Luxury',
        desc:'Dont worry about cost',
        icon: '💸',
    },
]

export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary(type is array) with placeName, Place Details, Place Image Url, Geo Coordinates, ticket pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'