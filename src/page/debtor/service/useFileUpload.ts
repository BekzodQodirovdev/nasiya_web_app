import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

const useFileUpload = () => {
    return useMutation({
        mutationFn: (data: any) =>
            request
                .post("/api/upload", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};

export default useFileUpload;
