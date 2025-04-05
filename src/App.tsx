import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import BrewForm from './BrewForm';
import BrewHistory from './BrewHistory';
import CoffeeTypeForm from './CoffeeTypeForm';
import BrewChart from "./BrewChart";
import { Toaster, toast } from 'sonner';
import { Brew } from "./types/brew.ts"

function App() {
    const [brews, setBrews] = useState<Brew[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/brews')
            .then((res) => res.json())
            .then((data) => setBrews(data))
            .catch((err) => console.error('Failed to load brews:', err));
    }, []);

    const addBrew = async (brew: Omit<Brew, 'timestamp' | 'id'>) => {
        try {
            await fetch('http://localhost:4000/brews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(brew),
            });

            // Reload brews from backend
            const res = await fetch('http://localhost:4000/brews');
            const updated = await res.json();
            setBrews(updated);
            toast.success("Brew added successfully");
        } catch (e) {
            console.error('Failed to save brew:', e);
            toast.error("Failed to save brew. Please try again.");
        }
    };

    const deleteBrew = async (id: string) => {
        try {
            await fetch(`http://localhost:4000/brews/${id}`, {
                method: 'DELETE',
            });
            const updated = await fetch("http://localhost:4000/brews").then(r => r.json());
            setBrews(updated);

            toast.success("Brew deleted successfully");
        } catch (e) {
            console.error('Failed to delete brew:', e);
            toast.error("Failed to delete brew. Please try again.");
        }
    };

    return (
        <>
        <Router>
            <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10">
                <nav
                    className="mb-8 flex gap-4"
                    style={{
                        background: '#242424'
                    }}
                >
                    <NavLink
                        to="/log"
                        style={({ isActive }) => ({
                            marginRight: '1rem',
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: 'none',
                            color: '#FFF',
                            backgroundColor: isActive ? '#555' : '#000',
                            padding: '1rem',
                            borderRadius: '10px',
                        })}
                    >
                        Log Brew
                    </NavLink>

                    <NavLink
                        to="/history"
                        style={({ isActive }) => ({
                            marginRight: '1rem',
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: 'none',
                            color: '#FFF',
                            backgroundColor: isActive ? '#555' : '#000',
                            padding: '1rem',
                            borderRadius: '10px',
                        })}
                    >
                        View History
                    </NavLink>

                    <NavLink
                        to="/charts"
                        style={({ isActive }) => ({
                            marginRight: '1rem',
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: 'none',
                            color: '#FFF',
                            backgroundColor: isActive ? '#555' : '#000',
                            padding: '1rem',
                            borderRadius: '10px',
                        })}
                    >
                        Charts
                    </NavLink>
                    <NavLink
                        to="/coffee-types"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? 'bold' : 'normal',
                            textDecoration: 'none',
                            color: '#FFF',
                            backgroundColor: isActive ? '#555' : '#000',
                            padding: '1rem',
                            borderRadius: '10px',
                        })}
                    >
                        Coffee Types
                    </NavLink>
                </nav>

                <main className="w-full max-w-xl mx-auto">
                <Routes>
                    <Route path="/" element={<Navigate to="/log" replace />} />
                    <Route path="/log" element={<BrewForm onSubmitBrew={addBrew} />} />
                    <Route path="/history" element={<BrewHistory brews={brews} onDelete={deleteBrew} />} />
                    <Route path="/charts" element={<BrewChart brews={brews} />} />
                    <Route path="/coffee-types" element={<CoffeeTypeForm onSubmit={(coffee) => console.log(coffee)} />} />
                </Routes>
                </main>
            </div>
        </Router>

    <Toaster/>
        </>
    );
}

export default App;
