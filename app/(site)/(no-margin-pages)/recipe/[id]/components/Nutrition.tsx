import { Recipe } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

type Props = Partial<NonNullable<Recipe["nutrition"]>>;

const Nutrition = (props: Props) => {
    return (
        <section className="space-y-3 md:justify-self-start">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Nutrition per serving
            </h1>
            <ul className="flex justify-start divide-x-2 divide-light-orange">
                {Object.entries(props)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => (
                        <li
                            key={uuidV4()}
                            className="flex w-full flex-col gap-1 text-center md:px-4 md:first:pl-0 lg:px-8 lg:text-lg"
                        >
                            <p className="capitalize text-gray-800">{key}</p>
                            <p className="font-semibold text-orange">
                                {value} g
                            </p>
                        </li>
                    ))}
            </ul>
        </section>
    );
};

export default Nutrition;
