import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/login/Login";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
