import "./App.css";

function App() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="border-2 px-8 py-4 rounded-2xl">
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-gray-800 text-center">
            Sumpter Software LLC
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Gallery from './Gallery';
// import ProjectPage from './ProjectPage';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Gallery />} />
//         <Route path="/project/:projectName" element={<ProjectPage />} />
//       </Routes>
//     </Router>
//   );
// }
