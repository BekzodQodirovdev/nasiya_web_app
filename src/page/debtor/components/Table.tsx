import React from "react";
import { Image, Table } from "antd";
import type { TableProps } from "antd";
import { useGetAllDebtor } from "../service/useGetAlldebtor";
import { useNavigate } from "react-router-dom";

export interface DataType {
    address: string;
    created_at: string;
    debts: object[];
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
    const { data, isLoading } = useGetAllDebtor();
    const navigate = useNavigate();

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Full Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Image",
            dataIndex: "images",
            key: "images",
            render: (images) =>
                images?.length ? (
                    <Image
                        alt="img"
                        src={images[0].image}
                        style={{ width: "50px" }}
                    />
                ) : (
                    "No Image"
                ),
        },
        {
            title: "Add debts",
            key: "adddebts",
            dataIndex: "id",
            render: (id) => (
                <button onClick={() => navigate(`/debts/${id}`)}>
                    Add debts
                </button>
            ),
        },
    ];

    if (isLoading) return <p>Loading...</p>;

    return (
        <Table<DataType>
            columns={columns}
            dataSource={data?.data || []}
            rowKey="id"
        />
    );
};

export default TableCompts;
