import { IconButton, TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RecipeFormSchema } from ".";

const IngredientsInput = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<RecipeFormSchema>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });
    const handleAppend = () =>
        append({ name: "", quantity: { num: 0, suffix: "" } });
    const handleRemove = (i: number) => remove(i);

    return (
        <section className="space-y-6">
            <h2 className="text-center text-2xl font-semibold leading-snug md:text-3xl">
                Ingredients used
            </h2>
            <div
                className="space-y-0 md:grid md:grid-cols-2 md:gap-x-12 lg:grid-cols-3"
                role="list"
            >
                {fields.map((field, index) => (
                    <div key={field.id} className="space-y-2 py-4">
                        <div className="col-span-3 flex items-center justify-between">
                            <p className="text-lg font-semibold text-orange">
                                Ingredient {index + 1}
                            </p>
                            <IconButton
                                color="error"
                                onClick={handleRemove.bind(null, index)}
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                {...register(`ingredients.${index}.name`)}
                                error={!!errors.ingredients?.[index]?.name}
                                helperText={
                                    errors.ingredients?.[index]?.name?.message
                                }
                                label={`Name`}
                                variant="standard"
                                placeholder="Flour"
                                className="col-span-2"
                            />
                            <TextField
                                {...register(
                                    `ingredients.${index}.quantity.num`,
                                )}
                                error={
                                    !!errors.ingredients?.[index]?.quantity?.num
                                }
                                helperText={
                                    errors.ingredients?.[index]?.quantity?.num
                                        ?.message
                                }
                                label="No"
                                placeholder="1"
                                variant="standard"
                            />
                            <TextField
                                {...register(
                                    `ingredients.${index}.quantity.suffix`,
                                )}
                                error={
                                    !!errors.ingredients?.[index]?.quantity
                                        ?.suffix
                                }
                                helperText={
                                    errors.ingredients?.[index]?.quantity
                                        ?.suffix?.message
                                }
                                label="Unit"
                                placeholder="cup"
                                variant="standard"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid place-content-center">
                <IconButton onClick={handleAppend} color="secondary">
                    <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
            </div>
        </section>
    );
};

export default IngredientsInput;
