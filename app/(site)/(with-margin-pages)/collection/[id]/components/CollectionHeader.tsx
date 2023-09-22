import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { RecipeCollection } from "@prisma/client";

type Props = {
    collection: Pick<RecipeCollection, "title" | "desc" | "avatar"> & {
        user: { image: string | null; name: string | null };
    };
};

const CollectionHeader = ({ collection }: Props) => {
    return (
        <section className="flex flex-col-reverse gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 flex-col justify-center gap-2 lg:gap-4">
                <h1 className="text-center text-2xl font-bold leading-snug md:text-left md:text-4xl lg:text-5xl">
                    {collection.title}
                </h1>
                <p className="text-sm lg:text-lg">{collection.desc}</p>
                <div className="flex items-center gap-3 pt-2 text-sm lg:text-base">
                    <Avatar
                        src={collection.user.image ?? undefined}
                        alt={collection.user.name ?? "Jane Doe"}
                        sx={{ width: { lg: 48 }, height: { lg: 48 } }}
                    />
                    <div className="flex flex-col">
                        <span>Created By -</span>
                        <span className="font-semibold text-orange">
                            {collection.user.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mx-auto lg:mr-16">
                <Avatar
                    src={collection.avatar ?? undefined}
                    alt={collection.title}
                    sx={{
                        bgcolor: orange[700],
                        width: { xs: 48, md: 72, lg: 96 },
                        height: { xs: 48, md: 72, lg: 96 },
                        fontSize: { xs: 24, md: 36, lg: 48 },
                    }}
                />
            </div>
        </section>
    );
};

export default CollectionHeader;
