import { Outlet } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";

export default function Admin() {
  return (
    <div  >
         <Navbar/>
         <main >
         <Outlet/>
         </main>
    </div>
  )
}
