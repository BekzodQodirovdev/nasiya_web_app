import { Card } from "antd";
import starIcon from "../../../assets/svg/starIcon.svg";
// import starIconFill from "../../../assets/svg/starSelected.svg";

export const CardCompo = () => {
    return (
        <Card style={{ width: "345px", position: "relative" }}>
            <img
                style={{
                    position: "absolute",
                    right: "19px",
                    top: "33px",
                    cursor: "pointer",
                }}
                src={starIcon}
                alt="star"
            />
            <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                Rahmatulloh Madraximov
            </p>
            <p
                style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    paddingTop: "4px",
                }}
            >
                +998 91 123 45 67
            </p>
            <p
                style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "16px",
                }}
            >
                Jami nasiya:
            </p>
            <p
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#f94d4d",
                    paddingTop: "4px",
                }}
            >
                -800 000 so‘m
            </p>
        </Card>
    );
};
