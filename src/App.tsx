import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/login/Login";
import { Home } from "./page/home/Home";
import { MainLayout } from "./layout/MainLayout";

export interface userT {
    accessToken: string;
    refreshToken: string;
    store: {
        id: string;
        created_at: string;
        updated_at: string;
        login: string;
        full_name: string;
        email: string;
        phone_number: string;
        wallet: string;
        image: string | null;
        pin_code: number;
        is_active: boolean;
    };
}

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
