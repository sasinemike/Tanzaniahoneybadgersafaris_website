import React, { useState, useEffect } from 'react';
import { Page, TourPackage, Testimonial } from './types';
import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChevronRight, Star, ShieldCheck, Users, Calendar, CheckCircle, Download } from 'lucide-react';
import SafariPlanner from './components/SafariPlanner';

// --- Placeholder Data ---
const TOURS: TourPackage[] = [
  {
    id: '1',
    title: 'Serengeti Migration Safari',
    days: 7,
    price: 2400,
    image: 'migration.jpg',
    description: 'Witness the greatest show on earth. Follow the massive herds of wildebeest and zebra across the endless plains.',
    highlights: ['Game Drives', 'Camping under stars', 'Hot Air Balloon option']
  },
  {
    id: '2',
    title: 'Kilimanjaro Machame Route',
    days: 6,
    price: 1850,
    image: 'https://picsum.photos/id/1018/800/600',
    description: 'Conquer the roof of Africa. The Machame route offers the most scenic ascent to the summit.',
    highlights: ['Professional Guides', 'Porters included', 'Scenic Views']
  },
  {
    id: '3',
    title: 'Zanzibar Beach Retreat',
    days: 4,
    price: 800,
    image: 'https://picsum.photos/id/1047/800/600',
    description: 'Relax on pristine white sands after your safari adventure. Experience the spice island.',
    highlights: ['Stone Town Tour', 'Spice Farm', 'Sunset Cruise']
  }
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sarah Jenkins', location: 'UK', rating: 5, text: 'The Honeybadger team was fearless in finding us the best spots to see the Big 5! Unforgettable.' },
  { id: '2', name: 'Mark & Lisa', location: 'USA', rating: 5, text: 'Professional, safe, and incredibly knowledgeable guides. Highly recommended.' },
  { id: '3', name: 'Hiroshi T.', location: 'Japan', rating: 4, text: 'Great coordination for our Kilimanjaro climb. The food on the mountain was surprisingly good!' }
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

// --- Components ---

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'white'; className?: string }> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-safari-green text-white hover:bg-green-800 shadow-md hover:shadow-lg",
    outline: "border-2 border-safari-green text-safari-green hover:bg-safari-green hover:text-white",
    white: "bg-white text-safari-green hover:bg-gray-100 shadow-md"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    {subtitle && <span className="text-safari-gold font-bold uppercase tracking-wider text-sm">{subtitle}</span>}
    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">{title}</h2>
    <div className="w-20 h-1 bg-safari-green mx-auto mt-4 rounded-full"></div>
  </div>
);

// --- Pages ---

