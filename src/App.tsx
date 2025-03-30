import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import BrewForm from './BrewForm';
import BrewHistory from './BrewHistory';
import CoffeeTypeForm from './CoffeeTypeForm';
import { Toaster, toast } from 'sonner';

type Brew = {
    id: string;
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    boilerTemperature: number;
    notes: string;
    timestamp: string; // ISO format
};

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
            <div className="min-h-screen px-4 py-6">
                <nav
                    style={{
                        position: 'sticky',
                        top: 0,
                        background: '#242424',
                        padding: '1rem',
                        zIndex: 10,
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

                <Routes>
                    <Route path="/" element={<Navigate to="/log" replace />} />
                    <Route path="/log" element={<BrewForm onSubmitBrew={addBrew} />} />
                    <Route path="/history" element={<BrewHistory brews={brews} onDelete={deleteBrew} />} />
                    <Route path="/coffee-types" element={<CoffeeTypeForm onSubmit={(coffee) => console.log(coffee)} />} />
                </Routes>
            </div>
        </Router>

    <Toaster/>
        </>
    );
}

export default App;
