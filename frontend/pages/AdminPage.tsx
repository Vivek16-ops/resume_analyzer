import { useEffect, useState } from "react"
import { useUser } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { NavButton } from "../components/adminPage/NavButton";
import { DashboardTab } from "../components/adminPage/DashBoardOverview";
import { BlogsTab } from "../components/adminPage/BlogTab";
import { PaymentsTab } from "../components/adminPage/PaymentTab";
import { AdminsTab } from "../components/adminPage/AdminTab";
import { SettingsTab } from "../components/adminPage/SettingTab";


const AdminPage = () => {
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    let email: string | any = "";


    const validateAdmin = async () => {
        const response = await fetch('http://localhost:8000/api/validateAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const res = await response.json();

        if (res.success) {
            toast.success(res.message)
        }
        else {
            toast.error(res.message);
            navigate('/');
        }
    }

    useEffect(() => {

        document.title = "Admin Panel - Resume Analyzer";

        if (isSignedIn) {
            email = user?.primaryEmailAddress?.emailAddress;

            validateAdmin();
        }
    }, [isSignedIn]);

    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "blogs":
                return <BlogsTab />;
            case "payments":
                return <PaymentsTab />;
            case "admins":
                return <AdminsTab />;
            case "settings":
                return <SettingsTab />;
            default:
                return <DashboardTab />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#7a33cc] via-[#ff00cc] to-[#333399] text-white flex flex-col md:flex-row overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 p-6 backdrop-blur-xl bg-white/10 border-r border-white/20">
                <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
                    Admin Panel
                </h2>

                <nav className="flex flex-col gap-3">
                    <NavButton
                        label="Dashboard"
                        icon="📊"
                        active={activeTab === "dashboard"}
                        onClick={() => setActiveTab("dashboard")}
                    />
                    <NavButton
                        label="Blogs"
                        icon="📝"
                        active={activeTab === "blogs"}
                        onClick={() => setActiveTab("blogs")}
                    />
                    <NavButton
                        label="Payments"
                        icon="💳"
                        active={activeTab === "payments"}
                        onClick={() => setActiveTab("payments")}
                    />
                    <NavButton
                        label="Admins"
                        icon="👥"
                        active={activeTab === "admins"}
                        onClick={() => setActiveTab("admins")}
                    />
                    <NavButton
                        label="Settings"
                        icon="⚙️"
                        active={activeTab === "settings"}
                        onClick={() => setActiveTab("settings")}
                    />
                </nav>

                <div className="mt-auto">
                    <button className="flex items-center gap-3 mt-8 w-full px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto mb-16 md:mb-0">
                {renderContent()}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 w-full flex justify-around backdrop-blur-xl bg-white/10 border-t border-white/20 py-3 z-50">
                {[
                    { label: "Dashboard", icon: "📊", tab: "dashboard" },
                    { label: "Blogs", icon: "📝", tab: "blogs" },
                    { label: "Payments", icon: "💳", tab: "payments" },
                    { label: "Admins", icon: "👥", tab: "admins" },
                    { label: "Settings", icon: "⚙️", tab: "settings" },
                ].map((item) => (
                    <button
                        key={item.tab}
                        className={`flex flex-col items-center text-xs ${activeTab === item.tab ? "text-pink-300" : "text-white/70"
                            }`}
                        onClick={() => setActiveTab(item.tab)}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminPage