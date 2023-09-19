"use client";

import type { ReactNode } from "react";
import { SWRConfig } from "swr/_internal";
import { fetcher } from "../utils/api";

type Props = { children: ReactNode };

const SWRProvider = ({ children }: Props) => {
    return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default SWRProvider;
