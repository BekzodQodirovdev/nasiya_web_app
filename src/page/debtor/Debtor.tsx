import { Button, Col, Input, Row } from "antd";
import { SearchProps } from "antd/es/input";
import userCreateIcon from "../../assets/svg/userCreate.svg";
import { CardCompo } from "./components/card";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

export const Debtor = () => {
    const navigate = useNavigate();
    return (
        <Row style={{ flexDirection: "column" }}>
            <Row
                style={{ justifyContent: "space-around", alignItems: "center" }}
            >
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    style={{ width: "70%" }}
                />
                <Button
                    onClick={() => navigate("/debtor/new")}
                    style={{
                        backgroundColor: "#1677ff",
                        color: "white",
                        padding: "20px",
                    }}
                >
                    <img
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                        src={userCreateIcon}
                        alt="user creaete"
                    />
                    Yaratish
                </Button>
            </Row>
            <Row gutter={[48, 48]} style={{ paddingTop: "40px", gap: "40px" }}>
                <Col span={5}>
                    <CardCompo />
                </Col>
            </Row>
        </Row>
    );
};
