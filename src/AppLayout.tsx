import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, History, BarChart2, Coffee, ScrollText } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
            {/* Header */}
            <header className="w-full bg-zinc-900 px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-lg font-semibold">Espresso Tracker</h1>
                <div className="flex gap-2 items-center">
                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <Menu className="h-6 w-6" />
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-zinc-900 text-white w-64 p-4">
                                <nav className="flex flex-col gap-6 mt-4">
                                    <SheetClose asChild>
                                    <NavLink to="/log" className="flex items-center gap-3 text-sm font-medium hover:text-blue-400">
                                        <ScrollText className="h-5 w-5" /> Log
                                    </NavLink>
                                    </SheetClose>
                                    <SheetClose asChild>
                                    <NavLink to="/history" className="flex items-center gap-3 text-sm font-medium hover:text-blue-400">
                                        <History className="h-5 w-5" /> History
                                    </NavLink>
                                        </SheetClose>
                                        <SheetClose asChild>
                                    <NavLink to="/charts" className="flex items-center gap-3 text-sm font-medium hover:text-blue-400">
                                        <BarChart2 className="h-5 w-5" /> Charts
                                    </NavLink>
                                            </SheetClose>
                                    <SheetClose asChild>
                                    <NavLink to="/coffee-types" className="flex items-center gap-3 text-sm font-medium hover:text-blue-400">
                                        <Coffee className="h-5 w-5" /> Coffee Types
                                    </NavLink>
                                        </SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop "Log Brew" button */}
                    <NavLink
                        to="/log"
                        className={({ isActive }) =>
                            `hidden sm:inline-block text-sm font-medium px-4 py-2 rounded-full transition ${
                                isActive ? "bg-malta-600 text-white" : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
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
                    } bg-zinc-900 transition-all duration-300 hidden sm:flex flex-col p-4`}
                >
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 self-end">
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>

                    <nav className="flex flex-col gap-6">
                        <NavLink
                            to="/log"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-blue-400 transition ${
                                    isActive ? "text-blue-500" : "text-zinc-200"
                                }`
                            }
                        >
                            <ScrollText className="h-5 w-5" />
                            {sidebarOpen && "Log"}
                        </NavLink>

                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-blue-400 transition ${
                                    isActive ? "text-blue-500" : "text-zinc-200"
                                }`
                            }
                        >
                            <History className="h-5 w-5" />
                            {sidebarOpen && "History"}
                        </NavLink>

                        <NavLink
                            to="/charts"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-blue-400 transition ${
                                    isActive ? "text-blue-500" : "text-zinc-200"
                                }`
                            }
                        >
                            <BarChart2 className="h-5 w-5" />
                            {sidebarOpen && "Charts"}
                        </NavLink>

                        <NavLink
                            to="/coffee-types"
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-sm font-medium hover:text-blue-400 transition ${
                                    isActive ? "text-blue-500" : "text-zinc-200"
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
