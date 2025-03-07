import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

type getStatT = {
    code_status: number;
    message: string;
    data: {
        image: string;
        totalDebt: string;
        debtorCount: number;
        lateDebtsCount: number;
    };
};

export const useStatistics = () => {
    return useQuery({
        queryKey: ["user_statistics"],
        queryFn: () =>
            request
                .get<getStatT>(`/api/store/statistics`)
                .then((res) => res.data),
    });
};
