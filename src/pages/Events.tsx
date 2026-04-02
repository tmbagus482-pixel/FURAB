import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Event } from '../types';
import { motion } from 'motion/react';
import { Calendar, MapPin, Tag, Clock, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { useFirebase } from '../components/FirebaseProvider';

const Events = () => {
  const { user, loading: authLoading } = useFirebase();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      if (!authLoading) setLoading(false);
      return;
    }

    const path = 'events';
    const q = query(collection(db, path), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [user, authLoading]);

  if (!user && !authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-dark-purple/10 rounded-3xl flex items-center justify-center text-dark-purple mx-auto mb-8">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Akses Terbatas</h1>
        <p className="text-gray-600 mb-10 text-lg">
          Silakan login terlebih dahulu untuk melihat agenda kegiatan FURAB Bogor.
        </p>
      </div>
    );
  }

  // Mock data if empty
  const displayEvents = events.length > 0 ? events : [
    {
      id: '1',
      title: 'Kopdar Akbar FURAB Bogor',
      description: 'Kumpul bareng seluruh member FURAB Bogor untuk silaturahmi dan bahas agenda tahunan.',
      date: new Date().toISOString(),
      location: 'Kebun Raya Bogor',
      type: 'kopdar' as const,
      imageUrl: 'https://picsum.photos/seed/event1/800/400',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Nobar Film Terbaru Fuji',
      description: 'Dukung karya idola dengan nonton bareng member FURAB di bioskop kesayangan.',
      date: new Date().toISOString(),
      location: 'Botani Square XXI',
      type: 'nobar' as const,
      imageUrl: 'https://picsum.photos/seed/event2/800/400',
      createdAt: new Date().toISOString(),
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Agenda & <span className="text-dark-purple">Kegiatan</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Jangan lewatkan momen seru bareng keluarga FURAB Bogor. Cek jadwal kegiatan kami di sini!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden border border-dark-purple/5 hover:border-dark-purple/20 transition-all hover:shadow-2xl hover:shadow-dark-purple/10"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-dark-purple text-xs font-bold uppercase tracking-wider shadow-sm">
                  {event.type}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-dark-purple transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
              
              <div className="space-y-3 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-dark-purple" />
                  {format(new Date(event.date), 'dd MMMM yyyy')}
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <Clock className="w-4 h-4 text-dark-purple" />
                  {format(new Date(event.date), 'HH:mm')} WIB
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-dark-purple" />
                  {event.location}
                </div>
              </div>

              <button className="w-full mt-8 py-3 rounded-2xl bg-dark-purple/5 text-dark-purple font-bold hover:bg-dark-purple hover:text-white transition-all">
                Detail Kegiatan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
