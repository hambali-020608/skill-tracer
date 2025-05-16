import Link from "next/link"
import {invoke} from "./blitz-server"
import {LogoutButton} from "./(auth)/components/LogoutButton"
import styles from "./styles/Home.module.css"
import getCurrentUser from "./users/queries/getCurrentUser"
import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import FAQSection from "./components/faq"
import Footer from "./components/Footer"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)
  return (
    <>
    <NavBar user={currentUser}/>
    <main>
      <Hero/>
      <Features/>
      <FAQSection/>
              <div className='mt-10'>
                {/* {currentUser ? (
                  <>
                    <LogoutButton />
                    <div>
                      User id: <code>{currentUser.id}</code>
                      <br />
                      User role: <code>{currentUser.role}</code>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/signup" className={styles.button}>
                      <strong>Sign Up</strong>
                    </Link>
                    <Link href="/login" className={styles.loginButton}>
                      <strong>Login</strong>
                    </Link>
                  </>
                )} */}
              </div>
              </main>

              <Footer/>
          
    </>
  )
}