const HomePage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* Hero */}
    <div className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img src="https://picsum.photos/id/1074/1920/1080" alt="Lioness" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 leading-tight drop-shadow-lg">
          Wild & Fearless <br /> <span className="text-safari-gold">Adventures</span>
        </h1>
        <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Experience Tanzania with the tenacity of a honeybadger. Authentic safaris, Kilimanjaro treks, and Zanzibar escapes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(Page.TOURS)} variant="primary" className="!bg-safari-gold text-black hover:!bg-amber-600 border-none">
            View Packages
          </Button>
          <Button onClick={() => navigate(Page.BOOKING)} variant="white">
            Book Now
          </Button>
        </div>
      </div>
    </div>

    {/* Intro Grid */}
    <div className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Welcome to Tanzania Honeybadger Safaris" subtitle="Karibu Sana" />
          <p className="text-gray-600 mb-6 leading-relaxed">
            Named after the most fearless animal in the savannah, we embody resilience and passion. We don't just show you nature; we immerse you in it. From the endless plains of the Serengeti to the roof of Africa, our tailored experiences are designed for the bold traveler.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {['Locally Owned', 'Expert Guides', 'Sustainable', 'Custom Itineraries'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="text-safari-green w-5 h-5" />
                <span className="font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
          <Button onClick={() => navigate(Page.ABOUT)} variant="outline">Learn More About Us</Button>
        </div>
        <div className="relative">
          <img src="https://picsum.photos/id/1025/600/600" alt="Safari Vehicle" className="rounded-lg shadow-2xl z-10 relative" />
          <div className="absolute -bottom-6 -right-6 md:-right-12 w-64">
             <SafariPlanner />
          </div>
        </div>
      </div>
    </div>

    {/* Featured Tours Preview */}
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title="Popular Adventures" subtitle="Curated Experiences" />
        <div className="grid md:grid-cols-3 gap-8">
          {TOURS.slice(0, 3).map(tour => (
             <div key={tour.id} className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
               <div className="h-64 overflow-hidden relative">
                 <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute top-4 right-4 bg-safari-gold text-white font-bold px-3 py-1 rounded-full text-sm">
                   ${tour.price}
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {tour.days} Days</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Group/Private</span>
                 </div>
                 <h3 className="text-xl font-bold font-serif mb-3 text-gray-900">{tour.title}</h3>
                 <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                 <Button onClick={() => navigate(Page.TOURS)} variant="outline" className="w-full text-sm py-2">View Details</Button>
               </div>
             </div>
          ))}
        </div>
        <div className="text-center mt-12">
           <Button onClick={() => navigate(Page.TOURS)}>View All Packages</Button>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4">
    <SectionTitle title="About Us" subtitle="Who We Are" />
    <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
      <div className="relative">
        <img src="https://picsum.photos/id/103/800/600" alt="Our Team" className="rounded-xl shadow-lg sticky top-24" />
      </div>
      <div>
        <h3 className="text-2xl font-serif font-bold mb-6 text-safari-green">Welcome to Tanzania Honey Badger Safaris</h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          Your trusted partner in discovering the heart of Africa. Based in the land of the legendary Serengeti, Mount Kilimanjaro, and Zanzibar’s white sands, we specialize in crafting unforgettable safari and adventure experiences across Tanzania and East Africa.
        </p>

        <p className="text-gray-600 mb-4 leading-relaxed">
          At Honey Badger Safaris, we believe travel is more than just sightseeing — it’s about connection, discovery, and authentic experiences. Our name, inspired by the fearless and resilient honey badger, reflects our spirit: bold, adaptable, and determined to deliver exceptional adventures for every traveler.
        </p>

        <p className="text-gray-600 mb-4 leading-relaxed">
          With a passionate team of local experts and experienced guides, we offer tailor-made itineraries that bring you closer to nature, culture, and the wild beauty of Tanzania. Whether it’s a classic wildlife safari, a mountain trek, a cultural immersion, or a beach escape, we ensure every journey is safe, sustainable, and deeply memorable.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Join us and experience Tanzania with confidence, comfort, and curiosity — the Honey Badger way.
        </p>

        <div className="bg-safari-sand p-8 rounded-lg border-l-4 border-safari-green mt-8 shadow-sm">
           <p className="font-serif font-bold text-gray-900 text-xl mb-1">Tanzania Honey Badger Safaris</p>
           <p className="font-serif italic text-safari-gold font-medium">Fearless Adventures. Unforgettable Memories.</p>
        </div>
      </div>
    </div>
  </div>
);

const DestinationPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4">
    <SectionTitle title="Destinations" subtitle="Explore Tanzania" />
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Serengeti', img: 'https://picsum.photos/id/164/600/800', desc: 'Endless plains and the Great Migration.' },
        { title: 'Ngorongoro Crater', img: 'https://picsum.photos/id/1016/600/800', desc: 'The largest inactive volcanic caldera.' },
        { title: 'Kilimanjaro', img: 'https://picsum.photos/id/1036/600/800', desc: 'The roof of Africa.' },
        { title: 'Zanzibar', img: 'https://picsum.photos/id/1029/600/800', desc: 'Spice islands and pristine beaches.' }
      ].map((dest, idx) => (
        <div key={idx} className="relative h-96 group rounded-xl overflow-hidden cursor-pointer">
          <img src={dest.img} alt={dest.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold font-serif mb-1">{dest.title}</h3>
            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">{dest.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ToursPage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
  const downloadItinerary = (tour: TourPackage) => {
    const content = `
TANZANIA HONEYBADGER SAFARIS
ITINERARY: ${tour.title.toUpperCase()}
----------------------------------------
Duration: ${tour.days} Days
Price: $${tour.price} per person

OVERVIEW
${tour.description}

HIGHLIGHTS
${tour.highlights.map(h => `• ${h}`).join('\n')}

----------------------------------------
To book this safari, please visit our website or contact us directly.
Email: info@tanzaniahoneybadgersafaris.com
Website: www.Tanzaniahoneybadgersafaris.com
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${tour.title.replace(/\s+/g, '_')}_Itinerary.txt`;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="animate-fade-in py-12 container mx-auto px-4">
      <SectionTitle title="Tours & Packages" subtitle="Curated Itineraries" />
      <div className="space-y-8">
        {TOURS.map(tour => (
          <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
            <div className="md:w-1/3 relative h-64 md:h-auto">
               <img src={tour.image} alt={tour.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold font-serif text-gray-900">{tour.title}</h3>
                  <span className="bg-safari-green/10 text-safari-green font-bold px-4 py-2 rounded-lg text-lg">${tour.price}</span>
                </div>
                <p className="text-gray-600 mb-6">{tour.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tour.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full uppercase tracking-wide font-medium">{h}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                 <Button variant="primary" onClick={() => navigate(Page.BOOKING)}>Book This Tour</Button>
                 <Button variant="outline" onClick={() => downloadItinerary(tour)}>
                    <Download className="w-4 h-4" /> Download Itinerary
                 </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AffiliationPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4 text-center">
    <SectionTitle title="Our Affiliations" subtitle="Trusted Partners" />
    <p className="max-w-2xl mx-auto text-gray-600 mb-12">
      We are proud members of leading tourism associations, ensuring we meet the highest standards of safety, ethics, and service quality.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
          <div className="text-xl font-bold text-gray-400">PARTNER LOGO {i}</div>
        </div>
      ))}
    </div>
  </div>
);

const TravelInfoPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4 max-w-4xl">
    <SectionTitle title="Travel Information" subtitle="Know Before You Go" />
    <div className="space-y-6">
      {[
        { q: "What is the best time to visit?", a: "The best time for wildlife viewing is during the dry season (late June to October). For the migration, June and July are best in the Serengeti." },
        { q: "Do I need a visa?", a: "Most visitors need a visa. You can obtain a visa on arrival or apply for an e-visa in advance." },
        { q: "Is it safe?", a: "Yes, Tanzania is generally very safe for tourists, especially when on guided safaris. We take your safety as our top priority." },
        { q: "What should I pack?", a: "Neutral-colored clothing, comfortable hiking shoes, a hat, sunscreen, insect repellent, and a good camera!" }
      ].map((faq, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-bold text-lg mb-2 text-safari-green">{faq.q}</h4>
          <p className="text-gray-600">{faq.a}</p>
        </div>
      ))}
    </div>
  </div>
);

const TestimonialsPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4">
    <SectionTitle title="Guest Reviews" subtitle="What They Say" />
    <div className="grid md:grid-cols-3 gap-8">
      {TESTIMONIALS.map(t => (
        <div key={t.id} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-safari-gold">
          <div className="flex text-safari-gold mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-gray-600 italic mb-6">"{t.text}"</p>
          <div>
            <h4 className="font-bold font-serif text-gray-900">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.location}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4">
    <SectionTitle title="Contact Us" subtitle="Get In Touch" />
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-safari-green p-8 rounded-xl text-white">
        <h3 className="text-2xl font-serif font-bold mb-6">Contact Info</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 mt-1 text-safari-gold" />
            <div>
              <p className="font-bold">Head Office</p>
              <p className="opacity-90">Arusha, Tanzania</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 mt-1 text-safari-gold" />
            <div>
              <p className="font-bold">Email</p>
              <p className="opacity-90">info@tanzaniahoneybadgersafaris.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 mt-1 text-safari-gold" />
            <div>
              <p className="font-bold">Phone / WhatsApp</p>
              <p className="opacity-90">+255 123 456 789</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20">
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <Facebook className="w-6 h-6 cursor-pointer hover:text-safari-gold" />
            <Instagram className="w-6 h-6 cursor-pointer hover:text-safari-gold" />
            <Twitter className="w-6 h-6 cursor-pointer hover:text-safari-gold" />
          </div>
        </div>
      </div>
      <form className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6">Send a Message</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
          <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
          <textarea rows={4} placeholder="How can we help you?" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none"></textarea>
          <Button className="w-full">Send Message</Button>
        </div>
      </form>
    </div>
  </div>
);

const BookingPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4 max-w-4xl">
    <SectionTitle title="Booking & Enquiry" subtitle="Plan Your Safari" />
    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
      <div className="mb-8 p-4 bg-safari-sand rounded-lg border-l-4 border-safari-gold text-sm text-gray-700">
        <p><strong>Note:</strong> Fill out the form below to start planning your adventure. A 30% deposit is typically required to secure your final booking.</p>
      </div>
      
      <form className="space-y-8">
        
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
               <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" placeholder="John" />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
               <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" placeholder="Doe" />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
               <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" placeholder="john@example.com" />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
               <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" placeholder="+1 234 567 8900" />
             </div>
             <div className="md:col-span-2">
               <label className="block text-sm font-bold text-gray-700 mb-2">Country of Residence</label>
               <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none bg-white">
                 <option value="">Select your country...</option>
                 {COUNTRIES.map(country => (
                   <option key={country} value={country}>{country}</option>
                 ))}
               </select>
             </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
           <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Trip Preferences</h3>
           
           {/* Budget */}
           <div className="mb-6">
             <label className="block text-sm font-bold text-gray-700 mb-3">Budget Preference</label>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {["Don't know", "Midrange", "Luxury", "Top Luxury"].map((option) => (
                 <label key={option} className="cursor-pointer">
                   <input type="radio" name="budget" className="peer sr-only" value={option} />
                   <div className="text-center p-3 rounded-lg border border-gray-300 bg-gray-50 peer-checked:bg-safari-green peer-checked:text-white peer-checked:border-safari-green transition-all hover:border-safari-green">
                     {option}
                   </div>
                 </label>
               ))}
             </div>
           </div>

           {/* Travelers */}
           <div className="mb-6">
             <label className="block text-sm font-bold text-gray-700 mb-3">How Many Travelers?</label>
             <div className="grid grid-cols-3 gap-4">
               <div>
                 <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Adults</label>
                 <input type="number" min="1" defaultValue="2" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
               </div>
               <div>
                 <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">6-15 Years</label>
                 <input type="number" min="0" defaultValue="0" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
               </div>
               <div>
                 <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">0-5 Years</label>
                 <input type="number" min="0" defaultValue="0" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
               </div>
             </div>
           </div>

           {/* Dates */}
           <div className="grid md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Planned Arrival Date</label>
                 <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Duration of Stay (Days)</label>
                 <input type="number" min="1" placeholder="e.g. 7" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" />
              </div>
           </div>
        </div>

        {/* Message */}
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">Additional Message or Specific Interests</label>
           <textarea rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safari-green outline-none" placeholder="Tell us more about what you want to see... (e.g. Migration, Big 5, Cultural tours)"></textarea>
        </div>

        <div className="pt-4">
          <Button className="w-full text-lg">Send Enquiry</Button>
          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Your details are kept strictly confidential.
          </p>
        </div>
      </form>
    </div>
  </div>
);

const TermsPage: React.FC = () => (
  <div className="animate-fade-in py-12 container mx-auto px-4 max-w-4xl text-gray-600 leading-relaxed">
    <SectionTitle title="Terms & Privacy" subtitle="Legal" />
    <div className="space-y-8 bg-white p-8 rounded-xl shadow-sm">
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Policy</h3>
        <p>We respect your privacy. All personal information collected during the booking process is used solely for the purpose of arranging your trip and is not shared with third parties without your consent.</p>
      </section>
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Terms and Conditions</h3>
        <p className="mb-2"><strong>1. Booking:</strong> A deposit is required to confirm your reservation.</p>
        <p className="mb-2"><strong>2. Cancellation:</strong> Cancellations made 60 days prior receive a full refund minus administrative fees.</p>
        <p><strong>3. Liability:</strong> Tanzania Honeybadger Safaris is not liable for loss or damage to personal property or injury during activities.</p>
      </section>
    </div>
  </div>
);

// --- Layout & Main App ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [currentPage]);

  const navItems = [
    { label: 'Home', page: Page.HOME },
    { label: 'About Us', page: Page.ABOUT },
    { label: 'Destinations', page: Page.DESTINATIONS },
    { label: 'Tours', page: Page.TOURS },
    { label: 'Review', page: Page.TESTIMONIALS },
    { label: 'Contact', page: Page.CONTACT },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <HomePage navigate={setCurrentPage} />;
      case Page.ABOUT: return <AboutPage />;
      case Page.DESTINATIONS: return <DestinationPage />;
      case Page.TOURS: return <ToursPage navigate={setCurrentPage} />;
      case Page.AFFILIATION: return <AffiliationPage />;
      case Page.TRAVEL_INFO: return <TravelInfoPage />;
      case Page.TESTIMONIALS: return <TestimonialsPage />;
      case Page.CONTACT: return <ContactPage />;
      case Page.BOOKING: return <BookingPage />;
      case Page.TERMS: return <TermsPage />;
      default: return <HomePage navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo Area */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setCurrentPage(Page.HOME)}
          >
             <img 
               src="logo.png" 
               alt="Tanzania Honeybadger Safaris" 
               className="h-20 md:h-28 w-auto object-contain"
             />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 items-center">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => setCurrentPage(item.page)}
                className={`text-sm font-semibold hover:text-safari-green transition-colors uppercase tracking-wide ${currentPage === item.page ? 'text-safari-green border-b-2 border-safari-green' : 'text-gray-600'}`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => setCurrentPage(Page.BOOKING)} className="text-sm px-4 py-2">Book Now</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg p-4 flex flex-col gap-4 animate-slide-down">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => setCurrentPage(item.page)}
                className="text-left py-2 px-4 hover:bg-safari-sand rounded-lg font-medium"
              >
                {item.label}
              </button>
            ))}
            <hr className="my-2" />
            <button onClick={() => setCurrentPage(Page.AFFILIATION)} className="text-left py-2 px-4 hover:bg-safari-sand rounded-lg text-sm text-gray-600">Affiliations</button>
            <button onClick={() => setCurrentPage(Page.TRAVEL_INFO)} className="text-left py-2 px-4 hover:bg-safari-sand rounded-lg text-sm text-gray-600">Travel Info / FAQ</button>
            <button onClick={() => setCurrentPage(Page.TERMS)} className="text-left py-2 px-4 hover:bg-safari-sand rounded-lg text-sm text-gray-600">Terms & Privacy</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-safari-sand/30">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-safari-dark text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <h3 className="font-serif font-bold text-2xl text-safari-green mb-4">Honeybadger Safaris</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Authentic, safe, and unforgettable adventures in the heart of Tanzania. Locally owned and operated.
              </p>
              <div className="flex gap-4">
                 <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                 <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                 <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-safari-sand">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li onClick={() => setCurrentPage(Page.ABOUT)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> About Us</li>
                <li onClick={() => setCurrentPage(Page.TOURS)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Packages</li>
                <li onClick={() => setCurrentPage(Page.DESTINATIONS)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Destinations</li>
                <li onClick={() => setCurrentPage(Page.BOOKING)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Booking</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-safari-sand">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li onClick={() => setCurrentPage(Page.TRAVEL_INFO)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Travel FAQ</li>
                <li onClick={() => setCurrentPage(Page.AFFILIATION)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Partners</li>
                <li onClick={() => setCurrentPage(Page.TERMS)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Terms & Conditions</li>
                <li onClick={() => setCurrentPage(Page.TERMS)} className="hover:text-safari-gold cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-safari-sand">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                 <li className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-safari-green flex-shrink-0" />
                   <span>Arusha, Tanzania</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <Mail className="w-5 h-5 text-safari-green flex-shrink-0" />
                   <span>info@tanzaniahoneybadgersafaris.com</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <Phone className="w-5 h-5 text-safari-green flex-shrink-0" />
                   <span>+255 123 456 789</span>
                 </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tanzania Honeybadger Safaris. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;