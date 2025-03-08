import React, { useEffect } from "react";
import { Button, Form, Input, Space, Upload, Image } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import useFileUpload from "./service/useFileUpload";
import usePostData from "./service/usePostData";
import { useNavigate } from "react-router-dom";
import type { UploadFile, UploadProps } from "antd";

export const NewDebtor = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState("");
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    useEffect(() => {
        form.setFieldsValue({ phone_numbers: [""] });
    }, [form]);

    const { mutate: uploadFiles } = useFileUpload();
    const { mutate: postData } = usePostData();

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

    const onFinish = (values: any) => {
        if (fileList.length !== 2) {
            toast.error("2 images must be uploaded", {
                position: "top-center",
            });
            return;
        }

        const formData = new FormData();
        fileList.forEach((file) => {
            if (!file.originFileObj) return;
            formData.append("files", file.originFileObj as Blob, file.name);
        });

        uploadFiles(formData, {
            onSuccess: (filePath) => {
                const images = filePath.map(
                    (item: {
                        path: string;
                        filename: string;
                        originalname: string;
                    }) => item.path
                );
                postData(
                    { ...values, images },
                    {
                        onSuccess: (response: any) => {
                            toast.success(response?.message, {
                                position: "top-center",
                            });
                            navigate("/debtor");
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
                toast.error(err?.response?.data?.error?.message);
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
        >
            <Form.Item
                name="full_name"
                label="Ismi"
                rules={[{ required: true, message: "Ism kiritilishi shart!" }]}
            >
                <Input />
            </Form.Item>

            <Form.List name="phone_numbers">
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field) => (
                            <Form.Item
                                key={field.key}
                                style={{ marginBottom: "5px" }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Telefon raqam majburiy!",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Telefon raqami" />
                                    </Form.Item>

                                    {fields.length > 1 && (
                                        <MinusCircleOutlined
                                            style={{
                                                color: "red",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => remove(field.name)}
                                        />
                                    )}
                                </div>
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                                style={{ width: "100%" }}
                            >
                                Raqam qo'shish
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item
                name="address"
                label="Yashash manzili"
                rules={[
                    { required: true, message: "Manzil kiritilishi shart!" },
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
