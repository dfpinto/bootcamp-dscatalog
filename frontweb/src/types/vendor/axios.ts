import { Method } from "axios";

export type AxiosParams = {
    method?: Method; // quando não informato assume GET
    url: string;
    data?: object;
    params?: object;
}