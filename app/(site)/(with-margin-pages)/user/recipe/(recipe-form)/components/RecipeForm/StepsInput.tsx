import { FormControl, FormHelperText, IconButton, Input } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TRecipeFormSchema } from "./formSchema";

const StepsInput = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<TRecipeFormSchema>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "steps",
    });
    const handleAppend = () => append({ step: "" });
    const handleRemove = (i: number) => remove(i);
    return (
        <section className="space-y-6">
            <h1 className="text-center text-2xl font-bold leading-snug md:text-3xl">
                Steps
            </h1>
            <ul className="space-y-6 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-6 md:space-y-0 xl:grid-cols-3">
                {fields.map((field, index) => (
                    <li key={field.id} className="flex flex-col">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-semibold text-orange">
                                Step {index + 1}
                            </p>
                            <IconButton
                                onClick={handleRemove.bind(null, index)}
                                color="error"
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <FormControl variant="standard" fullWidth>
                            <Input
                                {...register(`steps.${index}.step`)}
                                error={!!errors.steps?.[index]?.step}
                                placeholder="Preheat oven to 350 degrees"
                                multiline
                                rows={2}
                            />
                            <FormHelperText
                                error={!!errors.steps?.[index]?.step}
                            >
                                {errors.steps?.[index]?.step?.message}
                            </FormHelperText>
                        </FormControl>
                    </li>
                ))}
            </ul>
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

export default StepsInput;
