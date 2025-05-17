export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, #DCEBFF 0%, #EBDCFB 25%, #FBE5F0 75%, #F7FAFF 100%)",
      }}
    >
      {/* Logo / Title */}
      <h1 className="mt-16 text-[#CB6CE6] text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-center font-sans">
        Blaze
      </h1>
      {/* Subtitle */}
      <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 text-center font-sans max-w-xl">
        Talk to Strangers
        <br />
        Instantly
      </h2>
      {/* Description */}
      <p className="text-black text-base sm:text-lg md:text-xl max-w-2xl text-center mb-12 font-sans">
        Random Text and Video call
        <br />
        with people around the world
      </p>
      {/* Call to Action */}
      <button className="text-white bg-blue-500 cursor-pointer font-bold py-3 px-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 mb-12">
        <a href="/meet">Start</a>
      </button>
      {/* Guidelines */}
      <footer className="mt-auto text-black text-sm sm:text-base flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
        <span className="px-2 py-1  bg-opacity-20 rounded">Be nice</span>
        <span className="px-2 py-1 bg-opacity-20 rounded">Be respectful</span>
        <span className="px-2 py-1  bg-opacity-20 rounded">No Bullying</span>
      </footer>
    </main>
  );
}
