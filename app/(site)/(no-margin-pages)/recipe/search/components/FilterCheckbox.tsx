import { HTMLAttributes, InputHTMLAttributes } from "react";

import { v4 as uuidV4 } from "uuid";

type Props = {
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    labelProps?: HTMLAttributes<HTMLLabelElement>;
    labelText: string;
};

const FilterCheckBox = ({ labelText, inputProps, labelProps }: Props) => {
    const id = uuidV4();
    return (
        <div>
            <input
                {...inputProps}
                className="peer hidden"
                id={id}
                type="checkbox"
            />
            <label
                {...labelProps}
                htmlFor={id}
                className="cursor-pointer rounded-full border border-light-green px-2 py-1 text-xs text-light-green transition duration-300 hover:bg-light-green hover:text-white peer-checked:bg-light-green peer-checked:text-white sm:text-sm"
            >
                {labelText}
            </label>
        </div>
    );
};

export default FilterCheckBox;
