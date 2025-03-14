import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import {
    FolderOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { userT } from "../App";
import { loadState } from "../config/storage";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<userT | null>(null);

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        try {
            const parsedUser: userT = JSON.parse(storedUser);
            if (
                !parsedUser.accessToken ||
                checkTokenExpiration(parsedUser.accessToken)
            ) {
                navigate("/login");
            } else {
                setUser(parsedUser);
            }
        } catch (error) {
            console.error(
                "Foydalanuvchi ma’lumotlarini tahlil qilishda xatolik:",
                error
            );
            navigate("/login");
        }
    }, [navigate]);

    const checkTokenExpiration = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const exp = payload.exp * 1000;
            return Date.now() >= exp;
        } catch (error) {
            console.error("Tokenni tahlil qilishda xatolik:", error);
            return true;
        }
    };

    if (!user) {
        return null;
    }

    const { store } = loadState("user");

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                colorText: "black",
                                colorPrimary: "#1890ff",
                                colorBgContainer: "#FFFFFF",
                            },
                        },
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{ height: "100vh", overflowX: "auto" }}
                        items={[
                            {
                                key: "1",
                                icon: <HomeOutlined />,
                                label: <Link to={"/"}>Asosiy</Link>,
                            },
                            {
                                key: "2",
                                icon: <UsergroupAddOutlined />,
                                label: <Link to={"/debtor"}>Mijozlar</Link>,
                            },
                            {
                                key: "3",
                                icon: <FolderOutlined />,
                                label: <Link to={"/hisobot"}>Hisobot</Link>,
                            },
                            {
                                key: "4",
                                icon: <SettingOutlined />,
                                label: <Link to={"/sozlama"}>Sozlama</Link>,
                            },
                        ]}
                    />
                </ConfigProvider>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "16px", width: 64, height: 64 }}
                    />
                    <Button
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "20px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={store.image}
                            width={30}
                            height={30}
                            alt="user img"
                        />
                    </Button>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                        overflowX: "auto",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
