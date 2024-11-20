import { useEffect, useState } from "react";
import Menu from "./Menu";

interface Tablet {
    Id: number;
    Brand: string;
    Model: string;
    Price: number;
    RAM: number;
    Memory: number;
    Weight: number;
}

export default function TabletLapozRendezKeres() {
    
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");

    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: 'asc' | 'desc' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);

    const handleDelete = async (id: number) => {
        alert("Törlendő tablet: " + id);
        try {
            const response = await fetch(`http://localhost:3000/tablet/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Hiba történt a törlés során!:" + response.status);
            }
            setTablets(tablets.filter((tablet) => tablet.Id != id));
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/tablet")
            .then((response) => {
                if (response.status == 404) {
                    setErrorServer('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data);
                setFilteredTablets(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    }, []);


    const sortTablets = (key: keyof Tablet, direction: 'asc' | 'desc') => {
        const sortedTablets = [...filteredTablets].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTablets(sortedTablets);
        setSortConfig({ key, direction });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = tablets.filter(
            (tablet) =>
                tablet.Brand.toLowerCase().includes(term) ||
                tablet.Model.toLowerCase().includes(term) ||
                tablet.Price.toString().includes(term)
        );
        setFilteredTablets(filtered);
    };


    if (errorServer) {
        return <p>{errorServer}</p>;
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>;
    }

    return (
        <>
            <h1>Tabletek</h1>
            <h2>Menü</h2>
            <Menu></Menu>
            
            <h2>Tabletek keresése és rendezése</h2>

            <form>
                <label>
                    Keresés:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Márka, típus vagy ár alapján..."
                    />
                </label>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Márka<button
                                onClick={() => sortTablets('Brand', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('Brand', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>Modell<button
                                onClick={() => sortTablets('Model', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('Model', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>Ár<button
                                onClick={() => sortTablets('Price', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('Price', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>RAM<button
                                onClick={() => sortTablets('RAM', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('RAM', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>Memória<button
                                onClick={() => sortTablets('Memory', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('Memory', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>Súly<button
                                onClick={() => sortTablets('Weight', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('Weight', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>Akciók</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTablets.map((tablet) => (
                        <tr key={tablet.Id}>
                            <td>{tablet.Id}</td>
                            <td>{tablet.Brand}</td>
                            <td>{tablet.Model}</td>
                            <td>{tablet.Price} Ft</td>
                            <td>{tablet.RAM} GB</td>
                            <td>{tablet.Memory} GB</td>
                            <td>{tablet.Weight} g</td>
                            <td>
                                <span
                                    style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                                    onClick={() => handleDelete(tablet.Id)}
                                >
                                    Törlés
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}