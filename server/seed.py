from random import choice as rc, randint
#from faker import Faker
import random
from app import app
from models import db, User, Location, UserFavorite, Photo, Comment, Like
from datetime import datetime


print('creating users')
users_list = [
    {"email": "packD@climber.com", "password": "@samDAbest", "first_name": "Sam", "last_name": "Chappel"},
    {"email": "chalky@climber.com", "password": "@sentDat", "first_name": "Ari", "last_name": "Marz"},
    {"email": "arnee@filmpotato.com", "password": "@filmp0tat0", "first_name": "Renee", "last_name": "Wall"},
    {"email": "kyle@boulderingisdumb.com", "password": "@Top0ut", "first_name": "Kyle", "last_name": "Wehrung"},
    {"email": "nick@rockymoves.com", "password": "@CragHopper", "first_name": "Nick", "last_name": "Johnson"},
    {"email": "emiley@holdtight.com", "password": "@PalmquistPower", "first_name": "Emiley", "last_name": "Palmquist"},
    {"email": "topher@nottopher.com", "password": "@LudlowLedge", "first_name": "Topher", "last_name": "Ludlow"},
    {"email": "terrence@dynojumps.com", "password": "@ChungChampion", "first_name": "Terrence", "last_name": "Chung"},
    {"email": "kyle@schneidersend.com", "password": "@SendItSchneider", "first_name": "Kyle", "last_name": "Schneider"},
    {"email": "bianca@routeplanning.com", "password": "@AspinAdvice", "first_name": "Bianca", "last_name": "Aspin"},
    {"email": "diana@mountaindancer.com", "password": "@LinUpTheWall", "first_name": "Diana", "last_name": "Lin"},
    {"email": "biscuit@stronggrip.com", "password": "@EatAssBro", "first_name": "Biscuit", "last_name": "Chappel-Akol"},
    {"email": "stove_top@climber.com", "password": "@fireGripper", "first_name": "Steve", "last_name": "Passarelli"},
    {"email": "brett@bearhugholds.com", "password": "@DeBearStrength", "first_name": "Brett", "last_name": "de Bear"},
    {"email": "lynn@itgoesboys.com", "password": "@TheNoseInADay", "first_name": "Lynn", "last_name": "Hill"},
    {"email": "chris@sharmafan.com", "password": "@KingLines", "first_name": "Chris", "last_name": "Sharma"},
    {"email": "tommy@crushingprojects.com", "password": "@DawnWall", "first_name": "Tommy", "last_name": "Caldwell"},
    {"email": "alex@nohandsneeded.com", "password": "@FreeSolo", "first_name": "Alex", "last_name": "Honnold"},
    {"email": "adam@silentroars.com", "password": "@Silence9c", "first_name": "Adam", "last_name": "Ondra"},
    {"email": "sasha@inspirationontherocks.com", "password": "@VerticalWorld", "first_name": "Sasha", "last_name": "DiGiulian"},
    {"email": "margo@breakingbarriers.com", "password": "@Grade15", "first_name": "Margo", "last_name": "Hayes"},
    {"email": "ethan@sendtrain.com", "password": "@BatHangAlways", "first_name": "Ethan", "last_name": "Pringle"},
    {"email": "alex@precisiongerman.com", "password": "@FastClimb", "first_name": "Alexander", "last_name": "Megos"},
    {"email": "brooke@climbingprodigy.com", "password": "@ClimbYoung", "first_name": "Brooke", "last_name": "Raboutou"},
    {"email": "nina@highballqueen.com", "password": "@ToppingOutHigh", "first_name": "Nina", "last_name": "Williams"},
    {"email": "alex@boulderingbeast.com", "password": "@StrongClimbs", "first_name": "Alex", "last_name": "Puccio"} 
]
print('users created')

def make_users():

    User.query.delete()

    users = []

    for user_dict in users_list:
        user = User(
            email=user_dict["email"],
            first_name=user_dict["first_name"],
            last_name=user_dict["last_name"]
        )
        user.password_hash = user_dict["password"]
        users.append(user)

    db.session.add_all(users)
    db.session.commit()
print('users committed')

