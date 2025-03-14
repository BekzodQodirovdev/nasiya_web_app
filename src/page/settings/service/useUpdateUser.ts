import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: ({ data, id }: { data: any; id: string }) =>
            request.put(`/api/store/${id}`, data),
    });
};
