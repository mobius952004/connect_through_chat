import Sidebar from "../components/sidebar"
import { Outlet,useLocation } from "react-router-dom"
import MagicBento from '../components/UI/MagicBento'
import DotGrid from '../components/UI/DotGrid';


export default function Home(){
     const location = useLocation()

  // This checks if no child route is active
  const isHomeRoot = location.pathname === "/connect/home"

return(
    <div className="flex h-screen gap-1 ">
<Sidebar/>



<div className="flex-1 overflow-hidden flex items-center bg-indigo-800/80  justify-center ">
   
 {isHomeRoot ? 
 <div className="relative overflow-hidden  z-10 h-screen w-full">
  {/* <DotGrid
    dotSize={10}
    gap={15}
    baseColor="#271E37"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  /> */}

 <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
    <div className=" pointer-events-auto flex flex-col items-center gap-3">

<MagicBento 
  textAutoHide={true}
  enableStars
  enableSpotlight
  enableBorderGlow={true}
  enableTilt
  enableMagnetism={true}
  clickEffect
  spotlightRadius={740}
  particleCount={12}
  glowColor="34,197,94"
  disableAnimations={true}
  className="  "
/>
        </div>
        </div>

</div>
 
  : <Outlet />}
</div>

    </div>
 
)

}