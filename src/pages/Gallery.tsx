import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Image as ImageIcon, Lock } from 'lucide-react';
import { useFirebase } from '../components/FirebaseProvider';

const Gallery = () => {
  const { user, loading: authLoading } = useFirebase();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!user) return;

    const path = 'gallery';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const galleryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      setItems(galleryList);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user && !authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-dark-purple/10 rounded-3xl flex items-center justify-center text-dark-purple mx-auto mb-8">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Akses Terbatas</h1>
        <p className="text-gray-600 mb-10 text-lg">
          Silakan login terlebih dahulu untuk melihat galeri momen FURAB Bogor.
        </p>
      </div>
    );
  }

  // Mock data if empty
  const displayItems = items.length > 0 ? items : [
    { id: '1', title: 'Fujianti Utami Putri', imageUrl: 'https://picsum.photos/seed/fuji-1/600/800', type: 'photo' as const, uploadedBy: 'admin', createdAt: new Date().toISOString() },
    { id: '2', title: 'Reza Arap', imageUrl: 'https://picsum.photos/seed/arap-1/600/800', type: 'photo' as const, uploadedBy: 'admin', createdAt: new Date().toISOString() },
    { id: '3', title: 'Momen Kebersamaan Fuji & Arap', imageUrl: 'https://picsum.photos/seed/couple-1/800/600', type: 'photo' as const, uploadedBy: 'admin', createdAt: new Date().toISOString() },
    { id: '4', title: 'Kopdar Kebun Raya', imageUrl: 'https://picsum.photos/seed/gal1/600/600', type: 'photo' as const, uploadedBy: 'admin', createdAt: new Date().toISOString() },
    { id: '5', title: 'Nobar Seru', imageUrl: 'https://picsum.photos/seed/gal2/600/800', type: 'photo' as const, uploadedBy: 'admin', createdAt: new Date().toISOString() },
    { id: '6', title: 'Charity Ramadhan', imageUrl: 'https://picsum.photos/seed/gal3/800/600', type: 'photo' as const, uploadedBy: 'admin', createdAt: new Date().toISOString() },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Galeri <span className="text-dark-purple">Momen</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Kumpulan foto dan video kegiatan seru komunitas FURAB Bogor, serta momen idola kesayangan kita.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedItem(item)}
            className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.type === 'video' ? 'Video' : 'Photo'}</p>
            </div>
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h2>
                <p className="text-white/60">Uploaded by {selectedItem.uploadedBy}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
