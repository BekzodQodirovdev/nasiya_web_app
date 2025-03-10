import { Card, Col, Image } from "antd";
import { useGetOneDebtor } from "../service/useGetOneDebtor";

export const GetOneDebtor = ({ userId }: { userId: string }) => {
    const { data, isLoading, error } = useGetOneDebtor(userId);

    const userData = data?.data;
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading debtor data</p>;
    }

    return (
        <Card style={{ width: 300 }}>
            <h4>To'liq ism: {userData?.full_name || "N/A"},</h4>
            <h4>Yashash manzili: {userData?.address || "N/A"},</h4>
            <h4>Eslatma: {userData?.description || "N/A"},</h4>
            <div>
                <strong>Telefon raqamlar:</strong>
                <ul>
                    {userData?.phone_numbers &&
                    userData.phone_numbers.length > 0 ? (
                        userData.phone_numbers.map((item) => (
                            <li key={item.id}>{item.phone_number}</li>
                        ))
                    ) : (
                        <li>Telefon raqam mavjud emas</li>
                    )}
                </ul>
            </div>
            <Col
                style={{
                    display: "grid",
                    gap: "20px",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                    justifyContent: "center",
                    paddingTop: "20px",
                }}
            >
                {userData?.images.map((item, index) => (
                    <Image key={index} src={item.image} />
                ))}
            </Col>
        </Card>
    );
};
