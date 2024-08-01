import { useEffect } from "react";
import AppRoute from "./appRouting";

function App() {
  useEffect(() => {
    const currentTheme: any = localStorage.getItem("theme-color");
    if (!currentTheme) {
      localStorage.setItem("theme-color","dark");
    }
  }, []);
  
  return (
    <div>
      <AppRoute />
    </div>
  );
}

export default App;
