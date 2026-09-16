import { Link } from "react-router-dom"

import AvatarMenu from "@/components/navigation/AvatarMenu"

//images
import Logo from "@/assets/Logo.svg"

function Navbar() {

  

  return (
    <div className="pt-[55px] pb-[55px]">
    <div className="sticky top-4 z-50 w-full">
      <div className="flex justify-center">
      <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2  bg-white/60 shadow-[0_4px_29px_rgba(148,163,184,0.17)] backdrop-blur-[11px]">

        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
          <img src={Logo} alt="MedVault logo" />
           
          </Link>

          <div className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
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
    </div>
  )
}

export default Navbar
