import { Roaster } from "@/types/roaster.ts";

export async function createRoaster(roaster: Omit<Roaster, "id">): Promise<Roaster> {
    const res = await fetch("http://localhost:4000/roasters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roaster),
    });

    if (!res.ok) {
        const errorText = await res.text(); // 👈 Add this
        console.error("❌ Roaster creation error response:", errorText); // 👈 Log it
        throw new Error("Failed to create roaster");
    }

    return await res.json();
}


