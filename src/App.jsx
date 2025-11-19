import { Link, Route, Routes } from "react-router";
import { Home } from "./page/home";
import { Cart } from "./page/cart";

function App() {
  return (
    <>
      <header className="flex justify-center gap-5 bg-amber-400 p-6">
        <Link to={"/"}>Home</Link>
        <Link to={"/card"}>Card</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
