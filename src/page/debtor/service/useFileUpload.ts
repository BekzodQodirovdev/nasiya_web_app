import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useFileUpload = () => {
    return useMutation({
        mutationFn: (data: any) =>
            request.post("/api/upload", data).then((res) => res.data),
    });
};
