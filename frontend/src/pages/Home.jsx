import Sidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"


export default function Home(){

return(
    <div className="flex h-screen gap-1">
<Sidebar/>


<div className="flex-1 overflow-y-auto">
    <Outlet/>
</div>

    </div>
)

}