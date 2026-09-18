import { Link } from "react-router-dom"

import AvatarMenu from "@/components/navigation/AvatarMenu"

//images
import Logo from "@/assets/Logo.svg"

function Navbar() {

  

  return (
    
    <div className="sticky top-6 inset-x-0 z-50 pointer-events-none px-[8vw] pt-4 pb-20">
      <div className="mx-auto flex w-full max-w-360 justify-center">

      <nav className="pointer-events-auto flex w-full items-center justify-between rounded-full border border-white/40 bg-white/60 px-4 py-2 shadow-[0_4px_29px_rgba(148,163,184,0.17)] backdrop-blur-[11px]">

        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
          <img src={Logo} alt="MedVault logo" />
           
          </Link>

          <div className="hidden items-center gap-6 text-sm text-foreground sm:flex">
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
          </div>
        </div>

        <AvatarMenu />
      </nav>
      </div>
    </div>
  
  )
}

export default Navbar
