export default function Hero(){
    return(
        <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="/images/hero_back.png"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl text-white font-bold">Master New Skills</h1>
      <p className="py-6 text-white max-w-xl ">
   Manage your skill development with Skill Tracer, and learn each skill with the help of a smart chatbot.
      </p>
      <button className="btn btn-success">Get Started</button>
    </div>
  </div>
</div>
    )
}