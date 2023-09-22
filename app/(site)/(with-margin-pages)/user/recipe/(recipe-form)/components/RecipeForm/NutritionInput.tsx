import { InputAdornment, TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { RecipeFormSchema } from ".";

const NUTRITION = ["calories", "fat", "carbs", "protein"];

const NutritionInput = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<RecipeFormSchema>();
    const { fields } = useFieldArray({ control, name: "nutrition" });

    return (
        <section className="space-y-6">
            <h1 className="text-center text-2xl font-bold leading-snug md:text-3xl">
                Nutrition
            </h1>
            <ul className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-4">
                {fields.map((field, index) => (
                    <li key={field.id}>
                        <TextField
                            {...register(`nutrition.${index}.value`)}
                            error={!!errors.nutrition?.[index]?.value}
                            helperText={
                                errors.nutrition?.[index]?.value?.message
                            }
                            label={NUTRITION[index]}
                            InputLabelProps={{ className: "capitalize" }}
                            variant="standard"
                            placeholder="1 g"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        g
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default NutritionInput;
