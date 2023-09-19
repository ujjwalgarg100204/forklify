import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CollectionCard from "@components/Collection/CollectionCard";
import { prisma } from "@utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { COLLECTION_SELECTOR } from "../../../(other-pages)/collection/explore/page";

const UserCollectionsPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    // get all collections of user
    const collections = await prisma.recipeCollection.findMany({
        where: { userID: session.user.id },
        select: COLLECTION_SELECTOR,
    });

    return (
        <>
            <h1 className="text-center text-4.5xl font-bold leading-snug md:text-5xl">
                Your Collections 📂
            </h1>
            {collections.length === 0 ? (
                <section className="text-center text-lg">
                    <p>
                        Oops... You gotta create a recipe collection for that
                        before you can see some here...🤩
                    </p>
                    <p className="font-bold text-orange">So get cooking 🍳</p>
                </section>
            ) : null}

            <section className="mx-auto flex flex-wrap justify-between gap-16 gap-y-12 px-12">
                {collections.map(collection => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </section>
        </>
    );
};

export default UserCollectionsPage;
