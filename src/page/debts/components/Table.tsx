import { Button, Image, Table, TableProps, Tag } from "antd";
import React from "react";
import { DebtPeriod, DebtStatus } from "../enum/debtPeriod";
import { useGetOneDebtor } from "../service/useGetOneDebtor";
import { useNavigate } from "react-router-dom";

export interface DebtsType {
    next_payment_date: Date;
    debt_period: DebtPeriod;
    debt_sum: number;
    total_debt_sum: number;
    total_month: number;
    description: string;
    images: { image: string }[];
    debtor: string;
    debt_status: DebtStatus;
    id: string;
}

export const TableCom: React.FC<{ id: string }> = ({ id }) => {
    const { data } = useGetOneDebtor(id);
    const navigate = useNavigate();

    const columns: TableProps<DebtsType>["columns"] = [
        {
            title: "Narx",
            dataIndex: "debt_sum",
            key: "debt_sum",
        },
        {
            title: "Eslatma",
            dataIndex: "description",
            key: "address",
        },
        {
            title: "Rasmlar",
            dataIndex: "images",
            key: "images",
            render: (images) =>
                images?.length
                    ? images.map((img: { id: string; image: string }) => (
                          <Image
                              key={img.id}
                              alt="img"
                              src={img.image}
                              style={{ width: "50px", marginRight: "5px" }}
                          />
                      ))
                    : "No Image",
        },
        {
            title: "Keyingi to'lov sanasi",
            dataIndex: "next_payment_date",
            key: "next_payment_date",
        },
        {
            title: "Holati",
            dataIndex: "debt_status",
            key: "debt_status",
            render: (debt_status) => (
                <Tag
                    color={debt_status == "active" ? "green" : "red"}
                    key={"tag"}
                >
                    {debt_status}
                </Tag>
            ),
        },
        {
            title: "To'lash",
            key: "button",
            dataIndex: "id",
            render: (debtId) => (
                <Button onClick={() => navigate(`/debts/payment/${debtId}`)}>
                    To'lash
                </Button>
            ),
        },
    ];

    return (
        <Table<DebtsType>
            columns={columns}
            dataSource={
                data?.data?.debts?.map((item, index) => ({
                    ...item,
                    key: index,
                })) || []
            }
            rowKey="id"
        />
    );
};
