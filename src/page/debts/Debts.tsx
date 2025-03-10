import { Button, Col, Input, Row } from "antd";
import { SearchProps } from "antd/es/input";
import { useNavigate, useParams } from "react-router-dom";
import userCreateIcon from "../../assets/svg/userCreate.svg";
import { GetOneDebtor } from "./components/GetOneDebtor";
import { TableCom } from "./components/Table";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

const Debts = () => {
    const navigate = useNavigate();
    const { id: userId } = useParams();

    return (
        <Row style={{ flexDirection: "column" }}>
            <Row
                style={{ justifyContent: "space-around", alignItems: "center" }}
            >
                <Search
                    placeholder="Qarzni qidirish"
                    allowClear
                    enterButton="Qidirish"
                    size="large"
                    onSearch={onSearch}
                    style={{ width: "70%" }}
                />
                <Button
                    onClick={() => navigate(`/debts/new/${userId}`)}
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
                    Qarz qo'shish
                </Button>
            </Row>

            <Col style={{ paddingTop: "50px" }}>
                <Row style={{ gap: "100px" }}>
                    <Col>
                        <GetOneDebtor userId={userId as string} />
                    </Col>
                    <Col style={{ width: "70%" }}>
                        <TableCom id={userId as string} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Debts;
