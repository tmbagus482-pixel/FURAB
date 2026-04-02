import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Calendar, Image as ImageIcon, ArrowRight, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: 'Solid Community',
      description: 'Wadah berkumpulnya fans Fuji & Arab di Bogor yang penuh kebersamaan.',
      icon: Users,
      color: 'bg-dark-purple/10 text-dark-purple',
    },
    {
      title: 'Active Events',
      description: 'Kopdar, nobar, hingga kegiatan charity rutin kami lakukan.',
      icon: Calendar,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      title: 'Exclusive Gallery',
      description: 'Dokumentasi lengkap setiap momen kebersamaan komunitas.',
      icon: ImageIcon,
      color: 'bg-deep-purple/10 text-deep-purple',
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/furab-hero/1920/1080?blur=4"
            alt="FURAB Hero"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-dark-purple/10 text-dark-purple text-sm font-semibold tracking-wider uppercase">
              Official Fanbase Bogor
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              FURAB <span className="text-dark-purple">Kota Bogor</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed font-medium">
              Fuji Arab Couple Fans Bogor: Wadah komunitas yang solid, aktif, dan penuh kebersamaan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/member"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-dark-purple text-white font-bold text-lg hover:bg-deep-purple transition-all shadow-lg shadow-dark-purple/20 flex items-center justify-center gap-2"
              >
                Join Komunitas <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gray-700 font-bold text-lg border-2 border-dark-purple/10 hover:border-dark-purple/20 transition-all flex items-center justify-center gap-2"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kenapa Gabung FURAB?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami bukan sekadar fanbase, tapi keluarga kedua bagi para pecinta Fuji & Arab di Kota Hujan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-white border border-dark-purple/5 hover:border-dark-purple/20 transition-all hover:shadow-xl hover:shadow-dark-purple/10 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Slogan Banner */}
      <section className="bg-dark-purple py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-9xl font-black text-white mx-10">FURAB BOGOR</span>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Heart className="w-16 h-16 text-white/50 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 italic tracking-tighter">
            "SOLID, LOYAL, & PENUH SEMANGAT"
          </h2>
          <p className="text-dark-purple-100 text-xl font-medium">
            Bersama FURAB, kita jalin silaturahmi dan dukung idola dengan cara yang positif.
          </p>
        </div>
      </section>

      {/* Social Links */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Follow Our Journey</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-100 hover:border-dark-purple hover:text-dark-purple transition-all shadow-sm">
            <Instagram className="w-5 h-5" />
            <span className="font-semibold">Instagram</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-100 hover:border-dark-purple hover:text-dark-purple transition-all shadow-sm">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">WhatsApp</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-100 hover:border-dark-purple hover:text-dark-purple transition-all shadow-sm">
            <Twitter className="w-5 h-5" />
            <span className="font-semibold">Twitter</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
