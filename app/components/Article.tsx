import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
const Article = ({ children }: Props) => {
    return (
        <main className="h-full w-full bg-gray-100 px-0 py-0 sm:px-16 sm:py-16 md:px-32 lg:px-52 xl:px-64">
            <div className="mx-auto max-w-fit bg-white px-12 py-12 text-sm sm:rounded-2xl lg:text-base">
                {children}
            </div>
        </main>
    );
};

export default Article;
