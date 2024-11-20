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

export default function TabletLista() {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1
        
    );

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
        fetch(`http://localhost:3000/tablet?page=${currentPage}&limit=2`)
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
                setTotalPages(data.totalPages);  // Assuming server provides totalPages
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setLoading(false);
            });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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

            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Előző
                </button>
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Következő
                </button>
            </div>
        </>
    );
}