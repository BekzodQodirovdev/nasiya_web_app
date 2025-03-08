import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { DataType } from "../components/Table";

export const useGetAllDebtor = () => {
    return useQuery({
        queryKey: ["all_debtor"],
        queryFn: () =>
            request
                .get<{
                    status_code: number;
                    message: string;
                    data: DataType[] | [];
                }>("/api/debtor")
                .then((res) => res.data),
    });
};
