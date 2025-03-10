import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { DataType } from "../../debtor/components/Table";

export const useGetOneDebtor = (userId: string) => {
    return useQuery({
        queryKey: ["one_debtor_", userId],
        queryFn: () =>
            request
                .get<{ data: DataType; message: string; status_code: number }>(
                    `/api/debtor/${userId}`
                )
                .then((res) => res.data),
    });
};
