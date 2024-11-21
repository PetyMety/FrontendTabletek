
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

export default function Kezdolap() {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");
    


    useEffect(() => {
        fetch(`http://localhost:3000/tabletkezdolap`)
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data);
                
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setLoading(false);
            });
    });

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
            
            <h2>Tabletek listája</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Márka</th>
                        <th>Modell</th>
                        <th>Ár</th>
                        <th>RAM</th>
                        <th>Memória</th>
                        <th>Súly</th>
                        <th>Akciók</th>
                    </tr>
                </thead>
                <tbody>
                    {tablets.map((tablet) => (
                        <tr key={tablet.Id}>
                            <td>{tablet.Id}</td>
                            <td>{tablet.Brand}</td>
                            <td>{tablet.Model}</td>
                            <td>{tablet.Price} Ft</td>
                            <td>{tablet.RAM} GB</td>
                            <td>{tablet.Memory} GB</td>
                            <td>{tablet.Weight} g</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
