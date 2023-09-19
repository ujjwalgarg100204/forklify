import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Title = ({ children }: Props) => {
    return (
        <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
            {children}
        </h1>
    );
};

export default Title;
