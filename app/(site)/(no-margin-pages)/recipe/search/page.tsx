"use client";

import Card from "@components/Recipe/RecipeCards/WithAction/Card";
import { RecipeActionCardPayload } from "@components/Recipe/RecipeCards/WithAction/RecipeActions/apiSelector";
import RecipeSearchBar from "@components/Recipe/RecipeSearchBar";
import Carousel from "@components/UI/Carousel";
import CarouselItem from "@components/UI/Carousel/CarouselItem";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { average } from "@utils/array";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import FilterSection from "./components/FilterSection";

const SearchPage = () => {
    const [results, setResults] = useState<RecipeActionCardPayload[]>([]);
    const handleAddResults = (res: RecipeActionCardPayload[]) =>
        setResults(res);
    const recipesWithRating = results.map(recipe => ({
        ...recipe,
        rating: average(recipe.comments.map(comment => comment.rating)),
    }));
    return (
        <main className="mb-12 space-y-8">
            <section className="relative space-y-4 px-4 py-16 text-center">
                <Image
                    src="/images/dishes/search-recipes-section-dish.jpg"
                    alt="Search recipes section dish"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center brightness-[.4]"
                    width={1000}
                    height={1000}
                />
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-4.5xl">
                    Find best recipe
                </h1>
                <p className="text-sm text-white lg:text-base">
                    Search the best recipe by recipe filter
                </p>
                <div className="w-full md:mx-auto md:w-4/5">
                    <RecipeSearchBar />
                </div>
            </section>
            <FilterSection onFetchResults={handleAddResults} />
            <hr className="border-orange" />
            {results.length > 0 ? (
                <section className="mx-auto h-full space-y-8 px-8">
                    <h1 className="text-left text-2xl font-bold text-green md:text-3xl lg:text-5xl">
                        Results
                    </h1>
                    <Carousel
                        naturalSlideHeight={13}
                        naturalSlideWidth={10}
                        totalSlides={results.length}
                        backButton={<WestRoundedIcon className="text-2xl" />}
                        frontButton={<EastRoundedIcon className="text-2xl" />}
                        isPlaying
                    >
                        {recipesWithRating.map((recipe, i) => (
                            <CarouselItem index={i} key={uuidV4()}>
                                <div className="p-4">
                                    <Card recipe={recipe} />
                                </div>
                            </CarouselItem>
                        ))}
                    </Carousel>
                </section>
            ) : null}
        </main>
    );
};

export default SearchPage;