print('creating locations')
locations_list = [
    {"name": "Acadia National Park", "latitude": 44.3386, "longitude": -68.2733, "city": "Bar Harbor", "state": "Maine", "image": "https://parksexpert.com/wp-content/uploads/2021/08/cadillac-mountain-sunrise-1-pixabay-Gregory-Sabin.jpg.webp", "park_type": "National Park"},
    {"name": "American Samoa National Park", "latitude": -14.2286, "longitude": -169.8508, "city": "Pago Pago", "state": "American Samoa", "image": "https://github.com/samchappel/lumos/blob/main/client/public/asnp.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Arches National Park", "latitude": 38.7331, "longitude": -109.5925, "city": "Moab", "state": "Utah", "image": "https://github.com/samchappel/lumos/blob/main/client/public/arches.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Badlands National Park", "latitude": 43.8554, "longitude": -102.3397, "city": "Interior", "state": "South Dakota", "image": "https://github.com/samchappel/lumos/blob/main/client/public/badlands.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Big Bend National Park", "latitude": 29.1275, "longitude": -103.2425, "city": "Alpine", "state": "Texas", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJtY5jO8_I5EaREB1FgGzjqyUqYtr9dTBd0a5kjCfX7oWeahrqDNXUKfJpZeDdQmM_vU&usqp=CAU", "park_type": "National Park"},
    {"name": "Biscayne National Park", "latitude": 25.4824, "longitude": -80.2106, "city": "Homestead", "state": "Florida", "image": "https://github.com/samchappel/lumos/blob/main/client/public/biscayne.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Black Canyon of the Gunnison National Park", "latitude": 38.5754, "longitude": -107.7416, "city": "Montrose", "state": "Colorado", "image": "https://github.com/samchappel/lumos/blob/main/client/public/black%20canyon.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Bryce Canyon National Park", "latitude": 37.5930, "longitude": -112.1871, "city": "Bryce", "state": "Utah", "image": "https://github.com/samchappel/lumos/blob/main/client/public/bryce-canyon-sunrise-point-getty-xl_0.jpg?raw=true", "park_type": "National Park"},
    {"name": "Canyonlands National Park", "latitude": 38.3269, "longitude": -109.8783, "city": "Moab", "state": "Utah", "image": "https://github.com/samchappel/lumos/blob/main/client/public/canyonlands.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Carlsbad Caverns National Park", "latitude": 32.1742, "longitude": -104.4459, "city": "Carlsbad", "state": "New Mexico", "image": "https://live.staticflickr.com/65535/49611046938_9edabefc54_b.jpg", "park_type": "National Park"},
    {"name": "Capitol Reef National Park", "latitude": 38.3670, "longitude": -111.2615, "city": "Torrey", "state": "Utah", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWAOQL6IQlM4bbSY-KSGOncgOyzX40ARdoA&usqp=CAU", "park_type": "National Park"},
    {"name": "Channel Islands National Park", "latitude": 34.0094, "longitude": -119.5963, "city": "Ventura", "state": "California", "image": "https://www.gannett-cdn.com/-mm-/001deeeff340e91112f5f21910198f06f36dbe92/c=0-138-3607-2167/local/-/media/2015/07/08/PalmSprings/B9318012293Z.1_20150708141537_000_GLHB9V75G.1-0.jpg", "park_type": "National Park"},
    {"name": "Congaree National Park", "latitude": 33.7915, "longitude": -80.7691, "city": "Columbia", "state": "South Carolina", "image": "https://github.com/samchappel/lumos/blob/main/client/public/congagree.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Crater Lake National Park", "latitude": 42.8684, "longitude": -122.1685, "city": "Klamath Falls", "state": "Oregon", "image": "https://farm9.staticflickr.com/8098/8496168169_4085492169_o.jpg", "park_type": "National Park"},
    {"name": "Cuyahoga Valley National Park", "latitude": 41.2808, "longitude": -81.5678, "city": "Cleveland", "state": "Ohio", "image": "https://github.com/samchappel/lumos/blob/main/client/public/cuyahoga.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Death Valley National Park", "latitude": 36.5054, "longitude": -117.0794, "city": "Furnace Creek", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Death-Valley-Sunrise.jpg?raw=true", "park_type": "National Park"},
    {"name": "Denali National Park and Preserve", "latitude": 63.3333, "longitude": -150.5000, "city": "Healy", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/denali.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Dry Tortugas National Park", "latitude": 24.6285, "longitude": -82.8732, "city": "Key West", "state": "Florida", "image": "https://github.com/samchappel/lumos/blob/main/client/public/dry%20tortugas.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Everglades National Park", "latitude": 25.2866, "longitude": -80.8987, "city": "Homestead", "state": "Florida", "image": "https://github.com/samchappel/lumos/blob/main/client/public/everglades.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Gates of the Arctic National Park", "latitude": 67.7805, "longitude": -153.2916, "city": "Bettles", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/gates%20of%20the%20arctic.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Gateway Arch National Park", "latitude": 38.6247, "longitude": -90.1848, "city": "St. Louis", "state": "Missouri", "image": "https://github.com/samchappel/lumos/blob/main/client/public/gateway%20arch.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Glacier National Park", "latitude": 48.7596, "longitude": -113.7870, "city": "West Glacier", "state": "Montana", "image": "https://github.com/samchappel/lumos/blob/main/client/public/glacier.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Glacier Bay National Park", "latitude": 58.6658, "longitude": -137.0582, "city": "Gustavus", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/glacier%20bay.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Grand Canyon National Park", "latitude": 36.1069, "longitude": -112.1129, "city": "Grand Canyon Village", "state": "Arizona", "image": "https://github.com/samchappel/lumos/blob/main/client/public/grand%20canyon.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Grand Teton National Park", "latitude": 43.7904, "longitude": -110.6818, "city": "Moose", "state": "Wyoming", "image": "https://github.com/samchappel/lumos/blob/main/client/public/grand%20teton.jpg?raw=true", "park_type": "National Park"},
    {"name": "Great Basin National Park", "latitude": 38.9833, "longitude": -114.3000, "city": "Baker", "state": "Nevada", "image": "https://i0.wp.com/airstreamdog.com/wp-content/uploads/2018/11/great-basin-10.jpg?resize=700%2C525", "park_type": "National Park"},
    {"name": "Great Sand Dunes National Park and Preserve", "latitude": 37.7916, "longitude": -105.5943, "city": "Mosca", "state": "Colorado", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMTy2eoqidOIyS5X0FsZ62t-inAUwP0NeZog&usqp=CAU", "park_type": "National Park"},
    {"name": "Great Smoky Mountains National Park", "latitude": 35.6118, "longitude": -83.4895, "city": "Gatlinburg", "state": "Tennessee", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Great%20Smoky%20Mountains.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Guadalupe Mountains National Park", "latitude": 31.9231, "longitude": -104.8654, "city": "Salt Flat", "state": "Texas", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Guadalupe%20Mountains.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Haleakalā National Park", "latitude": 20.7204, "longitude": -156.1552, "city": "Kula", "state": "Hawaii", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Haleakala%CC%84.jpg?raw=true", "park_type": "National Park"},
    {"name": "Hawaii Volcanoes National Park", "latitude": 19.4194, "longitude": -155.2885, "city": "Hilo", "state": "Hawaii", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Hawaii%20Volcanoes.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Hot Springs National Park", "latitude": 34.5217, "longitude": -93.0424, "city": "Hot Springs", "state": "Arkansas", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Hot%20Springs.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Indiana Dunes National Park", "latitude": 41.6533, "longitude": -87.0524, "city": "Porter", "state": "Indiana", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Indiana%20Dunes.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Isle Royale National Park", "latitude": 48.0000, "longitude": -88.9000, "city": "Houghton", "state": "Michigan", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Isle%20Royale.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Joshua Tree National Park", "latitude": 33.8734, "longitude": -115.9010, "city": "Twentynine Palms", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Joshua%20Tree.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Katmai National Park and Preserve", "latitude": 58.6122, "longitude": -155.0631, "city": "King Salmon", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Katmai.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Kenai Fjords National Park", "latitude": 59.9228, "longitude": -149.3565, "city": "Seward", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Kenai%20Fjords.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Kings Canyon National Park", "latitude": 36.8879, "longitude": -118.5551, "city": "Three Rivers", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Kings%20Canyon.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Kobuk Valley National Park", "latitude": 67.5500, "longitude": -159.2833, "city": "Kotzebue", "state": "Alaska", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZOjvvH4ztRPSP1zA9pmfiSmvJfuRjk6OcRw&usqp=CAU", "park_type": "National Park"},
    {"name": "Lake Clark National Park and Preserve", "latitude": 60.5744, "longitude": -153.5556, "city": "Port Alsworth", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Lake%20Clark.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Lassen Volcanic National Park", "latitude": 40.4977, "longitude": -121.4207, "city": "Mineral", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Lassen%20Volcanic.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Mammoth Cave National Park", "latitude": 37.1862, "longitude": -86.1002, "city": "Mammoth Cave", "state": "Kentucky", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Mammoth%20Cave.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Mesa Verde National Park", "latitude": 37.2309, "longitude": -108.4618, "city": "Cortez", "state": "Colorado", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Mesa%20Verde.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Mount Rainier National Park", "latitude": 46.8799, "longitude": -121.7269, "city": "Ashford", "state": "Washington", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Mount%20Rainier.jpeg?raw=true", "park_type": "National Park"},
    {"name": "New River Gorge National Park", "latitude": 37.9275, "longitude": -81.1553, "city": "Glen Jean", "state": "West Virginia", "image": "https://github.com/samchappel/lumos/blob/main/client/public/New%20River%20Gorge.jpeg?raw=true", "park_type": "National Park"},
    {"name": "North Cascades National Park", "latitude": 48.7718, "longitude": -121.2985, "city": "Marblemount", "state": "Washington", "image": "https://github.com/samchappel/lumos/blob/main/client/public/North%20Cascades.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Olympic National Park", "latitude": 47.8021, "longitude": -123.6044, "city": "Port Angeles", "state": "Washington", "image": "https://images.squarespace-cdn.com/content/v1/539be1d4e4b0984ce3f75915/1657665114149-BC7SX65HWEROFRTRTBH9/matera+landscape+photographer+olympic+national+park+wildflowers+mms9-18-5.jpg?format=2500w", "park_type": "National Park"},
    {"name": "Petrified Forest National Park", "latitude": 34.9090, "longitude": -109.8068, "city": "Holbrook", "state": "Arizona", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Petrified%20Forest.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Pinnacles National Park", "latitude": 36.4906, "longitude": -121.1825, "city": "Paicines", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Pinnacles.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Redwood National and State Parks", "latitude": 41.2132, "longitude": -124.0046, "city": "Orick", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Redwood.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Rocky Mountain National Park", "latitude": 40.3428, "longitude": -105.6836, "city": "Estes Park", "state": "Colorado", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Rocky%20Mountain.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Saguaro National Park", "latitude": 32.2967, "longitude": -111.1666, "city": "Tucson", "state": "Arizona", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Saguaro.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Sequoia National Park", "latitude": 36.4864, "longitude": -118.5658, "city": "Three Rivers", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Sequoia.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Shenandoah National Park", "latitude": 38.5177, "longitude": -78.4367, "city": "Luray", "state": "Virginia", "image": "https://images.saymedia-content.com/.image/t_share/MTc0NDg2OTg1NjkwMzI2Mzc2/top-10-things-to-do-in-shenandoah-national-park.jpg", "park_type": "National Park"},
    {"name": "Theodore Roosevelt National Park", "latitude": 46.9780, "longitude": -103.5380, "city": "Medora", "state": "North Dakota", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Theodore%20Roosevelt.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Virgin Islands National Park", "latitude": 18.3428, "longitude": -64.7486, "city": "St. John", "state": "U.S. Virgin Islands", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Virgin%20Islands.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Voyageurs National Park", "latitude": 48.5098, "longitude": -92.8893, "city": "International Falls", "state": "Minnesota", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSanTkcOfWpgvSshgl-G-UGiNnyDh6oD1Rq5Q&usqp=CAU", "park_type": "National Park"},
    {"name": "White Sands National Park", "latitude": 32.7794, "longitude": -106.1709, "city": "Alamogordo", "state": "New Mexico", "image": "https://media.cntraveler.com/photos/5e0648081334d900088b0a21/master/w_1600%2Cc_limit/New-Mexico-White-Sands-GettyImages-1154170319.jpg", "park_type": "National Park"},
    {"name": "Wind Cave National Park", "latitude": 43.5671, "longitude": -103.4782, "city": "Hot Springs", "state": "South Dakota", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Wind%20Cave.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Wrangell-St. Elias National Park and Preserve", "latitude": 61.0000, "longitude": -142.0000, "city": "Copper Center", "state": "Alaska", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Wrangell-St.%20Elias.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Yellowstone National Park", "latitude": 44.4280, "longitude": -110.5885, "city": "Yellowstone", "state": "Wyoming", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Yellowstone.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Yosemite National Park", "latitude": 37.8651, "longitude": -119.5383, "city": "Yosemite Valley", "state": "California", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Yosemite.jpeg?raw=true", "park_type": "National Park"},
    {"name": "Zion National Park", "latitude": 37.2982, "longitude": -113.0263, "city": "Springdale", "state": "Utah", "image": "https://github.com/samchappel/lumos/blob/main/client/public/Zion.jpeg?raw=true", "park_type": "National Park"}
]
print('locations created')

def make_locations():

    Location.query.delete()

    locations = []

    for location_dict in locations_list:
        location = Location(
            name=location_dict["name"],
            latitude=location_dict["latitude"],
            longitude=location_dict["longitude"],
            # timezone=location_dict["timezone"],
            city=location_dict["city"],
            state=location_dict['state'],
            image=location_dict["image"],
            park_type=location_dict["park_type"]
        )
        locations.append(location)

    db.session.add_all(locations)
    db.session.commit()
print('locations committed')


print('creating user_favorites')
user_favorites_list = [
    {"user_id": 1, "location_id": 1},
    {"user_id": 1, "location_id": 12},
    {"user_id": 1, "location_id": 25},
    {"user_id": 2, "location_id": 3},
    {"user_id": 2, "location_id": 47},
    {"user_id": 3, "location_id": 20},
    {"user_id": 3, "location_id": 33},
    {"user_id": 4, "location_id": 7},
    {"user_id": 4, "location_id": 52},
    {"user_id": 5, "location_id": 16},
    {"user_id": 5, "location_id": 42},
    {"user_id": 6, "location_id": 11},
    {"user_id": 6, "location_id": 37},
    {"user_id": 7, "location_id": 2},
    {"user_id": 7, "location_id": 19},
    {"user_id": 8, "location_id": 8},
    {"user_id": 8, "location_id": 28},
    {"user_id": 9, "location_id": 13},
    {"user_id": 9, "location_id": 40},
    {"user_id": 10, "location_id": 1},
    {"user_id": 10, "location_id": 35},
    {"user_id": 11, "location_id": 5},
    {"user_id": 11, "location_id": 21},
    {"user_id": 12, "location_id": 6},
    {"user_id": 12, "location_id": 45},
    {"user_id": 13, "location_id": 15},
    {"user_id": 13, "location_id": 39},
    {"user_id": 14, "location_id": 9},
    {"user_id": 14, "location_id": 29},
    {"user_id": 15, "location_id": 4},
    {"user_id": 15, "location_id": 50},
    {"user_id": 16, "location_id": 17},
    {"user_id": 16, "location_id": 31},
    {"user_id": 17, "location_id": 23},
    {"user_id": 17, "location_id": 44},
    {"user_id": 18, "location_id": 10},
    {"user_id": 18, "location_id": 38},
    {"user_id": 19, "location_id": 14},
    {"user_id": 19, "location_id": 41},
    {"user_id": 20, "location_id": 22},
    {"user_id": 20, "location_id": 49},
    {"user_id": 21, "location_id": 34},
    {"user_id": 21, "location_id": 56},
    {"user_id": 22, "location_id": 26},
    {"user_id": 22, "location_id": 48},
    {"user_id": 23, "location_id": 27},
    {"user_id": 23, "location_id": 55},
    {"user_id": 24, "location_id": 32},
    {"user_id": 24, "location_id": 54},
    {"user_id": 25, "location_id": 30},
    {"user_id": 25, "location_id": 51},
]
print('user_favorites created')

def make_user_favorites():

    UserFavorite.query.delete()

    user_favorites = []

    for user_favorites_dict in user_favorites_list:
        user_favorite = UserFavorite(
            user_id=user_favorites_dict["user_id"],
            location_id=user_favorites_dict["location_id"]
        )
        user_favorites.append(user_favorite)

    db.session.add_all(user_favorites)
    db.session.commit()

print('user_favorites committed')


print('creating photos')
photos_list = [
    {"user_id": 1, "image": "./uploads/1.jpeg", "location": "Turkey Burn", "city": "Moab", "state": "Utah", "caption": "Full moon at sunset, even drugs couldn't make this better", "date": "2015-11-03"},
    {"user_id": 1, "image": "./uploads/2.jpeg", "location": "College of the Atlantic", "city": "Bar Harbor", "state": "Maine", "caption": "Sunset at my old college pier", "date": "2014-08-12"},
    {"user_id": 2, "image": "./uploads/3.jpg", "location": "Roy", "city": "Roy", "state": "New Mexico", "caption": "Light show after a little bouldering!", "date": "2015-11-03"},
    {"user_id": 2, "image": "./uploads/4.jpeg", "location": "Jurassic Park - Rocky Mountain Natioal Park", "city": "Estes Park", "state": "Colorado", "caption": "Sun blip on The Edge of Time with a view on Longs Peak in the back!", "date": "2017-09-16"},
    {"user_id": 2, "image": "./uploads/5.jpeg", "location": "Snoqualmie Pass", "city": "North Bend", "state": "Washington", "caption": "Visting Sam in Washington! Might have to move here!!!", "date": "2015-11-03"},
    {"user_id": 3, "image": "./uploads/6.jpg", "location": "Eastern Sierras", "city": "Crestview", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/7.jpg", "location": "Top of the World", "city": "Laguna Beach", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/8.jpg", "location": "On the Pier", "city": "Santa Barbara", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/9.jpg", "location": "Morning Froth", "city": "Fire Island", "state": "New York", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/10.jpg", "location": "That One Place", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/11.jpg", "location": "Eastern Sieera Nevada Mountains", "city": "Mammoth Lakes", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/12.jpg", "location": "My Back Deck", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/13.JPG", "location": "Steamer Lane", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/14.JPG", "location": "Midnight Safari", "city": "Silver City", "state": "New Mexico", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/15.jpg", "location": "Natural Bridges State Beach", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/16.jpg", "location": "West Cliff Drive", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/17.jpg", "location": "West Cliff Drive", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/18.jpg", "location": "West Cliff Drive", "city": "Santa Cruz", "state": "California", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 3, "image": "./uploads/19.jpg", "location": "Young Pueblo", "city": "Pueblo", "state": "Colorado", "caption": "Find this and my other film photos on my instagram! (@filmpotato_)", "date": "2017-09-16"},
    {"user_id": 7, "image": "./uploads/20.jpeg", "location": "Glacier Point, Yosemite National Park", "city": "El Portal", "state": "California", "caption": "Moments before the jump at twilight!", "date": "2017-09-16"},
    {"user_id": 7, "image": "./uploads/22.jpeg", "location": "Mt Si", "city": "North Bend", "state": "Washington", "caption": "Got out to visit Sam in Washington - holy smokes is it pretty!!", "date": "2015-11-03"},
    {"user_id": 10, "image": "./uploads/23.jpeg", "location": "North Cascades", "city": "Seattle", "state": "Washington", "caption": "So excited to visit Sam in Washington!! First light over the clouds.", "date": "2015-11-03"},
    {"user_id": 1, "image": "./uploads/24.jpeg", "location": "Elgol", "city": "Isle of Skye", "state": "Scotland", "caption": "I'll be an early bird if this is the worm.", "date": "2015-11-03"},
    {"user_id": 2, "image": "./uploads/25.jpeg", "location": "Mt Rainier", "city": "Ashford", "state": "Washington", "caption": "Finally visted Sam in Washington! SO WORTH IT :)", "date": "2015-11-03"},
    {"user_id": 11, "image": "./uploads/26.jpeg", "location": "Bolinas Ridge", "city": "Bolinas", "state": "California", "caption": "On a run, stopped to snap this moment!", "date": "2015-11-03"},
    {"user_id": 6, "image": "./uploads/27.jpeg", "location": "Eastern Sierras", "city": "Bishop", "state": "California", "caption": "Celebrating Code Blooded and all of their achievements with a backpacking trip!", "date": "2015-11-03"},
    {"user_id": 4, "image": "./uploads/28.jpeg", "location": "Venice Beach", "city": "Los Angeles", "state": "California", "caption": "Endless Summer", "date": "2015-11-03"}
]
print('photos created')

def make_photos():

    Photo.query.delete()

    photos = []

    for photo_dict in photos_list:
        date_str = photo_dict["date"]
        date = datetime.strptime(date_str, "%Y-%m-%d").date()
        photo = Photo(
            user_id=photo_dict["user_id"],
            image=photo_dict["image"],
            location=photo_dict["location"],
            city=photo_dict["city"],
            state=photo_dict["state"],
            caption=photo_dict["caption"],
            date=date
        )
        photos.append(photo)

    db.session.add_all(photos)
    db.session.commit()
    print('photos committed')


print('creating comments')
comments_list = [
    {"user_id": 2, "photo_id": 1, "comment": "Wow, so beautiful!"},
    {"user_id": 5, "photo_id": 1, "comment": "Drugs could still make this better!"},
    {"user_id": 7, "photo_id": 1, "comment": "I've always wanted to visit Moab!"},
    {"user_id": 12, "photo_id": 2, "comment": "Looks like a great spot to enjoy the sunset!"},
    {"user_id": 18, "photo_id": 2, "comment": "Love the colors in this photo!"},
    {"user_id": 6, "photo_id": 2, "comment": "Great shot!"},
    {"user_id": 13, "photo_id": 2, "comment": "What a stunning view!"},
    {"user_id": 17, "photo_id": 2, "comment": "Spectacular view!"},
    {"user_id": 24, "photo_id": 3, "comment": "New Mexico is so beautiful!"},
    {"user_id": 26, "photo_id": 3, "comment": "Great photo!"},
    {"user_id": 16, "photo_id": 3, "comment": "I can't wait to climb at Roy!"},
    {"user_id": 17, "photo_id": 3, "comment": "Spectacular colors!"},
    {"user_id": 25, "photo_id": 3, "comment": "One of the most beautiful places on Earth!"},
    {"user_id": 6, "photo_id": 3, "comment": "Spectacular view!"},
    {"user_id": 15, "photo_id": 3, "comment": "Can't wait to visit Roy!"},
    {"user_id": 19, "photo_id": 4, "comment": "So peaceful!"},
    {"user_id": 22, "photo_id": 4, "comment": "Beautiful photo - LOVE the Diamond!"},
    {"user_id": 13, "photo_id": 4, "comment": "What a stunning location!"},
    {"user_id": 1, "photo_id": 5, "comment": "Love the sunrise colors in this photo!"},
    {"user_id": 4, "photo_id": 5, "comment": "Snoqualmie Pass is one of my favorite spots in Washington!"},
    {"user_id": 26, "photo_id": 5, "comment": "What a beautiful photo!"},
    {"user_id": 6, "photo_id": 5, "comment": "Amazing photo!"},
    {"user_id": 10, "photo_id": 5, "comment": "Snoqualmie Pass is one of my favorite spots in Washington!"},
    {"user_id": 13, "photo_id": 5, "comment": "What a breathtaking view!"},
    {"user_id": 17, "photo_id": 6, "comment": "The mountains are calling!"},
    {"user_id": 1, "photo_id": 6, "comment": "Love the vintage vibe!"},
    {"user_id": 2, "photo_id": 6, "comment": "Love the vintage vibe of this photo!"},
    {"user_id": 7, "photo_id": 6, "comment": "The Eastern Sierras are breathtaking!"},
    {"user_id": 11, "photo_id": 7, "comment": "I love Laguna Beach!"},
    {"user_id": 19, "photo_id": 7, "comment": "What a stunning view!"},
    {"user_id": 9, "photo_id": 7, "comment": "Breathtaking view!"},
    {"user_id": 16, "photo_id": 7, "comment": "Amazing shot!"},
    {"user_id": 20, "photo_id": 8, "comment": "Looks like a great place to relax!"},
    {"user_id": 21, "photo_id": 8, "comment": "Love the colors in this photo!"},
    {"user_id": 25, "photo_id": 8, "comment": "Looks like a great place to relax and unwind!"},
    {"user_id": 1, "photo_id": 9, "comment": "Hubba hubba!!!"},
    {"user_id": 5, "photo_id": 9, "comment": "Morning Froth is one of my favorite surf spots!"},
    {"user_id": 11, "photo_id": 9, "comment": "Beautiful shot!"},
    {"user_id": 14, "photo_id": 9, "comment": "Can't wait to visit Fire Island!"},
    {"user_id": 8, "photo_id": 10, "comment": "Great photo!"},
    {"user_id": 23, "photo_id": 10, "comment": "Looks like a fun place to explore!"},
    {"user_id": 8, "photo_id": 10, "comment": "Great photo!"},
    {"user_id": 12, "photo_id": 10, "comment": "Santa Cruz is one of my favorite places to visit!"},
    {"user_id": 13, "photo_id": 11, "comment": "The Eastern Sierras are so special!"},
    {"user_id": 14, "photo_id": 11, "comment": "What an incredible cloud!"},
    {"user_id": 4, "photo_id": 11, "comment": "The Sierra Nevada mountains are stunning!"},
    {"user_id": 10, "photo_id": 11, "comment": "What a cool cloud!"},
    {"user_id": 2, "photo_id": 12, "comment": "Looks like a great place to relax and enjoy the view!"},
    {"user_id": 21, "photo_id": 12, "comment": "Great shot!"},
    {"user_id": 24, "photo_id": 13, "comment": "I love surfing at Steamer Lane!"},
    {"user_id": 26, "photo_id": 13, "comment": "Great photo!"},
    {"user_id": 5, "photo_id": 13, "comment": "One of my favorite surf spots!"},
    {"user_id": 7, "photo_id": 13, "comment": "Love the colors in this photo!"},
    {"user_id": 1, "photo_id": 14, "comment": "Birds of a feather!"},
    {"user_id": 4, "photo_id": 14, "comment": "What a cool shot!"},
    {"user_id": 12, "photo_id": 14, "comment": "What a cool shot!"},
    {"user_id": 22, "photo_id": 15, "comment": "Great photo!"},
    {"user_id": 6, "photo_id": 15, "comment": "Natural Bridges is one of my favorite spots in Santa Cruz!"},
    {"user_id": 9, "photo_id": 15, "comment": "Great photo!"},
    {"user_id": 25, "photo_id": 16, "comment": "Stunning!"},
    {"user_id": 8, "photo_id": 16, "comment": "I love the vibes in Santa Cruz!"},
    {"user_id": 11, "photo_id": 16, "comment": "Looks like a beautiful place to walk!"},
    {"user_id": 14, "photo_id": 16, "comment": "Yo, Santa Cruz is my fave!"},
    {"user_id": 16, "photo_id": 17, "comment": "West Cliff Drive is one of my favorite spots in Santa Cruz!"},
    {"user_id": 19, "photo_id": 17, "comment": "Great shot!"},
    {"user_id": 9, "photo_id": 17, "comment": "Amazing photo!"},
    {"user_id": 15, "photo_id": 17, "comment": "I love walking along West Cliff Drive!"},
    {"user_id": 19, "photo_id": 18, "comment": "Love the POV!"},
    {"user_id": 20, "photo_id": 18, "comment": "I love the colors in this photo!"},
    {"user_id": 26, "photo_id": 18, "comment": "Love everything about this!"},
    {"user_id": 21, "photo_id": 19, "comment": "Great shot!"},
    {"user_id": 23, "photo_id": 19, "comment": "What a beautiful view!"},
    {"user_id": 2, "photo_id": 19, "comment": "Wow!"},
    {"user_id": 5, "photo_id": 19, "comment": "Looks like a beautiful place to visit!"},
    {"user_id": 1, "photo_id": 20, "comment": "YOU WON'T!"},
    {"user_id": 2, "photo_id": 20, "comment": "I would LOVE to jump at twilight!"},
    {"user_id": 2, "photo_id": 21, "comment": "Should we move to Washington??"},
    {"user_id": 9, "photo_id": 22, "comment": "The colors in the sky are so beautiful!"},
    {"user_id": 1, "photo_id": 22, "comment": "You'll be here SO SOON!"},
    {"user_id": 8, "photo_id": 22, "comment": "Wow, so cool."},
    {"user_id": 3, "photo_id": 23, "comment": "This looks like a great place for a hike."},
    {"user_id": 5, "photo_id": 23, "comment": "I can't wait to visit there someday!"},
    {"user_id": 2, "photo_id": 23, "comment": "The scenery in Scotland is so beautiful!"},
    {"user_id": 9, "photo_id": 23, "comment": "I've always wanted to visit Scotland!"},
    {"user_id": 1, "photo_id": 24, "comment": "So when are you moving here??"},
    {"user_id": 4, "photo_id": 24, "comment": "I love hiking in Mt. Rainier National Park!"},
    {"user_id": 1, "photo_id": 25, "comment": "Get it girl!"},    
    {"user_id": 12, "photo_id": 25, "comment": "I love running in Bolinas!"},
    {"user_id": 1, "photo_id": 26, "comment": "HECK YEAH, WE DID IT!"},
    {"user_id": 2, "photo_id": 26, "comment": "That's my favorite spot in the Eastern Sierras!"},
    {"user_id": 1, "photo_id": 27, "comment": "I love the vibe at Venice Beach!"},
    {"user_id": 13, "photo_id": 27, "comment": "This photo makes me miss LA so much!"}
]
print('comments created')

def make_comments():

    Comment.query.delete()

    comments = []

    for comment_dict in comments_list:
        comment = Comment(
            user_id=comment_dict["user_id"],
            photo_id=comment_dict["photo_id"],
            comment=comment_dict["comment"]
        )
        comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()
    print('comments committed')


def make_likes():
    Like.query.delete()

    likes = []
    
    for photo in Photo.query.all():
        num_likes = random.randint(1, 28)
        for i in range(num_likes):
            like = Like(user_id=random.randint(1, 26), photo_id=photo.id)
            likes.append(like)
    print('likes created')

    db.session.add_all(likes)
    db.session.commit()
    print('likes committed')



if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_locations()
        make_user_favorites()
        make_photos()
        make_comments()
        print('creating likes')
        make_likes()