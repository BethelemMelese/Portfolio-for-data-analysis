import { useEffect } from "react";
import AppRoute from "./appRouting";
import Loading from "./component/loading";

function App() {
  useEffect(() => {
    const currentTheme: any = localStorage.getItem("theme-color");
    if (!currentTheme) {
      localStorage.setItem("theme-color", "dark");
    }
  }, []);

  return (
    <div>
      {/* <Loading/> */}
      <AppRoute />
    </div>
  );
}

export default App;
