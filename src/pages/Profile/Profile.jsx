import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider"; // ⚠️ Adjust path if needed

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center py-20 font-sans text-dove">
        Please log in to view your profile.
      </div>
    );
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "User")}&background=random`;
  const profileImage = user?.photoURL || defaultAvatar;

  return (
    <div className="min-h-screen bg-base-white py-20 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-10 border border-sand shadow-sm rounded-sm">
        
        <div className="flex flex-col items-center mb-8">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-2 border-sand mb-4 object-cover"
            onError={(e) => { e.target.src = defaultAvatar; }}
          />
          <h1 className="text-3xl font-serif text-text-main">
            {user?.displayName || "Art Enthusiast"}
          </h1>
          <p className="text-dove mt-1">{user?.email}</p>
        </div>

        <div className="border-t border-sand pt-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-text-main mb-4">
            My Requests & Commissions
          </h2>
          <div className="bg-sand/20 p-6 rounded-sm text-center text-dove text-sm">
            You don't have any active commission requests yet.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;