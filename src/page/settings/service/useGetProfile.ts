import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { userData } from "../Settings";

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () =>
            request.get<userData>("/api/auth/profile").then((res) => res.data),
    });
};
