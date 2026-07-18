// The Living Index — full studio catalog (51 entries).
// 8 entries are "in motion" (carry a hover-preview video); the rest are stills.
// Images live in /public/work. Swap `video` fields for your own recordings later.

export const previewPool = [
  "https://cdn.sceneai.art/Hero%20Section%20Video/a8132a81-b526-4f91-8095-003ce931ecdd.mp4",
  "https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4",
  "https://cdn.sceneai.art/Hero%20Section%20Video/c653421c-6cd9-472a-811a-b833dd320372.mp4",
  "https://cdn.sceneai.art/Hero%20Section%20Video/aa476a86-3c53-4229-b946-84f699108e53.mp4",
  "https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4",
  "https://cdn.sceneai.art/Hero%20Section%20Video/973fa3f6-7715-4e73-9cfd-100ee86285b5.mp4",
  "https://cdn.sceneai.art/Hero%20Section%20Video/ab1347aa-b8fc-4f38-ac9d-9a6238bf8647.mov",
  "https://cdn.sceneai.art/Hero%20Section%20Video/247f75dd-335a-4aaa-ba65-47df2f7b24b9.mp4",
];

export const CATEGORIES = { website: "Websites", "case-study": "Case Studies", app: "Apps" };

export const INDUSTRIES = [
  "Real Estate",
  "E-Commerce",
  "NGOs & Nonprofits",
  "Technology",
  "Education",
  "Healthcare",
  "Finance",
  "Corporate",
  "Manufacturing",
  "Construction",
  "Hospitality",
  "Restaurants & Food",
  "Logistics",
  "Travel & Tourism",
  "Legal",
  "Blogs & Publishing",
  "Personal Brands",
  "Fashion & Beauty",
  "Government",
  "Agriculture",
];

