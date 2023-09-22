import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className="my-16 space-y-12 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
            {children}
        </main>
    );
};

export default Layout;
