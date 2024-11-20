import { useState } from "react";
import Menu from "./Menu";

export default function TabletFelvetel() {
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [ram, setRam] = useState<number>(0);
    const [memory, setMemory] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const newTablet = { Brand: brand, Model: model, Price: price, RAM: ram, Memory: memory, Weight: weight };
        
        console.table(newTablet);

        try {
            const response = await fetch("http://localhost:3000/tablet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTablet),
            });
            if (!response.ok) {
                throw new Error("Hiba történt a tablet felvételekor!:" + response.status);
            }
            setSuccess(true);
            setBrand("");
            setModel("");
            setPrice(0);
            setRam(0);
            setMemory(0);
            setWeight(0);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h1>Tablet felvétel</h1>
            <h2>Menü</h2>
            <Menu></Menu>

            <form onSubmit={handleSubmit}>
                <label>
                    Márka: {brand}<br />
                    <input type="text" name="brand" value={brand} required onChange={(e) => setBrand(e.target.value)} />
                </label><br />
                <label>
                    Modell: {model}<br />
                    <input type="text" name="model" value={model} required onChange={(e) => setModel(e.target.value)} />
                </label><br />
                <label>
                    Ár: {price} Ft<br />
                    <input type="number" name="price" value={price} required onChange={(e) => setPrice(parseInt(e.target.value))} />
                </label><br />
                <label>
                    RAM: {ram} GB<br />
                    <input type="number" name="ram" value={ram} required onChange={(e) => setRam(parseInt(e.target.value))} />
                </label><br />
                <label>
                    Memória: {memory} GB<br />
                    <input type="number" name="memory" value={memory} required onChange={(e) => setMemory(parseInt(e.target.value))} />
                </label><br />
                <label>
                    Súly: {weight} g<br />
                    <input type="number" name="weight" value={weight} required onChange={(e) => setWeight(parseInt(e.target.value))} />
                </label><br />
                <button type="submit">Tablet felvétele</button>
            </form>

            {error && <p>Hiba történt a tablet felvételekor! {error}</p>}
            {success && <p>A tablet felvétele sikeres!</p>}
        </>
    );
}