import { Chip, IconButton, ListItem, TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuidV4 } from "uuid";
import { RecipeFormSchema } from ".";

const TagsInput = () => {
    const {
        control,
        watch,
        register,
        formState: { errors },
    } = useFormContext<RecipeFormSchema>();
    const { fields, append, remove } = useFieldArray({ control, name: "tags" });
    const handleAppend = () => append({ tag: "" });
    const handleRemove = (i: number) => remove(i);
    return (
        <section className="space-y-6">
            <h1 className="text-center text-2xl font-bold leading-snug md:text-3xl">
                Recipe Tags
            </h1>
            <ul className="m-0 flex flex-wrap justify-start gap-2 rounded-lg p-2 shadow-md">
                {watch("tags").map(({ tag }, index) => (
                    <ListItem
                        key={uuidV4()}
                        className="max-w-fit"
                        sx={{ padding: 0 }}
                    >
                        <Chip
                            label={`#${tag}`}
                            onDelete={handleRemove.bind(null, index)}
                            sx={{
                                backgroundColor: "#606C38",
                                color: "white",
                                // margin: 0,
                                "&:hover": {
                                    backgroundColor: "#283618",
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </ul>
            <div
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                role="list"
            >
                {fields.map((field, index) => (
                    <TextField
                        key={field.id}
                        {...register(`tags.${index}.tag`)}
                        error={!!errors.tags?.[index]?.tag}
                        helperText={errors.tags?.[index]?.tag?.message}
                        label={`Tag ${index + 1}`}
                        placeholder="#best"
                    />
                ))}
            </div>
            <div className="grid place-content-center">
                <IconButton
                    onClick={handleAppend}
                    color="secondary"
                    size="medium"
                >
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
            </div>
        </section>
    );
};

export default TagsInput;
