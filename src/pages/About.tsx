import React from 'react';
import { motion } from 'motion/react';
import { History, Target, Eye, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col gap-24">
      {/* Intro */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-dark-purple font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            Sejarah FURAB <br />
            <span className="text-dark-purple">Kota Bogor</span>
          </h1>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              FURAB (Fuji Arab Couple Fans Bogor) lahir dari inisiatif para penggemar setia pasangan Fujianti Utami Putri dan Thariq Halilintar yang berdomisili di wilayah Bogor dan sekitarnya.
            </p>
            <p>
              Berawal dari obrolan santai di media sosial, komunitas ini berkembang menjadi wadah yang terorganisir untuk menyatukan visi dalam mendukung idola secara positif dan kreatif.
            </p>
            <p>
              Sejak berdiri, FURAB Bogor telah aktif dalam berbagai kegiatan sosial, nobar, dan kopdar rutin yang mempererat tali persaudaraan antar member.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-dark-purple/10">
            <img
              src="https://picsum.photos/seed/furab-about/800/800"
              alt="FURAB Community"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-dark-purple/5 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-purple rounded-full flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-500 font-medium">Active Members</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl bg-dark-purple/5 border border-dark-purple/10"
        >
          <div className="w-14 h-14 bg-dark-purple rounded-2xl flex items-center justify-center text-white mb-8">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi Kami</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Menjadi komunitas fanbase yang paling solid, kreatif, dan memberikan dampak positif bagi idola maupun masyarakat luas, khususnya di Kota Bogor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-10 rounded-3xl bg-gray-900 text-white"
        >
          <div className="w-14 h-14 bg-dark-purple rounded-2xl flex items-center justify-center text-white mb-8">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Misi Kami</h2>
          <ul className="space-y-4 text-gray-300 text-lg">
            <li className="flex gap-3">
              <span className="text-dark-purple font-bold">01.</span>
              Membangun silaturahmi yang kuat antar penggemar Fuji & Arab di Bogor.
            </li>
            <li className="flex gap-3">
              <span className="text-dark-purple font-bold">02.</span>
              Menyelenggarakan kegiatan yang bermanfaat seperti charity dan aksi sosial.
            </li>
            <li className="flex gap-3">
              <span className="text-dark-purple font-bold">03.</span>
              Mendukung karir dan karya idola dengan cara yang sopan dan beretika.
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
