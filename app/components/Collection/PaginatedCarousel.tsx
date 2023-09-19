"use client";

import { ChangeEvent, useState } from "react";

import Pagination from "@mui/material/Pagination";
import { RecipeCollection } from "@prisma/client";
import CollectionCard from "./CollectionCard";

type Props = {
    collections: Pick<
        RecipeCollection,
        "id" | "avatar" | "desc" | "recipeIDs" | "title" | "createdAt"
    >[];
};

const COLLECTION_TO_SHOW_PER_PAGE = 6;

const PaginatedCarousel = ({ collections }: Props) => {
    const [page, setPage] = useState(1);
    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const collectionsToShow = collections.slice(
        (page - 1) * COLLECTION_TO_SHOW_PER_PAGE,
        COLLECTION_TO_SHOW_PER_PAGE * page,
    );

    const noOfPages = Math.ceil(
        collections.length / COLLECTION_TO_SHOW_PER_PAGE,
    );

    return (
        <div className="space-y-12">
            <div role="list" className="flex flex-wrap justify-center gap-8">
                {collectionsToShow.map(collection => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </div>
            <section className="grid place-content-center">
                <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handlePageChange}
                />
            </section>
        </div>
    );
};

export default PaginatedCarousel;

function PaginationControlled() {}