export const catalog = [
  { n: '01', id: 'peak-threads-branding', title: 'Peak Threads branding', category: 'website', discipline: 'Brand · Webflow', client: 'Peak Threads', year: '2025', industry: 'Fashion & Beauty', image: '/work/peak-threads-branding.webp', video: previewPool[0] },
  { n: '02', id: 'era-han-watch', title: 'Era Han watch', category: 'website', discipline: 'Site · Next.js', client: 'Era Han', year: '2024', industry: 'E-Commerce', image: '/work/era-han-watch.webp', video: previewPool[3] },
  { n: '03', id: 'break-free-streetwear', title: 'Break Free Streetwear', category: 'website', discipline: 'Brand · Shopify', client: 'Break Free', year: '2025', industry: 'Fashion & Beauty', image: '/work/break-free-streetwear.webp', video: previewPool[1] },
  { n: '04', id: 'bloom-magazine-cover', title: 'Bloom Magazine Cover', category: 'website', discipline: 'Editorial · CMS', client: 'Bloom', year: '2023', industry: 'Blogs & Publishing', image: '/work/bloom-magazine-cover.webp', video: previewPool[4] },
  { n: '05', id: 'desert-modern-home', title: 'Desert Modern Home', category: 'case-study', discipline: 'Research · UX', client: 'Marlow Homes', year: '2025', industry: 'Real Estate', image: '/work/desert-modern-home.webp', video: previewPool[2] },
  { n: '06', id: 'midcentury-listening-room', title: 'Midcentury Listening Room', category: 'case-study', discipline: 'Strategy · Commerce', client: 'Analog Co.', year: '2024', industry: 'Hospitality', image: '/work/midcentury-listening-room.webp', video: previewPool[5] },
  { n: '07', id: 'putt-perfect-poster', title: 'Putt Perfect Poster', category: 'app', discipline: 'iOS · Product', client: 'Putt Perfect', year: '2025', industry: 'Technology', image: '/work/putt-perfect-poster.webp', video: previewPool[7] },
  { n: '08', id: 'offroad-adventure', title: 'Offroad Adventure', category: 'app', discipline: 'Mobile · Maps', client: 'Trailhead', year: '2024', industry: 'Travel & Tourism', image: '/work/offroad-adventure.webp', video: previewPool[6] },
  { n: '09', id: 'architectural-visions', title: 'Architectural Visions', category: 'case-study', discipline: 'Research · UX', client: 'Architectural', year: '2025', industry: 'Construction', image: '/work/architectural-visions.webp', video: null },
  { n: '10', id: 'art-gallery-observer', title: 'Art Gallery Observer', category: 'case-study', discipline: 'Research · UX', client: 'Art', year: '2024', industry: 'Corporate', image: '/work/art-gallery-observer.webp', video: null },
  { n: '11', id: 'brown-textured-fabric', title: 'Brown Textured Fabric', category: 'case-study', discipline: 'Research · UX', client: 'Brown', year: '2023', industry: 'Manufacturing', image: '/work/brown-textured-fabric.webp', video: null },
  { n: '12', id: 'burgundy-denim-skirt', title: 'Burgundy Denim Skirt', category: 'website', discipline: 'Design · Build', client: 'Burgundy', year: '2024', industry: 'Fashion & Beauty', image: '/work/burgundy-denim-skirt.webp', video: null },
  { n: '13', id: 'children-running-outdoors', title: 'Children running outdoors', category: 'app', discipline: 'Product · iOS', client: 'Children', year: '2025', industry: 'Education', image: '/work/children-running-outdoors.webp', video: null },
  { n: '14', id: 'circular-skylight', title: 'Circular Skylight', category: 'case-study', discipline: 'Research · UX', client: 'Circular', year: '2023', industry: 'Construction', image: '/work/circular-skylight.webp', video: null },
  { n: '15', id: 'clothing-brand-label', title: 'Clothing Brand Label', category: 'website', discipline: 'Design · Build', client: 'Clothing', year: '2025', industry: 'Fashion & Beauty', image: '/work/clothing-brand-label.webp', video: null },
  { n: '16', id: 'concrete-terrace-garden', title: 'Concrete Terrace Garden', category: 'case-study', discipline: 'Research · UX', client: 'Concrete', year: '2024', industry: 'Real Estate', image: '/work/concrete-terrace-garden.webp', video: null },
  { n: '17', id: 'distressed-grey-suit', title: 'Distressed Grey Suit', category: 'website', discipline: 'Design · Build', client: 'Distressed', year: '2023', industry: 'Legal', image: '/work/distressed-grey-suit.webp', video: null },
  { n: '18', id: 'garnet-gold-pendant', title: 'Garnet Gold Pendant', category: 'website', discipline: 'Design · Build', client: 'Garnet', year: '2024', industry: 'E-Commerce', image: '/work/garnet-gold-pendant.webp', video: null },
  { n: '19', id: 'gold-diamond-earring', title: 'Gold Diamond Earring', category: 'website', discipline: 'Design · Build', client: 'Gold', year: '2025', industry: 'E-Commerce', image: '/work/gold-diamond-earring.webp', video: null },
  { n: '20', id: 'gold-ear-stack', title: 'Gold Ear Stack', category: 'website', discipline: 'Design · Build', client: 'Gold', year: '2023', industry: 'E-Commerce', image: '/work/gold-ear-stack.webp', video: null },
  { n: '21', id: 'green-baseball-cap', title: 'Green Baseball Cap', category: 'website', discipline: 'Design · Build', client: 'Green', year: '2025', industry: 'Fashion & Beauty', image: '/work/green-baseball-cap.webp', video: null },
  { n: '22', id: 'happy-birthday-card', title: 'Happy Birthday Card', category: 'website', discipline: 'Design · Build', client: 'Happy', year: '2024', industry: 'Personal Brands', image: '/work/happy-birthday-card.webp', video: null },
  { n: '23', id: 'human-nose', title: 'Human Nose', category: 'case-study', discipline: 'Research · UX', client: 'Human', year: '2023', industry: 'Healthcare', image: '/work/human-nose.webp', video: null },
  { n: '24', id: 'jade-pendant-necklace', title: 'Jade Pendant Necklace', category: 'website', discipline: 'Design · Build', client: 'Jade', year: '2024', industry: 'E-Commerce', image: '/work/jade-pendant-necklace.webp', video: null },
  { n: '25', id: 'laundry-by-sea', title: 'Laundry by Sea', category: 'case-study', discipline: 'Research · UX', client: 'Laundry', year: '2025', industry: 'Hospitality', image: '/work/laundry-by-sea.webp', video: null },
  { n: '26', id: 'lemon-gin-cocktail', title: 'Lemon Gin Cocktail', category: 'website', discipline: 'Design · Build', client: 'Lemon', year: '2023', industry: 'Restaurants & Food', image: '/work/lemon-gin-cocktail.webp', video: null },
  { n: '27', id: 'linen-drying-outside', title: 'Linen Drying Outside', category: 'case-study', discipline: 'Research · UX', client: 'Linen', year: '2025', industry: 'Hospitality', image: '/work/linen-drying-outside.webp', video: null },
  { n: '28', id: 'luxury-gold-watch', title: 'Luxury Gold Watch', category: 'website', discipline: 'Design · Build', client: 'Luxury', year: '2024', industry: 'Finance', image: '/work/luxury-gold-watch.webp', video: null },
  { n: '29', id: 'man-in-hat', title: 'Man in hat', category: 'case-study', discipline: 'Research · UX', client: 'Man', year: '2023', industry: 'Personal Brands', image: '/work/man-in-hat.webp', video: null },
  { n: '30', id: 'margaux-baby-set', title: 'Margaux Baby Set', category: 'website', discipline: 'Design · Build', client: 'Margaux', year: '2024', industry: 'E-Commerce', image: '/work/margaux-baby-set.webp', video: null },
  { n: '31', id: 'misty-forest-cabin', title: 'Misty Forest Cabin', category: 'case-study', discipline: 'Research · UX', client: 'Misty', year: '2025', industry: 'Travel & Tourism', image: '/work/misty-forest-cabin.webp', video: null },
  { n: '32', id: 'misty-lake-spirit', title: 'Misty Lake Spirit', category: 'case-study', discipline: 'Research · UX', client: 'Misty', year: '2023', industry: 'Travel & Tourism', image: '/work/misty-lake-spirit.webp', video: null },
  { n: '33', id: 'modern-home-office', title: 'Modern Home Office', category: 'case-study', discipline: 'Research · UX', client: 'Modern', year: '2025', industry: 'Corporate', image: '/work/modern-home-office.webp', video: null },
  { n: '34', id: 'modern-luxury-shower', title: 'Modern Luxury Shower', category: 'case-study', discipline: 'Research · UX', client: 'Modern', year: '2024', industry: 'Real Estate', image: '/work/modern-luxury-shower.webp', video: null },
  { n: '35', id: 'mother-and-baby', title: 'Mother and baby', category: 'app', discipline: 'Product · iOS', client: 'Mother', year: '2023', industry: 'Healthcare', image: '/work/mother-and-baby.webp', video: null },
  { n: '36', id: 'mountain-hiking-adventure', title: 'Mountain Hiking Adventure', category: 'app', discipline: 'Product · iOS', client: 'Mountain', year: '2024', industry: 'Travel & Tourism', image: '/work/mountain-hiking-adventure.webp', video: null },
  { n: '37', id: 'mountain-meadow', title: 'Mountain Meadow', category: 'app', discipline: 'Product · iOS', client: 'Mountain', year: '2025', industry: 'Agriculture', image: '/work/mountain-meadow.webp', video: null },
  { n: '38', id: 'naturehydrate-water-bottle', title: 'NatureHydrate Water Bottle', category: 'website', discipline: 'Design · Build', client: 'NatureHydrate', year: '2023', industry: 'Logistics', image: '/work/naturehydrate-water-bottle.webp', video: null },
  { n: '39', id: 'oceanfront-bedroom-sunset', title: 'Oceanfront Bedroom Sunset', category: 'case-study', discipline: 'Research · UX', client: 'Oceanfront', year: '2025', industry: 'Hospitality', image: '/work/oceanfront-bedroom-sunset.webp', video: null },
  { n: '40', id: 'oil-bubbles', title: 'Oil Bubbles', category: 'case-study', discipline: 'Research · UX', client: 'Oil', year: '2024', industry: 'Manufacturing', image: '/work/oil-bubbles.webp', video: null },
  { n: '41', id: 'olive-tote-bag', title: 'Olive tote bag', category: 'website', discipline: 'Design · Build', client: 'Olive', year: '2023', industry: 'NGOs & Nonprofits', image: '/work/olive-tote-bag.webp', video: null },
  { n: '42', id: 'oranges-and-chair', title: 'Oranges and Chair', category: 'case-study', discipline: 'Research · UX', client: 'Oranges', year: '2024', industry: 'Restaurants & Food', image: '/work/oranges-and-chair.webp', video: null },
  { n: '43', id: 'outdoor-concert-poster', title: 'Outdoor Concert Poster', category: 'website', discipline: 'Design · Build', client: 'Outdoor', year: '2025', industry: 'Government', image: '/work/outdoor-concert-poster.webp', video: null },
  { n: '44', id: 'puppy-adventure-thumbnail', title: 'Puppy Adventure Thumbnail', category: 'app', discipline: 'Product · iOS', client: 'Puppy', year: '2023', industry: 'Personal Brands', image: '/work/puppy-adventure-thumbnail.webp', video: null },
  { n: '45', id: 'red-sunset-portrait', title: 'Red sunset portrait', category: 'case-study', discipline: 'Research · UX', client: 'Red', year: '2025', industry: 'Personal Brands', image: '/work/red-sunset-portrait.webp', video: null },
  { n: '46', id: 'sage-green-sandals', title: 'Sage Green Sandals', category: 'website', discipline: 'Design · Build', client: 'Sage', year: '2024', industry: 'Fashion & Beauty', image: '/work/sage-green-sandals.webp', video: null },
  { n: '47', id: 'sage-slingback-heels', title: 'Sage Slingback Heels', category: 'website', discipline: 'Design · Build', client: 'Sage', year: '2023', industry: 'Fashion & Beauty', image: '/work/sage-slingback-heels.webp', video: null },
  { n: '48', id: 'san-francisco-paint', title: 'San Francisco Paint', category: 'website', discipline: 'Design · Build', client: 'San', year: '2024', industry: 'Construction', image: '/work/san-francisco-paint.webp', video: null },
  { n: '49', id: 'skateboard-urban-glide', title: 'Skateboard Urban Glide', category: 'app', discipline: 'Product · iOS', client: 'Skateboard', year: '2025', industry: 'Technology', image: '/work/skateboard-urban-glide.webp', video: null },
  { n: '50', id: 'stained-glass-light', title: 'Stained Glass Light', category: 'case-study', discipline: 'Research · UX', client: 'Stained', year: '2023', industry: 'Construction', image: '/work/stained-glass-light.webp', video: null },
  { n: '51', id: 'tokyo-pop-poster', title: 'Tokyo Pop Poster', category: 'website', discipline: 'Design · Build', client: 'Tokyo', year: '2025', industry: 'Blogs & Publishing', image: '/work/tokyo-pop-poster.webp', video: null }
];

