import { createBrowserRouter, RouterProvider } from "react-router-dom";
  import TabletLista from './components/TabletLista';
  import TabletFelvetel from './components/TabletFelvetel';
  import TabletLapozRendezKeres from "./components/TabletLapozRendezKeres";

  function App() {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <TabletLista />,
        },
        {
          path: "/tabletek-lista",
          element: <TabletLista />,
        },
        {
          path: "/tabletek-felvetel",
          element: <TabletFelvetel />,
        },
        {
          path: "/tabletek-keres-lapoz",
          element: <TabletLapozRendezKeres />,
        }
      ]);
  
    return (
      <RouterProvider router={router} />
    )
  }
  
  export default App