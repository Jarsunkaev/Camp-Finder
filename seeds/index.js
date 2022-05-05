const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your userID
            author: '625dd654bcd6fe0ee1bc3c59',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
              
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dwrsd0rog/image/upload/v1650581641/YelpGround/jbqvvjchttxavuqmt7wv.jpg',
                  filename: 'YelpGround/jbqvvjchttxavuqmt7wv',
                },
                {
                  url: 'https://res.cloudinary.com/dwrsd0rog/image/upload/v1650581641/YelpGround/rhqdqrxdhzhxb0co9aaz.jpg',
                  filename: 'YelpGround/rhqdqrxdhzhxb0co9aaz',
                },
                {
                  url: 'https://res.cloudinary.com/dwrsd0rog/image/upload/v1650581641/YelpGround/iyjfsrwwtxcopj8ucihl.jpg',
                  filename: 'YelpGround/iyjfsrwwtxcopj8ucihl',
                }
              ]
              
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

