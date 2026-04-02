import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { NewsArticle } from '../types';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { useFirebase } from '../components/FirebaseProvider';

const News = () => {
  const { user, loading: authLoading } = useFirebase();
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (!user) return;

    const path = 'news';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
      setArticles(newsList);
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
          Silakan login terlebih dahulu untuk membaca berita terbaru FURAB Bogor.
        </p>
      </div>
    );
  }

  // Mock data if empty
  const displayArticles = articles.length > 0 ? articles : [
    {
      id: '1',
      title: 'Update Terbaru Fuji & Arab di Jakarta',
      content: 'Simak keseruan momen terbaru Fuji dan Arab saat menghadiri acara bergengsi di Jakarta kemarin malam...',
      authorId: 'admin',
      imageUrl: 'https://picsum.photos/seed/news1/800/400',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'FURAB Bogor Berbagi di Bulan Ramadhan',
      content: 'Alhamdulillah, kegiatan charity rutin FURAB Bogor berjalan lancar dengan membagikan paket sembako...',
      authorId: 'admin',
      imageUrl: 'https://picsum.photos/seed/news2/800/400',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Tips Menjadi Member Aktif FURAB',
      content: 'Ingin lebih dekat dengan member lain? Berikut tips jitu agar kamu bisa lebih aktif di komunitas...',
      authorId: 'admin',
      imageUrl: 'https://picsum.photos/seed/news3/800/400',
      createdAt: new Date().toISOString(),
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Berita & <span className="text-dark-purple">Update</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Informasi terbaru seputar idola dan kegiatan komunitas FURAB Bogor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {displayArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col md:flex-row gap-8 bg-white rounded-3xl overflow-hidden border border-dark-purple/5 hover:border-dark-purple/20 transition-all hover:shadow-xl p-6"
          >
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden rounded-2xl">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-bold text-dark-purple uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(article.createdAt), 'dd MMM yyyy')}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Admin
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-dark-purple transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                {article.content}
              </p>
              <button className="flex items-center gap-2 text-dark-purple font-bold hover:gap-3 transition-all">
                Baca Selengkapnya <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default News;
