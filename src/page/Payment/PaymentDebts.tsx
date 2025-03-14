import { useState } from "react";
import {
    Card,
    InputNumber,
    Button,
    Checkbox,
    List,
    Typography,
    Row,
    Col,
    Modal,
} from "antd";
import { useParams } from "react-router-dom";

export const PaymentDebts = () => {
    const { id } = useParams();
    const [amount, setAmount] = useState<number | null>(null);
    const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const months = [
        { id: 3, date: "01.11.2024", amount: 800000 },
        { id: 4, date: "01.12.2024", amount: 800000 },
        { id: 5, date: "01.01.2025", amount: 800000 },
        { id: 6, date: "01.02.2025", amount: 800000 },
    ];

    const handleSelectMonth = (monthId: number) => {
        setSelectedMonths((prev) =>
            prev.includes(monthId)
                ? prev.filter((m) => m !== monthId)
                : [...prev, monthId]
        );
    };

    const handlePayment = () => {
        setIsModalOpen(true);
    };

    return (
        <Row justify="center" style={{ padding: "20px" }}>
            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title="To'lov qilish">
                    <Typography.Text>
                        To'lov miqdorini kiriting:
                    </Typography.Text>
                    <InputNumber
                        style={{ width: "100%", marginBottom: "16px" }}
                        placeholder="Miqdorni kiriting"
                        value={amount}
                        onChange={setAmount}
                    />

                    <Typography.Text>To'lov muddatini tanlang:</Typography.Text>
                    <List
                        dataSource={months}
                        renderItem={(month) => (
                            <List.Item>
                                <Checkbox
                                    checked={selectedMonths.includes(month.id)}
                                    onChange={() => handleSelectMonth(month.id)}
                                >
                                    {month.date} -{" "}
                                    {month.amount.toLocaleString()} so'm
                                </Checkbox>
                            </List.Item>
                        )}
                    />

                    <Button
                        type="primary"
                        block
                        style={{ marginTop: "16px" }}
                        onClick={handlePayment}
                        disabled={!amount && selectedMonths.length === 0}
                    >
                        So'ndirish
                    </Button>
                </Card>

                <Modal
                    title="Success"
                    visible={isModalOpen}
                    onOk={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <Typography.Title level={4}>Ajoyib!</Typography.Title>
                    <Typography.Text>
                        Muvaffaqiyatli so‘ndirildi
                    </Typography.Text>
                </Modal>
            </Col>
        </Row>
    );
};
