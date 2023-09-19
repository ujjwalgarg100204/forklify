import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="grid grid-cols-2 justify-items-center gap-8 bg-green p-12 text-sm text-white sm:text-base md:grid-cols-3">
            <Link href="/" className="col-span-2 mx-auto md:col-auto">
                <Image
                    src={"/images/logo/logo.svg"}
                    alt={"logo"}
                    className={"h-32 w-32 object-cover lg:h-40 lg:w-40"}
                    height={100}
                    width={100}
                />
            </Link>
            <ul className="flex flex-col space-y-2">
                <Link href="/recipe/popular">Popular Recipes</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/#how-it-works">How it Works</Link>
                <Link href="/recipe/explore">Recipes</Link>
                <Link href="/collection/explore">Recipe Collections</Link>
            </ul>
            <ul className="flex flex-col space-y-2">
                <Link href="/recipe/search">Explore Recipes</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/conditions">Conditions</Link>
            </ul>
        </footer>
    );
};

export default Footer;
