import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import BrewForm from './BrewForm';
import BrewHistory from './BrewHistory';
import { Toaster, toast } from 'sonner';

type Brew = {
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
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

    const addBrew = async (brew: Omit<Brew, 'timestamp'>) => {
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
        } catch (e) {
            console.error('Failed to save brew:', e);
        }
    };

    const deleteBrew = async (timestamp: string) => {
        try {
            await fetch(`http://localhost:4000/brews/${timestamp}`, {
                method: 'DELETE',
            });

            const res = await fetch('http://localhost:4000/brews');
            const updated = await res.json();
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
                </nav>

                <Routes>
                    <Route path="/" element={<Navigate to="/log" replace />} />
                    <Route path="/log" element={<BrewForm onSubmitBrew={addBrew} />} />
                    <Route path="/history" element={<BrewHistory brews={brews} onDelete={deleteBrew} />} />
                </Routes>
            </div>
        </Router>

    <Toaster/>
        </>
    );
}

export default App;
