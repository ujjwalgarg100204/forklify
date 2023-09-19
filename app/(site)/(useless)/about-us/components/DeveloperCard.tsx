import Image from "next/image";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";

type DeveloperCardProps = {
    name: string;
    desc: string;
    designation: string;
    imagePath: string;
    socials: {
        github: string;
        instagram: string;
        linkedin: string;
    };
};

const DeveloperCard = ({
    name,
    desc,
    designation,
    imagePath,
    socials,
}: DeveloperCardProps) => {
    return (
        <li className="max-w-[18rem] space-y-5 rounded-xl p-10 text-center shadow-xl transition-all hover:scale-105 hover:bg-[hsl(73,42%,97%)] hover:shadow-2xl">
            <Image
                src={imagePath}
                alt={name}
                className="mx-auto h-28 w-28 rounded-full object-cover object-center"
                height={50}
                width={50}
            />
            <div>
                <h3 className="text-xl font-[600]">{name}</h3>
                <p className="text-center text-xs italic">{designation}</p>
            </div>
            <p className="col-span-2 hidden text-center text-sm lg:block">
                {desc}
            </p>
            <ul className="flex justify-center gap-2 lg:gap-4">
                {Object.entries(socials).map(social => (
                    <li className="group" key={uuidV4()}>
                        <Link href={social[1]}>
                            <Image
                                src={`/images/socials/${social[0]}.png`}
                                alt={`${social[0]} link`}
                                className="h-6 w-6 transition hover:scale-110 lg:h-8 lg:w-8"
                                height={30}
                                width={30}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default DeveloperCard;
