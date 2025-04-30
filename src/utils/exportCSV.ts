export function downloadCSV<T extends Record<string, unknown>>(data: T[], filename = "export.csv") {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(","), // header row
        ...data.map((row) =>
            headers.map((field) => {
                const value = row[field];
                if (typeof value === "object") {
                    return `"${JSON.stringify(value)}"`; // flatten objects
                }
                return `"${String(value ?? "")}"`;
            }).join(",")
        ),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}
