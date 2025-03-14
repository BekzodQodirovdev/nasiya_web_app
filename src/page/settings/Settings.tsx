import type { FormProps, UploadFile } from "antd";
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Typography,
    Upload,
    Avatar,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetProfile } from "./service/useGetProfile";
import { useUpdateUser } from "./service/useUpdateUser";
import useFileUpload from "../debtor/service/useFileUpload";
import { toast } from "react-toastify";
import { loadState, saveState } from "../../config/storage";

type FieldType = {
    full_name?: string;
    phone_number?: string;
};

export const SettingsPage = () => {
    const { data } = useGetProfile();
    const { mutate: uploadFile } = useFileUpload();
    const { mutate } = useUpdateUser();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [file, setFile] = useState<UploadFile | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (data?.data) {
            setImageUrl(data.data.image);
            form.setFieldsValue({
                full_name: data.data.full_name,
                phone_number: data.data.phone_number,
            });
        }
    }, [data]);

    const handleUpload = (info: any) => {
        const file = info.file;
        if (file && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setFile(file);
        } else {
            console.error("Yuklangan fayl rasm emas!");
        }
    };

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        if (!data?.data?.id)
            return console.error("Foydalanuvchi ID topilmadi!");

        const formData = new FormData();
        if (file) {
            formData.append("files", file as any);

            uploadFile(formData, {
                onSuccess: (filePath) => {
                    mutate(
                        {
                            data: {
                                ...values,
                                image: filePath[0]?.path,
                            },
                            id: data.data.id,
                        },
                        {
                            onSuccess: (response: any) => {
                                const userLoad = loadState("user");
                                const storePayload = {
                                    ...userLoad,
                                    store: response?.data?.data,
                                };
                                saveState("user", storePayload);
                                toast.success(response?.data?.message, {
                                    position: "top-center",
                                });
                            },
                            onError: (err: any) => {
                                toast.error(
                                    err?.response?.data?.error?.message,
                                    {
                                        position: "top-center",
                                    }
                                );
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
        } else {
            mutate(
                { data: { ...values, image: imageUrl }, id: data.data.id },
                {
                    onSuccess: (response: any) => {
                        const userLoad = loadState("user");
                        const storePayload = {
                            ...userLoad,
                            store: response?.data?.data,
                        };
                        saveState("user", storePayload);
                        toast.success(response?.data?.message, {
                            position: "top-center",
                        });
                    },
                    onError: (err: any) => {
                        toast.error(err?.response?.data?.error?.message, {
                            position: "top-center",
                        });
                    },
                }
            );
        }
    };

    return (
        <Row justify="center" align="middle">
            <Col
                xs={24}
                sm={16}
                md={12}
                lg={8}
                style={{
                    width: "100%",
                    maxWidth: 600,
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                <Typography.Title level={3}>Sozlamalar</Typography.Title>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                        size={100}
                        src={imageUrl || "https://via.placeholder.com/100"}
                    />
                    <Upload
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleUpload}
                    >
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: "white",
                                borderRadius: "50%",
                                padding: "5px",
                                cursor: "pointer",
                                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                            }}
                        >
                            <EditOutlined style={{ fontSize: 16 }} />
                        </div>
                    </Upload>
                </div>

                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Ismi familiya"
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: "Ismi familiya kiritish shart",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Telefon raqam"
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: "Telefon raqam kiritish shart",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
