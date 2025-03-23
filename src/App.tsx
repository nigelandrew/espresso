import {useEffect, useState} from 'react';
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
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Espresso Brew Tracker</h1>
            <BrewForm onSubmitBrew={addBrew} />
            <hr style={{ margin: '2rem 0' }} />
            <BrewHistory brews={brews} />
        </div>
    );
}

export default App;
