import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const usePostDebts = () => {
    return useMutation({
        mutationFn: (data: any) =>
            request.post(`/api/debts`, data).then((res) => res.data),
    });
};
