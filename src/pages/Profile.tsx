import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRound, Package, Heart, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Bengaluru, Karnataka',
    category: 'Home & Lifestyle',
  });

  const stats = [
    { label: 'Orders', value: '12', icon: Package },
    { label: 'Wishlist', value: '08', icon: Heart },
    { label: 'Saved Address', value: '02', icon: MapPin },
  ];

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-16">
      <div className="section-container py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-1">
            My Profile
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Manage your account and shopping preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_2fr] gap-6 lg:gap-8">
          <aside className="card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300">
                <UserRound className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
                  {profile.name}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Member since 2024</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-600" />
                {profile.email}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-600" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-600" />
                {profile.city}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">{label}</span>
                    <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-display font-bold text-3xl text-neutral-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-white">
                  Account Overview
                </h3>
                {!isEditing ? (
                  <button className="btn-secondary text-sm" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn-secondary text-sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="grid md:grid-cols-2 gap-5 text-sm">
                  <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 p-4">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-1">Full Name</p>
                    <p className="font-medium text-neutral-900 dark:text-white">{profile.name}</p>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 p-4">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-1">Phone</p>
                    <p className="font-medium text-neutral-900 dark:text-white">{profile.phone}</p>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 p-4">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-1">Email</p>
                    <p className="font-medium text-neutral-900 dark:text-white">{profile.email}</p>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 p-4">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-1">Preferred Category</p>
                    <p className="font-medium text-neutral-900 dark:text-white">{profile.category}</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-5 text-sm">
                  <label className="space-y-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Full Name</span>
                    <input
                      className="input-field"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Phone</span>
                    <input
                      className="input-field"
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Email</span>
                    <input
                      className="input-field"
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-neutral-500 dark:text-neutral-400">City</span>
                    <input
                      className="input-field"
                      value={profile.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Preferred Category</span>
                    <input
                      className="input-field"
                      value={profile.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="card p-6">
              <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop" className="btn-primary">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/wishlist" className="btn-secondary">
                  View Wishlist
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
