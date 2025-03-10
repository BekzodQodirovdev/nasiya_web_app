import React from "react";
import { Image, Table } from "antd";
import type { TableProps } from "antd";
import { useGetAllDebtor } from "../service/useGetAlldebtor";
import { useNavigate } from "react-router-dom";
import { DebtsType } from "../../debts/components/Table";

export interface DataType {
    address: string;
    created_at: string;
    debts: DebtsType[];
    description: string;
    full_name: string;
    id: string;
    images: {
        id: string;
        created_at: string;
        updated_at: string;
        image: string;
    }[];
    phone_numbers: {
        created_at: string;
        id: string;
        phone_number: string;
        updated_at: string;
    }[];
    updated_at: string;
}

const TableCompts: React.FC = () => {
    const { data } = useGetAllDebtor();
    console.log(data);

    const navigate = useNavigate();

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "To'liq ism",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Yashash manzili",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Eslatma",
            dataIndex: "description",
            key: "description",
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
            title: "Ko'rish",
            key: "adddebts",
            dataIndex: "id",
            render: (id) => (
                <button
                    onClick={() => navigate(`/debts/${id}`)}
                    style={{
                        padding: "10px",
                        cursor: "pointer",
                        color: "white",
                        backgroundColor: "#1677ff",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Ko'rish
                </button>
            ),
        },
    ];

    return (
        <Table<DataType>
            columns={columns}
            dataSource={
                data?.data?.map((item, index) => ({ ...item, key: index })) ||
                []
            }
            rowKey="id"
        />
    );
};

export default TableCompts;
