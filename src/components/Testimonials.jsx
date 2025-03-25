import React from "react";

const testimonials = [
//   {
//     name: "Rajesh Kumar",
//     role: "Punjab Farmer",
//     message:
//       "Ezykheti's app made it easy to rent the machinery I needed. My harvest improved significantly!",
//     img: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     name: "Suman Kaur",
//     role: "Smallholder Farmer",
//     message:
//       "Thanks to Ezykheti, I can access modern tools without the financial strain. Highly recommend!",
//     img: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     name: "Amar Singh",
//     role: "Agricultural Innovator",
//     message:
//       "The technology provided by Ezykheti has revolutionized my farming practices. I'm seeing great results!",
//     img: "https://randomuser.me/api/portraits/men/45.jpg",
//   },
//   {
//     name: "Gurpreet Kaur",
//     role: "Organic Farmer",
//     message:
//       "I love how easy it is to book equipment through the app. It has saved me time and effort!",
//     img: "https://randomuser.me/api/portraits/women/65.jpg",
//   },
//   {
//     name: "Harpreet Singh",
//     role: "Traditional Farmer",
//     message:
//       "Ezykheti's services have helped me increase my productivity. I can now focus on quality.",
//     img: "https://randomuser.me/api/portraits/men/68.jpg",
//   },
//   {
//     name: "Nirmal Kaur",
//     role: "Community Leader",
//     message:
//       "The support from Ezykheti has been invaluable. Our community is thriving with their help!",
//     img: "https://randomuser.me/api/portraits/women/66.jpg",
//   },
{
    name: "Rajesh Kumar",
    role: "Punjab Farmer",
    message:
      "I can’t wait to use Ezykheti's platform to rent advanced farming equipment. This could be a game-changer for my next harvest!",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Suman Kaur",
    role: "Smallholder Farmer",
    message:
      "I’m really looking forward to affordable, on-demand machinery with Ezykheti — finally a solution within reach for small farmers like me!",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Amar Singh",
    role: "Agricultural Innovator",
    message:
      "I’m eager to explore Ezykheti’s services. Modern tech and convenience for farmers — just what we need to move ahead!",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    name: "Gurpreet Kaur",
    role: "Organic Farmer",
    message:
      "The idea of booking equipment with just a few clicks through Ezykheti sounds amazing. Can’t wait to try it this season!",
    img: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    name: "Harpreet Singh",
    role: "Traditional Farmer",
    message:
      "Excited to see Ezykheti launching soon. Access to equipment on demand could really boost my farm’s efficiency.",
    img: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    name: "Nirmal Kaur",
    role: "Community Leader",
    message:
      "Our community is waiting eagerly for Ezykheti’s services — this could help countless farmers access tools that were once out of reach!",
    img: "https://randomuser.me/api/portraits/women/76.jpg",
  },
  
];

const Testimonials = () => {
  return (
    <section data-aos="fade-up" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Farmers' Voices</h2>
        <p className="text-gray-600 mb-12">
          Discover how our technology is transforming lives and boosting yields.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* <div className="flex">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>⭐</span>
                  ))}
                </div> */}
                <p className="mb-6 text-sm leading-relaxed">{t.message}</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-300">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
