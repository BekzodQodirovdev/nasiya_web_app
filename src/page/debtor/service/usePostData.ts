import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

const usePostData = () => {
    return useMutation({
        mutationFn: (data: any) =>
            request.post("/api/debtor", data).then((res) => res.data),
    });
};

export default usePostData;
