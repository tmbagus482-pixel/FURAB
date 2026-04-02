import React, { useState } from 'react';
import { useFirebase } from '../components/FirebaseProvider';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { LogIn, LogOut, User as UserIcon, Shield, Calendar, Edit3, Save, X } from 'lucide-react';
import { format } from 'date-fns';

const MemberArea = () => {
  const { user, profile, loading, isAdmin } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(profile?.bio || '');

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        bio: newBio,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-dark-purple/20 border-t-dark-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] border border-dark-purple/5 shadow-2xl shadow-dark-purple/10"
        >
          <div className="w-20 h-20 bg-dark-purple/10 rounded-3xl flex items-center justify-center text-dark-purple mx-auto mb-8">
            <UserIcon className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Member Area</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Silakan login untuk mengakses fitur eksklusif member FURAB Bogor.
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-2xl bg-dark-purple text-white font-bold text-lg hover:bg-deep-purple transition-all shadow-lg shadow-dark-purple/20 flex items-center justify-center gap-3"
          >
            <LogIn className="w-6 h-6" />
            Login with Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-dark-purple/5 shadow-2xl shadow-dark-purple/10 overflow-hidden"
      >
        {/* Header */}
        <div className="h-48 bg-gradient-to-r from-dark-purple to-pink-500 relative">
          <div className="absolute -bottom-16 left-10">
            <div className="relative">
              <img
                src={profile?.photoURL || 'https://via.placeholder.com/150'}
                alt={profile?.displayName}
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
                referrerPolicy="no-referrer"
              />
              {isAdmin && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-xl shadow-lg border-2 border-white">
                  <Shield className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-10 px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">{profile?.displayName}</h1>
              <p className="text-gray-500 font-medium">{profile?.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? 'Batal' : 'Edit Bio'}
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-dark-purple/5 border border-dark-purple/10">
                <h3 className="text-sm font-bold text-dark-purple uppercase tracking-widest mb-4 flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Bio Member
                </h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <textarea
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-white border border-dark-purple/20 focus:border-dark-purple outline-none transition-all resize-none"
                      rows={4}
                      placeholder="Ceritakan sedikit tentang kamu..."
                    />
                    <button
                      onClick={handleUpdateProfile}
                      className="w-full py-3 rounded-xl bg-dark-purple text-white font-bold hover:bg-deep-purple transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed italic">
                    {profile?.bio || 'Belum ada bio. Klik edit untuk menambahkan.'}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Status Keanggotaan
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Role</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${isAdmin ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                      {profile?.role}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Bergabung Sejak</span>
                    <span className="text-gray-900 font-bold">
                      {profile?.joinedAt ? format(new Date(profile.joinedAt), 'dd MMM yyyy') : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">ID Member</span>
                    <span className="text-gray-900 font-mono text-xs">
                      {profile?.uid.substring(0, 8).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberArea;
