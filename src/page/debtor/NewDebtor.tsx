import React, { useEffect } from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useFileUpload } from "./service/useFileUpload";

interface SubmitButtonProps {
    form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children,
}) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const NewDebtor = () => {
    const [form] = Form.useForm();

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState("");
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
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

    useEffect(() => {
        form.setFieldsValue({ phone_numbers: [""] });
    }, [form]);
    const { mutate, isPending } = useFileUpload();
    const onFinish = (values: any) => {
        console.log("Received values of form:", values);
        console.log("File List:", fileList);

        mutate(fileList, {
            onSuccess: (filePath) => {
                console.log(filePath);
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            form={form}
            variant="outlined"
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="full_name"
                label="Ismi"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.List name="phone_numbers">
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0
                                    ? formItemLayout
                                    : formItemLayoutWithOutLabel)}
                                label={index === 0 ? "Telefon raqami" : ""}
                                required={true}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "phone is required",
                                            whitespace: true,
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input style={{ width: "60%" }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: "50%" }}
                                icon={<PlusOutlined />}
                            >
                                Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item
                name="address"
                label="Yashash manzili"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={"description"} label="Eslatma">
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
                    <SubmitButton form={form}>Submit</SubmitButton>
                    <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
