import Link from "next/link"
import { LogoutButton } from "../(auth)/components/LogoutButton"
export default function NavBar({user}:any){
    
    return(
        <div className="navbar bg-transparent shadow-sm">
  <div className="flex-1 text-white">
    <h1 className="text-2xl font-bold">
            Skill<span className="text-green-400">Track</span>
          </h1>
    {/* <a className="btn btn-ghost text-xl">SKILL TRACER</a> */}
  </div>
  <div className="flex-none text-white">
    <ul className="menu menu-horizontal px-1">
      <li><a className="text-white">Home</a></li>
      <li><a className="text-white">Features</a></li>
      {!user ? (
        <>
<li><Link href='/login' className="text-white">Login</Link></li>
      <li><Link href='/signup' className="text-white">SignUp</Link></li>
      </>
      ):(
          <>
          <li><LogoutButton/></li>
        
          <li><Link href='/dashboards' className="text-white">Dashboard</Link></li>
        </>
      )}
      
      
    </ul>
  </div>
</div>
    )

}