import { Col, Row, Typography } from "antd";
import React from "react";

import closeEye from "../../assets/svg/eyeClose.svg";
import openEye from "../../assets/svg/eyeOpen.svg";
import wallet from "../../assets/svg/wallet.svg";
import buttonImg from "../../assets/svg/plusButton.svg";

export const Home = () => {
    const [state, setState] = React.useState<boolean>(false);

    return (
        <Row
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
                padding: "20px",
            }}
        >
            <Col
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                }}
            >
                <Row
                    style={{
                        padding: "20px",
                        backgroundColor: "#30af49",
                        borderRadius: "20px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Col>
                        <Typography.Title
                            level={2}
                            style={{ color: "white", margin: 0 }}
                        >
                            {state ? "135 214 200 so‘m" : "* * * * * *"}
                        </Typography.Title>
                        <Typography.Text
                            style={{ color: "#bbe1c2", fontSize: "16px" }}
                        >
                            Umumiy nasiya:
                        </Typography.Text>
                    </Col>
                    <Col
                        onClick={() => setState(!state)}
                        style={{ cursor: "pointer", display: "flex" }}
                    >
                        <img
                            src={state ? openEye : closeEye}
                            alt="eye icon"
                            style={{
                                width: "20px",
                                filter: "brightness(0) invert(1)",
                            }}
                        />
                    </Col>
                </Row>

                <Row
                    style={{
                        gap: "20px",
                        justifyContent: "space-between",
                    }}
                >
                    <Col
                        style={{
                            flex: 1,
                            border: "1px solid #ececec",
                            padding: "16px",
                            borderRadius: "16px",
                            textAlign: "center",
                            backgroundColor: "white",
                        }}
                    >
                        <Typography.Text style={{ fontSize: "18px" }}>
                            Kechiktirilgan to‘lovlar
                        </Typography.Text>
                        <Typography.Title
                            level={3}
                            style={{ margin: 0, fontWeight: "bold" }}
                        >
                            26
                        </Typography.Title>
                    </Col>
                    <Col
                        style={{
                            flex: 1,
                            border: "1px solid #ececec",
                            padding: "16px",
                            borderRadius: "16px",
                            textAlign: "center",
                            backgroundColor: "white",
                        }}
                    >
                        <Typography.Text style={{ fontSize: "18px" }}>
                            Mijozlar soni
                        </Typography.Text>
                        <Typography.Title
                            level={3}
                            style={{
                                margin: 0,
                                color: "#30af49",
                                fontWeight: "bold",
                            }}
                        >
                            151
                        </Typography.Title>
                    </Col>
                </Row>

                <Col
                    style={{
                        border: "1px solid #ececec",
                        borderRadius: "16px",
                        padding: "20px",
                        backgroundColor: "white",
                    }}
                >
                    <Typography.Title
                        level={4}
                        style={{ marginBottom: "20px" }}
                    >
                        Hamyoningiz
                    </Typography.Title>
                    <Row
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                        }}
                    >
                        <Row style={{ alignItems: "center", gap: "12px" }}>
                            <img
                                src={wallet}
                                alt="wallet"
                                style={{ width: "24px" }}
                            />
                            <Col>
                                <Typography.Text>Hisobingizda</Typography.Text>
                                <Typography.Title
                                    level={3}
                                    style={{ margin: 0, fontWeight: "bold" }}
                                >
                                    300 000 so‘m
                                </Typography.Title>
                            </Col>
                        </Row>
                        <img
                            src={buttonImg}
                            alt="button"
                            style={{ cursor: "pointer", width: "24px" }}
                        />
                    </Row>
                    <Row style={{ justifyContent: "space-between" }}>
                        <Typography.Text>Bu oy uchun to‘lov:</Typography.Text>
                        <Typography.Text style={{ color: "#30af49" }}>
                            To‘lov qilingan
                        </Typography.Text>
                    </Row>
                </Col>
            </Col>
        </Row>
    );
};
