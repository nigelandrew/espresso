import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import BrewForm from './BrewForm';
import BrewHistory from './BrewHistory';

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

    return (
        <Router>
            <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                <nav style={{ marginBottom: '1rem' }}>
                    <Link to="/log" style={{ marginRight: '1rem' }}>Log Brew</Link>
                    <Link to="/history">View History</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Navigate to="/log" replace />} />
                    <Route path="/log" element={<BrewForm onSubmitBrew={addBrew} />} />
                    <Route path="/history" element={<BrewHistory brews={brews} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
