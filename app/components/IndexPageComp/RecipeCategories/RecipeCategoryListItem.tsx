import { FC, ReactNode } from "react";

import Link from "next/link";

type Props = {
    icon: ReactNode;
    category: string;
};
const RecipeCategoryListItem: FC<Props> = props => {
    return (
        <li className={"group text-center"}>
            <Link
                href={`/recipe/explore?#${props.category}`}
                className="space-y-2"
            >
                <div
                    className={
                        "rounded-full bg-orange p-8 shadow-[inset_-5px_5px_5px_rgba(255,255,255,0.5)] drop-shadow-xl transition duration-300 hover:shadow-xl hover:drop-shadow-2xl"
                    }
                >
                    {props.icon}
                </div>
                <p className={"font-[600] capitalize"}>{props.category}</p>
            </Link>
        </li>
    );
};

export default RecipeCategoryListItem;
