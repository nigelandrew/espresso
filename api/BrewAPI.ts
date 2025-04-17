import {Brew} from "../src/types/brew";

const API_BASE_URL = "http://localhost:4000";

export async function logBrewAPI(Brew: Brew): Promise<Brew[]> {
    const res = await fetch(`${API_BASE_URL}/log`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Brew),
    });

    if (!res.ok) {
        throw new Error("Failed to log brew");
    }

    return res.json();
}