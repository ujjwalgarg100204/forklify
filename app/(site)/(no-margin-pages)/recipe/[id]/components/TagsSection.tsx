import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import grey from "@mui/material/colors/grey";
import type { Recipe } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

type Props = Pick<Recipe, "tags">;

const TagsSection = ({ tags }: Props) => {
    return (
        <section className="md:col-span-2">
            <ul className="flex flex-wrap gap-3">
                {tags.map(tag => (
                    <li
                        key={uuidV4()}
                        className="relative rounded-full bg-light-green px-3 py-1 text-sm text-white"
                    >
                        <IconButton
                            sx={{
                                backgroundColor: grey[900],
                                position: "absolute",
                                top: -4,
                                right: -4,
                                width: 16,
                                height: 16,
                                padding: 0.3,
                                "&:hover": {
                                    backgroundColor: grey[800],
                                },
                            }}
                            disableRipple
                        >
                            <CloseIcon
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    color: "white",
                                }}
                            />
                        </IconButton>
                        #{tag}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default TagsSection;
