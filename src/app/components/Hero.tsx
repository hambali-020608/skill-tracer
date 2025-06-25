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
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-success">Get Started</button>
    </div>
  </div>
</div>
    )
}