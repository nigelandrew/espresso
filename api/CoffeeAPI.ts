import {CoffeeType} from "@/types/coffee";

const API_BASE_URL = "http://localhost:4000"; // or host.docker.internal if frontend is in Docker

export async function createCoffeeType(coffee: CoffeeType): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/coffee-types`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(coffee),
    });
    return await res.json();
}
