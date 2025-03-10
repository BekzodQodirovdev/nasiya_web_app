import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { DebtsType } from "../components/Table";

export const useGetOneDebts = (id: string) => {
    return useQuery({
        queryKey: ["one_debts_", id],
        queryFn: () =>
            request
                .get<{
                    status_code: number;
                    message: string;
                    data: DebtsType[];
                }>(`/api/debts`)
                .then((res) => res.data),
    });
};
