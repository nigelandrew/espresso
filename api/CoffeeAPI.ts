import {CoffeeType} from "../src/types/coffee.ts";

const API_BASE_URL = "http://localhost:4000";

export async function createCoffeeType(coffee: CoffeeType): Promise<CoffeeType> {
    const res = await fetch(`${API_BASE_URL}/coffee-types`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(coffee),
    });

    if (!res.ok) {
        throw new Error("Failed to create coffee type");
    }

    return res.json();
}
