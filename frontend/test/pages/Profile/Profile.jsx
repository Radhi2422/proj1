import { useState } from "react";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiCreditCard,
  FiBell,
  FiLogOut,
  FiEdit2,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "Radhika Mittal",
    email: "radhika@example.com",
    phone: "+91 98765 43210",
    memberSince: "August 2025",
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <FiUser />,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: <FiPackage />,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <FiHeart />,
    },
    {
      id: "addresses",
      label: "My Addresses",
      icon: <FiMapPin />,
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: <FiCreditCard />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FiBell />,
    },
  ];

  return (
    <div className="profile-page">

      {/* Sidebar */}
      <aside className="profile-sidebar">

        <div className="profile-sidebar-user">
          <div className="sidebar-avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <h3>Hello, {user.name.split(" ")[0]}</h3>
            <p>View your profile</p>
          </div>
        </div>

        <div className="profile-menu">

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`profile-menu-item ${
                activeTab === item.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}

          <div className="menu-divider"></div>

          <button className="profile-menu-item logout">
            <span className="menu-icon">
              <FiLogOut />
            </span>

            <span>Logout</span>
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="profile-content">

        {activeTab === "profile" && (
          <>
            {/* Profile Header */}
            <section className="profile-header-card">

              <div className="profile-avatar">
                {user.name.charAt(0)}
              </div>

              <div className="profile-header-info">
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <span>
                  Member since {user.memberSince}
                </span>
              </div>

              <button className="edit-profile-btn">
                <FiEdit2 />
                Edit Profile
              </button>

            </section>

            {/* Personal Information */}
            <section className="profile-card">

              <div className="card-header">
                <div>
                  <h2>Personal Information</h2>
                  <p>
                    Manage your personal details
                  </p>
                </div>

                <button className="text-edit-btn">
                  <FiEdit2 />
                  Edit
                </button>
              </div>

              <div className="profile-info-grid">

                <div className="info-item">
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>

                <div className="info-item">
                  <label>Email Address</label>

                  <div className="info-with-icon">
                    <FiMail />
                    <p>{user.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <label>Phone Number</label>

                  <div className="info-with-icon">
                    <FiPhone />
                    <p>{user.phone}</p>
                  </div>
                </div>

                <div className="info-item">
                  <label>Gender</label>
                  <p>Not specified</p>
                </div>

              </div>

            </section>

            {/* Address */}
            <section className="profile-card">

              <div className="card-header">
                <div>
                  <h2>Saved Addresses</h2>
                  <p>
                    Manage your delivery addresses
                  </p>
                </div>

                <button className="add-address-btn">
                  + Add New Address
                </button>
              </div>

              <div className="address-card">

                <div className="address-top">

                  <div className="address-label">
                    <FiMapPin />
                    <strong>Home</strong>
                  </div>

                  <button className="address-edit">
                    <FiEdit2 />
                  </button>

                </div>

                <h3>{user.name}</h3>

                <p>
                  123 Main Street, Gomti Nagar
                  <br />
                  Lucknow, Uttar Pradesh - 226010
                  <br />
                  India
                </p>

                <div className="address-phone">
                  Phone: {user.phone}
                </div>

              </div>

            </section>

            {/* Account Settings */}
            <section className="profile-card">

              <div className="card-header">
                <div>
                  <h2>Account Settings</h2>
                  <p>
                    Manage your account and security
                  </p>
                </div>
              </div>

              <div className="settings-list">

                <button className="setting-item">
                  <div>
                    <strong>Change Password</strong>
                    <span>
                      Update your account password
                    </span>
                  </div>

                  <span>›</span>
                </button>

                <button className="setting-item">
                  <div>
                    <strong>Two-Factor Authentication</strong>
                    <span>
                      Add an extra layer of security
                    </span>
                  </div>

                  <span>›</span>
                </button>

                <button className="setting-item">
                  <div>
                    <strong>Privacy Settings</strong>
                    <span>
                      Manage your privacy preferences
                    </span>
                  </div>

                  <span>›</span>
                </button>

              </div>

            </section>
          </>
        )}

        {activeTab === "orders" && (
          <div className="empty-section">
            <FiPackage />
            <h2>My Orders</h2>
            <p>Your orders will appear here.</p>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="empty-section">
            <FiHeart />
            <h2>Wishlist</h2>
            <p>Your saved products will appear here.</p>
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="empty-section">
            <FiMapPin />
            <h2>My Addresses</h2>
            <p>Manage your saved addresses.</p>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="empty-section">
            <FiCreditCard />
            <h2>Payment Methods</h2>
            <p>Manage your saved payment methods.</p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="empty-section">
            <FiBell />
            <h2>Notifications</h2>
            <p>Manage your notification preferences.</p>
          </div>
        )}

      </main>

    </div>
  );
};

export default Profile;