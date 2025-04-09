import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, History, BarChart2, Coffee } from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
} from "@/components/ui/sheet";

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleMobileNavClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen flex flex-col bg-malta-950 text-malta-100">
            {/* Header */}
            <header className="w-full bg-malta-900 px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-lg font-semibold">Espresso Tracker</h1>
                <div className="flex gap-2 items-center">
                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <Menu className="h-6 w-6" />
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-malta-900 text-malta-100 w-64 p-4">
                                <nav className="flex flex-col gap-6 mt-4">
                                    <SheetClose asChild>
                                        <button
                                            onClick={() => handleMobileNavClick("/history")}
                                            className="flex items-center gap-3 text-sm font-medium hover:text-malta-300"
                                        >
                                            <History className="h-5 w-5" /> History
                                        </button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button
                                            onClick={() => handleMobileNavClick("/charts")}
                                            className="flex items-center gap-3 text-sm font-medium hover:text-malta-300"
                                        >
                                            <BarChart2 className="h-5 w-5" /> Charts
                                        </button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button
                                            onClick={() => handleMobileNavClick("/coffee-types")}
                                            className="flex items-center gap-3 text-sm font-medium hover:text-malta-300"
                                        >
                                            <Coffee className="h-5 w-5" /> Coffee Types
                                        </button>
                                    </SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop "Log Brew" button */}
                    <NavLink
                        to="/log"
                        className={({ isActive }) =>
                            `hidden sm:inline-block text-sm font-medium px-4 py-2 rounded-full transition duration-200 ${
                                isActive ? "bg-malta-600 text-white" : "bg-malta-800 text-malta-100 hover:bg-malta-700"
                            }`
                        }
                    >
                        Log Brew
                    </NavLink>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Desktop only */}
                <aside
                    className={`${
                        sidebarOpen ? "w-64" : "w-20"
                    } bg-malta-900 transition-all duration-300 hidden sm:flex flex-col p-4`}
                >
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 self-end">
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>

                    <nav className="flex flex-col gap-6">
                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-malta-300 transition ${
                                    isActive ? "text-malta-200" : "text-malta-100"
                                }`
                            }
                        >
                            <History className="h-5 w-5" />
                            {sidebarOpen && "History"}
                        </NavLink>

                        <NavLink
                            to="/charts"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-malta-300 transition ${
                                    isActive ? "text-malta-200" : "text-malta-100"
                                }`
                            }
                        >
                            <BarChart2 className="h-5 w-5" />
                            {sidebarOpen && "Charts"}
                        </NavLink>

                        <NavLink
                            to="/coffee-types"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-malta-300 transition ${
                                    isActive ? "text-malta-200" : "text-malta-100"
                                }`
                            }
                        >
                            <Coffee className="h-5 w-5" />
                            {sidebarOpen && "Coffee Types"}
                        </NavLink>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
