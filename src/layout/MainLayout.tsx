import { useState } from "react";
import {
    FolderOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
// import { loadState } from "../config/storage";
// import { userT } from "../App";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
    // const user: userT | undefined = loadState("user");
    // const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/login");
    //     }
    // }, [user, navigate]);

    // if (!user) {
    //     return null;
    // }

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
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
                        style={{
                            height: "100vh",
                        }}
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
                        background: colorBgContainer,
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
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Button
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "20px",
                        }}
                    ></Button>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: "#f0f2f5",
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
