import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(5, 'Subjek minimal 5 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    console.log('Form submitted:', data);
    alert('Pesan kamu telah terkirim! Admin akan segera menghubungi kamu.');
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Hubungi Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi admin FURAB Bogor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-dark-purple/10 rounded-2xl flex items-center justify-center text-dark-purple flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Official</h3>
                <p className="text-gray-600">furabbogor@gmail.com</p>
                <p className="text-gray-500 text-sm">Kami balas dalam 24 jam</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 flex-shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Admin</h3>
                <p className="text-gray-600">+62 812-3456-7890</p>
                <p className="text-gray-500 text-sm">Tersedia Senin - Jumat (09:00 - 17:00)</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-deep-purple/10 rounded-2xl flex items-center justify-center text-deep-purple flex-shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basecamp Bogor</h3>
                <p className="text-gray-600">Jl. Pajajaran No. 123, Kota Bogor, Jawa Barat</p>
                <p className="text-gray-500 text-sm">Kunjungi kami saat kopdar rutin</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Social Media</h3>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-dark-purple transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-dark-purple transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-dark-purple transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl border border-dark-purple/5 shadow-xl shadow-dark-purple/10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                <input
                  {...register('name')}
                  className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-dark-purple focus:ring-2 focus:ring-dark-purple/20 outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email</label>
                <input
                  {...register('email')}
                  className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-dark-purple focus:ring-2 focus:ring-dark-purple/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subjek</label>
              <input
                {...register('subject')}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-dark-purple focus:ring-2 focus:ring-dark-purple/20 outline-none transition-all"
                placeholder="Ingin Gabung / Kolaborasi"
              />
              {errors.subject && <p className="text-red-500 text-xs font-medium">{errors.subject.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Pesan</label>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-dark-purple focus:ring-2 focus:ring-dark-purple/20 outline-none transition-all resize-none"
                placeholder="Tuliskan pesan kamu di sini..."
              />
              {errors.message && <p className="text-red-500 text-xs font-medium">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-dark-purple text-white font-bold text-lg hover:bg-deep-purple transition-all shadow-lg shadow-dark-purple/20 flex items-center justify-center gap-2"
            >
              Kirim Pesan <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
