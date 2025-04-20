import { CoffeeType } from "@/types/coffee";

const API_BASE_URL="http://localhost:4000";
//const API_BASE_URL = "http://host.docker.internal:4000";

export async function createCoffeeType(coffee: CoffeeType): Promise<CoffeeType> {
    try {
        const res = await fetch(`${API_BASE_URL}/coffee-types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(coffee),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("API error response:", data);
            throw new Error(`Failed to save coffee type: ${res.statusText}`);
        }


        return data;
    } catch (err) {
        console.error("Network or server error:", err);
        throw err;
    }
}
