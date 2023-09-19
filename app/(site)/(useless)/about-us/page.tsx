import Article from "@components/Article";
import { v4 as uuidV4 } from "uuid";
import DeveloperCard from "./components/DeveloperCard";

const DEVELOPERS_PROFILES = [
    {
        name: "Ujjwal Garg",
        desc: "Just some developer, who wants to do some good",
        designation: "Main Developer",
        imagePath: "/images/devs/ujjwal.png",
        socials: {
            github: "https://github.com/ujjwalgarg100204",
            instagram: "https://instagram.com/ujjwalgarg100204",
            linkedin: "https://www.linkedin.com/in/ujjwal-garg-3a5639243",
        },
    },
    {
        name: "Harsh Agrawal",
        desc: "Just some developer, who wants to do some good",
        designation: "Developer",
        imagePath: "/images/devs/harsh.jpg",
        socials: {
            github: "https://github.com/Harsh-agrawal369",
            instagram:
                "https://instagram.com/harsh_agrawal27?igshid=ZDdkNTZiNTM=",
            linkedin: "https://www.linkedin.com/in/harsh-agrawal-a00968225",
        },
    },
    {
        name: "Naman Rath",
        desc: "Just some developer, who wants to do some good",
        designation: "Developer",
        imagePath: "/images/devs/naman.jpeg",
        socials: {
            github: "https://github.com/namanrath007",
            instagram: "https://instagram.com/naman_rath07?igshid=ZDdkNTZiNTM=",
            linkedin: "https://www.linkedin.com/in/naman-rath-260a32247/",
        },
    },
];

const AboutUsPage = () => {
    return (
        <Article>
            <h1 className="font-heading mb-12 text-center text-3xl font-bold lg:text-4xl">
                About Us
            </h1>
            <section className="mb-12 space-y-4">
                <p className={"text-justify"}>
                    Welcome to Forklify, the ultimate online community for food
                    lovers and home cooks!
                </p>
                <p className={"text-justify"}>
                    Our website is dedicated to sharing delicious recipes,
                    cooking tips, and culinary inspiration with like-minded
                    individuals around the world. At Forklify, we believe that
                    food is more than just fuel for our bodies. Food brings
                    people together, sparks creativity, and nourishes the soul.
                    That&apos;s why we&apos;re passionate about creating a
                    platform where food lovers from all walks of life can come
                    together to share their love of cooking and eating.So come
                    join us at Forklify and start exploring our collection of
                    delicious recipes, engaging with other foodies, and taking
                    your culinary skills to the next level. We can&apos;t wait
                    to see what you cook up!
                </p>
            </section>

            <section className="space-y-12">
                <h1 className="font-heading text-center text-2xl font-bold">
                    Meet The Team
                </h1>
                <ul className="mx-auto flex flex-col flex-wrap items-center justify-center gap-2 lg:flex-row lg:gap-4">
                    {DEVELOPERS_PROFILES.map(dev => (
                        <DeveloperCard key={uuidV4()} {...dev} />
                    ))}
                </ul>
            </section>
        </Article>
    );
};

export default AboutUsPage;
