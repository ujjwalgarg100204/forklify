import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { RecipeCollection } from "@prisma/client";
import { truncWithEllipsis } from "@utils/string";
import Link from "next/link";

type Props = {
    collection: Pick<
        RecipeCollection,
        "id" | "avatar" | "desc" | "recipeIDs" | "title" | "createdAt"
    >;
};

const CollectionCard = ({ collection }: Props) => {
    return (
        <Link href={`/collection/${collection.id}`}>
            <article className="group relative flex w-64 cursor-pointer flex-col items-center justify-center gap-8 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl sm:w-72 md:w-[28rem] md:flex-row">
                <Avatar
                    src={collection.avatar ?? undefined}
                    alt={collection.title}
                    sx={{
                        bgcolor: orange[700],
                        width: { xs: 64 },
                        height: { xs: 64 },
                    }}
                />
                <section className="space-y-2 md:space-y-6">
                    <h3 className="text-lg font-semibold md:text-xl">
                        {truncWithEllipsis(collection.title, 40)}
                    </h3>
                    {collection.desc ? (
                        <p className="text-xs md:text-base">
                            {truncWithEllipsis(collection.desc, 80)}
                        </p>
                    ) : null}
                    <div className="flex justify-between">
                        <p>
                            <em className="text-base font-bold not-italic text-amber-600 underline md:text-lg">
                                {collection.recipeIDs.length}
                            </em>{" "}
                            recipes
                        </p>
                        <p>
                            {collection.createdAt.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                            })}
                        </p>
                    </div>
                </section>
            </article>
        </Link>
    );
};

export default CollectionCard;
