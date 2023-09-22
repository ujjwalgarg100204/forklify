import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-start gap-8 text-center text-white">
            <div className={"absolute inset-0 -z-10 flex h-full w-full"}>
                <Image
                    src="/images/dishes/hero-section-dish.jpg"
                    alt="background image"
                    className="block h-full w-full object-cover object-right brightness-[.3] sm:object-center"
                    fill={true}
                    sizes="(max-width: 768px) 100px, (max-width: 1200px) 1000px"
                />
            </div>
            <h1 className="text-4xl font-bold lg:text-6xl">
                Stop waiting your <br />
                <span className="text-light-orange">time</span> while thinking{" "}
                <br />
                what <span className="text-light-orange">to cook...</span>
            </h1>
            <p className="text-base lg:text-lg">
                Find your perfect dish and cook it <br />
                simply and quickly!
            </p>
            <Button
                variant="contained"
                sx={{ px: "10%", borderRadius: 50 }}
                color="secondary"
                href="/recipe/explore"
                LinkComponent={Link}
            >
                Find Recipes
            </Button>
            <IconButton href="#explore-section">
                <KeyboardArrowDownRoundedIcon
                    className="animate-bounce text-white"
                    sx={{ fontSize: { lg: 48 } }}
                />
            </IconButton>
        </div>
    );
};

export default HeroSection;