// Hero index — the studio's focus industries, each with a motion preview.
// Decoupled from `catalog` so the Work page keeps its 51 real project entries.
// Columns read: № · INDUSTRY (title) · SERVICE (discipline) · FOCUS (client) · YEAR.
export const heroRows = [
  { id: "ind-real-estate", n: "01", title: "Real Estate",       discipline: "Websites",    client: "Listings",    year: "2025", image: "/work/desert-modern-home.webp",       video: previewPool[2] },
  { id: "ind-ecommerce",   n: "02", title: "E-Commerce",        discipline: "Storefronts", client: "Conversion",  year: "2025", image: "/work/era-han-watch.webp",            video: previewPool[3] },
  { id: "ind-nonprofit",   n: "03", title: "NGOs & Nonprofits", discipline: "Websites",    client: "Fundraising", year: "2024", image: "/work/bloom-magazine-cover.webp",      video: previewPool[4] },
  { id: "ind-technology",  n: "04", title: "Technology",        discipline: "Web Apps",    client: "Product",     year: "2025", image: "/work/putt-perfect-poster.webp",       video: previewPool[7] },
  { id: "ind-education",   n: "05", title: "Education",          discipline: "Platforms",   client: "Learning",    year: "2024", image: "/work/midcentury-listening-room.webp", video: previewPool[5] },
  { id: "ind-healthcare",  n: "06", title: "Healthcare",         discipline: "Websites",    client: "Booking",     year: "2024", image: "/work/break-free-streetwear.webp",     video: previewPool[1] },
  { id: "ind-finance",     n: "07", title: "Finance",            discipline: "Web Apps",    client: "Dashboards",  year: "2025", image: "/work/peak-threads-branding.webp",     video: previewPool[0] },
  { id: "ind-corporate",   n: "08", title: "Corporate",          discipline: "Websites",    client: "Brand",       year: "2023", image: "/work/offroad-adventure.webp",         video: previewPool[6] },
];
export const byCategory = (key) => catalog.filter((p) => p.category === key);
export const byIndustry = (name) => catalog.filter((p) => p.industry === name);
export const inMotionCount = catalog.filter((p) => p.video).length;