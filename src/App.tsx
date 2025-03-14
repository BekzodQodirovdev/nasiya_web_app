import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/login/Login";
import { Home } from "./page/home/Home";
import { MainLayout } from "./layout/MainLayout";
import { Debtor } from "./page/debtor/Debtor";
import { NewDebtor } from "./page/debtor/NewDebtor";
import Debts from "./page/debts/Debts";
import DebtsNew from "./page/debts/components/DebtsNew";
import { PaymentDebts } from "./page/Payment/PaymentDebts";
import { SettingsPage } from "./page/settings/Settings";
import { HisobotPage } from "./page/hisobot/Hisobot";

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
                <Route path="/debtor" element={<Debtor />} />
                <Route path="/sozlama" element={<SettingsPage />} />
                <Route path="/hisobot" element={<HisobotPage />} />
                <Route path="/debtor/new" element={<NewDebtor />} />
                <Route path="/debts/:id" element={<Debts />} />
                <Route path="/debts/new/:id" element={<DebtsNew />} />
                <Route path="/debts/payment/:id" element={<PaymentDebts />} />
            </Route>
        </Routes>
    );
}

export default App;
