import CollectionSearchBar from "@components/Collection/CollectionSearchBar";
import Image from "next/image";

const SearchPage = () => {
    return (
        <main className="space-y-8">
            <section className="relative space-y-4 px-4 py-24 text-center">
                <Image
                    src="/images/dishes/search-collections-section-dish.jpg"
                    alt="Search recipes section dish"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center brightness-[.4]"
                    width={1000}
                    height={1000}
                />
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-4.5xl">
                    Find best Recipe Collection
                </h1>
                <p className="text-sm text-white lg:text-base">
                    Search the best recipe by recipe filter
                </p>
                <div className="w-full md:mx-auto md:w-4/5">
                    <CollectionSearchBar />
                </div>
            </section>
        </main>
    );
};

export default SearchPage;
