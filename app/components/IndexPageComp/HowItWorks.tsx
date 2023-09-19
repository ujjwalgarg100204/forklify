import { HOW_IT_WORKS_LIST_ITEMS } from "@/app/data";
import Button from "@mui/material/Button";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="container mx-auto space-y-10 px-8 text-white md:space-y-12 md:px-20"
        >
            <h1 className="text-center text-4xl font-bold text-green lg:text-6xl">
                How it works?
            </h1>
            <ol className="flex flex-col justify-center gap-12 md:flex-row">
                {HOW_IT_WORKS_LIST_ITEMS.map((item, i) => (
                    <li
                        key={uuidV4()}
                        className="relative space-y-2 text-center"
                    >
                        <div className="absolute inset-0 -top-8 -z-10 h-full w-full text-[12rem] font-bold tracking-widest text-light-yellow opacity-80">
                            {(i + 1).toString().padStart(2, "0")}
                        </div>
                        <h2 className="text-2xl font-bold text-green md:text-3xl">
                            {item.title}
                        </h2>
                        <p className="mx-auto w-64 text-green lg:w-96 lg:text-lg">
                            {item.desc}
                        </p>
                    </li>
                ))}
            </ol>
            <div className="hidden md:flex md:justify-center">
                <Button
                    variant="contained"
                    sx={{ px: "10%", borderRadius: 50 }}
                    color="secondary"
                    href={"/recipe/explore"}
                    LinkComponent={Link}
                >
                    Find Recipes
                </Button>
            </div>
        </section>
    );
};

export default HowItWorks;
