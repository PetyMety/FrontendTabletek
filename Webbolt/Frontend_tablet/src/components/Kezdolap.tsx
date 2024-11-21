
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
    
    console.log(error)


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
            
            <h2>Első 3 legdrágább tablet</h2>

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
                    
                        <tr key={tablets[tablets.length-1].Id}>
                            <td>{tablets[tablets.length-1].Id}</td>
                            <td>{tablets[tablets.length-1].Brand}</td>
                            <td>{tablets[tablets.length-1].Model}</td>
                            <td>{tablets[tablets.length-1].Price} Ft</td>
                            <td>{tablets[tablets.length-1].RAM} GB</td>
                            <td>{tablets[tablets.length-1].Memory} GB</td>
                            <td>{tablets[tablets.length-1].Weight} g</td>
                        </tr>

                        <tr key={tablets[tablets.length-2].Id}>
                            <td>{tablets[tablets.length-2].Id}</td>
                            <td>{tablets[tablets.length-2].Brand}</td>
                            <td>{tablets[tablets.length-2].Model}</td>
                            <td>{tablets[tablets.length-2].Price} Ft</td>
                            <td>{tablets[tablets.length-2].RAM} GB</td>
                            <td>{tablets[tablets.length-2].Memory} GB</td>
                            <td>{tablets[tablets.length-2].Weight} g</td>
                        </tr>

                        <tr key={tablets[tablets.length-3].Id}>
                            <td>{tablets[tablets.length-3].Id}</td>
                            <td>{tablets[tablets.length-3].Brand}</td>
                            <td>{tablets[tablets.length-3].Model}</td>
                            <td>{tablets[tablets.length-3].Price} Ft</td>
                            <td>{tablets[tablets.length-3].RAM} GB</td>
                            <td>{tablets[tablets.length-3].Memory} GB</td>
                            <td>{tablets[tablets.length-3].Weight} g</td>
                        </tr>
                </tbody>
            </table>

            <h2>Első 3 legolcsóbb tablet</h2>
            
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
                    
                        <tr key={tablets[0].Id}>
                            <td>{tablets[0].Id}</td>
                            <td>{tablets[0].Brand}</td>
                            <td>{tablets[0].Model}</td>
                            <td>{tablets[0].Price} Ft</td>
                            <td>{tablets[0].RAM} GB</td>
                            <td>{tablets[0].Memory} GB</td>
                            <td>{tablets[0].Weight} g</td>
                        </tr>

                        <tr key={tablets[1].Id}>
                            <td>{tablets[1].Id}</td>
                            <td>{tablets[1].Brand}</td>
                            <td>{tablets[1].Model}</td>
                            <td>{tablets[1].Price} Ft</td>
                            <td>{tablets[1].RAM} GB</td>
                            <td>{tablets[1].Memory} GB</td>
                            <td>{tablets[1].Weight} g</td>
                        </tr>

                        <tr key={tablets[2].Id}>
                            <td>{tablets[2].Id}</td>
                            <td>{tablets[2].Brand}</td>
                            <td>{tablets[2].Model}</td>
                            <td>{tablets[2].Price} Ft</td>
                            <td>{tablets[2].RAM} GB</td>
                            <td>{tablets[2].Memory} GB</td>
                            <td>{tablets[2].Weight} g</td>
                        </tr>
                </tbody>
            </table>
        </>
    );
}
