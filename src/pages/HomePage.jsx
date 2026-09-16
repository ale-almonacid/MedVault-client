import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"

// components 
import MedicalProfileCard from "@/components/dashboard/MedicalProfileCard"

function HomePage() {
  return (
    <div id="content" className="mx-auto w-full max-w-360 px-[5vw] pb-8" >
      <Navbar />
      <header className="flex flex-row gap-40
       px-8">
        <div className="flex flex-col gap-2">
        <h1 className="heading-h1 text-slate-900">Welcome back</h1>
        <p className="text-muted-foreground">All health records are encrypted in your browser before they are saved. Only you and authorized delegates can view them.</p>

        </div>
        <Button>+ Medical Profile</Button>
      </header>

       <div
          id="card-wrapper"
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 px-8 py-12"
        >
         
          <MedicalProfileCard/>
          <MedicalProfileCard/>
          <MedicalProfileCard/>


        </div>


     
    </div>
  )
}

export default HomePage
