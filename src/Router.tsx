import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import BrewForm from "@/pages/BrewForm";
import BrewHistory from "@/pages/BrewHistory";
import CoffeeTypeForm from "@/pages/CoffeeTypeForm";
import BrewChart from "@/pages/BrewChart";
import MaintenanceForm from "@/pages/MaintenanceForm";
import RoasterForm from "@/pages/RoasterForm";
import Settings from "@/pages/Settings";
import { Brew } from "@/types/brew";

type AppRouterProps = {
    brews: Brew[];
    addBrew: (brew: Omit<Brew, "timestamp" | "id">) => void;
    deleteBrew: (id: string) => void;
    handleRoasterSubmit: (roasterData: { roasterName: string }) => void;
};

export default function AppRouter({ brews, addBrew, deleteBrew, handleRoasterSubmit }: AppRouterProps) {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/log" replace />} />
                <Route path="/log" element={<BrewForm onSubmitBrew={addBrew} />} />
                <Route path="/history" element={<BrewHistory brews={brews} onDelete={deleteBrew} />} />
                <Route path="/charts" element={<BrewChart brews={brews} />} />
                <Route path="/coffee-types" element={<CoffeeTypeForm onSubmit={() => void 0} />} />
                <Route path="/maintenance" element={<MaintenanceForm onSubmitMaintenance={() => {}} />} />
                <Route path="/roasters" element={<RoasterForm onSubmit={handleRoasterSubmit} />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}
