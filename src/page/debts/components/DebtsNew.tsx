import React from "react";
import { Button, Form, Input, Space, Upload, Image, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import useFileUpload from "../../debtor/service/useFileUpload";
import { toast } from "react-toastify";
import { usePostDebts } from "../service/usePostDebts";
import { useNavigate, useParams } from "react-router-dom";

const DebtsNew = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState("");
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview && file.originFileObj) {
            file.preview = (await getBase64(file.originFileObj)) as string;
        }
        setPreviewImage(file.url || file.preview || "");
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const getBase64 = (file: File) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const { mutate: FileUpload } = useFileUpload();
    const { mutate: postDebts } = usePostDebts();

    const onFinish = (values: any) => {
        if (fileList.length !== 2) {
            toast.error("2 images must be uploaded", {
                position: "top-center",
            });
            return;
        }
        console.log(values);

        const formData = new FormData();
        fileList.forEach((file) => {
            if (!file.originFileObj) return;
            formData.append("files", file.originFileObj as Blob, file.name);
        });

        FileUpload(formData, {
            onSuccess: (filePath) => {
                const images = filePath.map(
                    (item: {
                        path: string;
                        filename: string;
                        originalname: string;
                    }) => item.path
                );
                postDebts(
                    { ...values, images, debtor: id },
                    {
                        onSuccess: (response) => {
                            toast.success(response?.message, {
                                position: "top-center",
                            });
                            navigate(`/debts/${id}`);
                        },
                        onError: (err: any) => {
                            toast.error(err?.response?.data?.error?.message, {
                                position: "top-center",
                            });
                        },
                    }
                );
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.error?.message, {
                    position: "top-center",
                });
            },
        });
    };

    return (
        <Form
            form={form}
            name="debtor_form"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            style={{ width: "50%" }}
            initialValues={{
                debt_period: "Qarz muddatini tanlang",
            }}
        >
            <Form.Item
                name="debt_period"
                label="Keying ito'lovni"
                rules={[
                    {
                        required: true,
                        message: "Keying ito'lovni kiritilishi shart!",
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 1, label: "1 oy" },
                        { value: 2, label: "2 oy" },
                        { value: 3, label: "3 oy" },
                        { value: 4, label: "4 oy" },
                        { value: 5, label: "5 oy" },
                        { value: 6, label: "6 oy" },
                        { value: 7, label: "7 oy" },
                        { value: 8, label: "8 oy" },
                        { value: 9, label: "9 oy" },
                        { value: 10, label: "10 oy" },
                        { value: 11, label: "11 oy" },
                        { value: 12, label: "12 oy" },
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="debt_sum"
                label="Summa miqdori"
                rules={[
                    {
                        required: true,
                        message: "Summa miqdorini kiritilishi shart!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label="Eslatma"
                rules={[
                    { required: true, message: "Eslatma kiritilishi shart!" },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
                accept=".jpeg,.jpg,.png,.svg"
            >
                {fileList.length >= 2 ? null : uploadButton}
            </Upload>

            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}

            <Form.Item style={{ paddingTop: "20px" }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default DebtsNew;
