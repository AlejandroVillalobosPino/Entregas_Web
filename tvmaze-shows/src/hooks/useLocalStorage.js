import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = window.localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (e) {
            console.error("Error reading localStorage", e);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Error writing localStorage", e);
        }
    }, [key, value]);

    return [value, setValue];
}
