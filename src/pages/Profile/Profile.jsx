import React, { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Container from '../../components/container/Container';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { CartContext } from '../../context/CartProvider';
import { db } from '../../utils/firebase.config';

export default function Profile() {
  const { user, logOut } = useContext(AuthContext);
  const { cart, removeFromCart } = useContext(CartContext);
  
  const [userCommissions, setUserCommissions] = useState([]);
  const [userInquiries, setUserInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        // 1. Fetch user commissions
        const commQuery = query(collection(db, 'commissions'), where('userId', '==', user.uid));
        const commSnapshot = await getDocs(commQuery);
        const commissions = commSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 2. Fetch user inquiries
        const inqQuery = query(collection(db, 'inquiries'), where('userId', '==', user.uid));
        const inqSnapshot = await getDocs(inqQuery);
        const inquiries = inqSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setUserCommissions(commissions);
        setUserInquiries(inquiries);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-base-white text-text-main font-sans pb-32 pt-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          
          {/* User Bio Header */}
          <div className="bg-sand/10 p-8 md:p-12 rounded-sm border border-sand shadow-sm flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-24 h-24 rounded-full bg-sand/30 overflow-hidden border border-sand shrink-0">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-2xl text-olive">
                  {user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-olive mb-1 block">Collector Portal</span>
              <h1 className="text-2xl md:text-3xl font-serif text-text-main mb-2">{user?.displayName || 'Art Collector'}</h1>
              <p className="text-sm text-dove">{user?.email}</p>
            </div>

            <button 
              onClick={logOut}
              className="px-6 py-2.5 border border-text-main text-text-main text-xs font-bold uppercase tracking-widest hover:bg-text-main hover:text-base-white transition-colors rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {/* Section 1: Saved Inquiry Vault (Local Cart) */}
          <div className="bg-sand/10 p-8 md:p-12 rounded-sm border border-sand shadow-sm mb-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-olive mb-1 block">Selected Artworks</span>
                <h2 className="text-2xl font-serif text-text-main">Your Saved Inquiry Vault</h2>
              </div>
              <span className="text-sm text-dove">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
            </div>

            {cart.length === 0 ? (
              <p className="text-sm text-dove font-serif italic">No artworks currently saved in your vault.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id || item.id} className="bg-base-white p-4 rounded-sm border border-sand flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-sand/20 overflow-hidden border border-sand shrink-0">
                        <img src={item.image || item.src} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base text-text-main">{item.title}</h3>
                        <p className="text-xs text-olive uppercase tracking-widest">{item.price || "Custom Commission"}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="text-xs text-dove hover:text-text-main uppercase tracking-widest underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Submitted Commissions */}
          <div className="bg-sand/10 p-8 md:p-12 rounded-sm border border-sand shadow-sm mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-olive mb-1 block">Commissions</span>
            <h2 className="text-2xl font-serif text-text-main mb-6">Your Commission Requests</h2>

            {loading ? (
              <p className="text-sm text-dove font-serif italic">Loading commissions...</p>
            ) : userCommissions.length === 0 ? (
              <p className="text-sm text-dove font-serif italic">You haven't submitted any commission requests yet.</p>
            ) : (
              <div className="space-y-6">
                {userCommissions.map((comm) => (
                  <div key={comm.id} className="p-6 bg-base-white border border-sand rounded-sm shadow-xs flex flex-col md:flex-row gap-6 items-start">
                    {comm.referenceImage && (
                      <div className="w-24 h-24 bg-sand/20 border border-sand shrink-0 overflow-hidden">
                        <img src={comm.referenceImage} alt="Reference" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-serif text-lg text-text-main">{comm.subject}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-olive/10 text-olive rounded-full">
                          {comm.status || 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-olive uppercase tracking-widest mb-2">Medium: {comm.medium} | Size: {comm.size} | Location: {comm.location}</p>
                      <p className="text-sm text-dove mb-3">{comm.vision}</p>
                      <p className="text-[10px] text-sand uppercase tracking-widest">
                        Submitted: {comm.createdAt?.toDate ? comm.createdAt.toDate().toLocaleDateString() : 'Recent'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: General Inquiries */}
          <div className="bg-sand/10 p-8 md:p-12 rounded-sm border border-sand shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-olive mb-1 block">Messages</span>
            <h2 className="text-2xl font-serif text-text-main mb-6">Your General Inquiries</h2>

            {loading ? (
              <p className="text-sm text-dove font-serif italic">Loading inquiries...</p>
            ) : userInquiries.length === 0 ? (
              <p className="text-sm text-dove font-serif italic">You haven't sent any general contact messages yet.</p>
            ) : (
              <div className="space-y-6">
                {userInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6 bg-base-white border border-sand rounded-sm shadow-xs">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-serif text-lg text-text-main">{inquiry.subject}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-olive/10 text-olive rounded-full">
                        {inquiry.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-dove mb-4">{inquiry.message}</p>
                    <p className="text-[10px] text-sand uppercase tracking-widest">
                      Submitted on: {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}