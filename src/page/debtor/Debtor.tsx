import { Button, Col, Input, Row } from "antd";
import { SearchProps } from "antd/es/input";
import userCreateIcon from "../../assets/svg/userCreate.svg";
import { useNavigate } from "react-router-dom";
import TableCompts from "./components/Table";

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

            <Col style={{ paddingTop: "50px" }}>
                <TableCompts />
            </Col>
        </Row>
    );
};
