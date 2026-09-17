import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/context/auth.context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AvatarMenu() {
  const { setIsLoggedin, setLoggedUserId, setUser, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedin(false)
    setLoggedUserId(null)
    setUser(null)
    navigate("/login")
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar size="lg">
            <AvatarImage src={user?.avatar} alt={user?.name ?? "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

       <DropdownMenuContent className="w-42" align="center" collisionPadding={10}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate("/user")}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
         
          
          <DropdownMenuItem onClick={() => setIsDark((prev) => !prev)}>
            {isDark ? "Light" : "Dark"} mode
            <DropdownMenuShortcut>D</DropdownMenuShortcut>
          </DropdownMenuItem>


        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    

    </DropdownMenu>
  )
}

export default AvatarMenu
