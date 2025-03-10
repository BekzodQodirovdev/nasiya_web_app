import { Image, Table, TableProps } from "antd";
import React from "react";
import { DebtPeriod, DebtStatus } from "../enum/debtPeriod";
import { useGetOneDebtor } from "../service/useGetOneDebtor";

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
}

export const TableCom: React.FC<{ id: string }> = ({ id }) => {
    const { data } = useGetOneDebtor(id);
    console.log(data);

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
            title: "Holati",
            dataIndex: "debt_status",
            key: "debt_status",
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
