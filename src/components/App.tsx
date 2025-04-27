import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import BrewForm from './BrewForm.tsx';
import BrewHistory from './BrewHistory.tsx';
import CoffeeTypeForm from './CoffeeTypeForm.tsx';
import BrewChart from "./BrewChart.tsx";
import MaintenanceForm from "./MaintenanceForm.tsx";
import {Toaster, toast} from 'sonner';
import {Brew} from "../types/brew.ts"
import AppLayout from "./AppLayout.tsx";

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
                headers: {'Content-Type': 'application/json'},
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
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route path="/" element={<Navigate to="/log" replace/>}/>
                        <Route path="/log" element={<BrewForm onSubmitBrew={addBrew}/>}/>
                        <Route path="/history" element={<BrewHistory brews={brews} onDelete={deleteBrew}/>}/>
                        <Route path="/charts" element={<BrewChart brews={brews}/>}/>
                        <Route path="/coffee-types"
                               element={<CoffeeTypeForm onSubmit={() => void 0}/>}/>
                        <Route path="/maintenance" element={<MaintenanceForm onSubmitMaintenance={() => {}} />}/>
                    </Route>
                </Routes>
            </Router>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: "flex items-center gap-3 p-4 rounded-md bg-malta-100 text-malta-800 border border-malta-300 shadow-md",
                        success: "bg-toast-success text-toast-success-text border border-toast-success",
                        error: "bg-toast-error text-toast-error-text border border-toast-error",
                        warning: "bg-toast-warning text-toast-warning-text border border-toast-warning",
                        info: "bg-toast-info text-toast-info-text border border-toast-info",
                    },
                }}
            />
        </>
    );
}

export default App;
