import myImage from "./assets/IMG_4600.jpg";

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Section */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: `url(${myImage})`, // Add your image path
        }}
      ></div>

      {/* Foreground Logo */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 shadow-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold font-mono tracking-wider bg-clip-text bg-gradient-to-r text-white">
            Sumpter Software LLC
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
