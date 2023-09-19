"use client";

import type {
    AutocompleteChangeReason,
    AutocompleteInputChangeReason,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
} from "@mui/material";
import type {
    HTMLAttributes,
    JSXElementConstructor,
    ReactNode,
    SyntheticEvent,
} from "react";

import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";

export type Props<Data> = {
    onSelection: (
        ev: SyntheticEvent<Element, Event>,
        data: Data | null,
        reason: AutocompleteChangeReason,
    ) => void;
    inputVal: string;
    onInputChange: (
        ev: SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason,
    ) => void;
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    renderOption: (
        props: HTMLAttributes<HTMLLIElement>,
        option: Data,
        state: AutocompleteRenderOptionState,
        ownerState: any,
    ) => ReactNode;
    getOptionLabel: (option: Data) => string;
    noOptionsText: string;
    options: Data[];
};

const SearchBar = <Data,>(props: Props<Data>) => {
    const handleRenderingOfOptionContainer: JSXElementConstructor<
        HTMLAttributes<HTMLElement>
    > = ({ children }) => {
        return (
            <div className="mt-4 rounded-2xl border-2 border-orange bg-white">
                {children}
            </div>
        );
    };

    return (
        <div className="relative mx-auto flex items-center gap-4 rounded-2xl bg-white px-4 py-4">
            <SearchIcon
                className="text-orange"
                sx={{
                    fontSize: 32,
                    display: { xs: "none", sm: "block" },
                }}
            />
            <Autocomplete<Data>
                className="flex-1"
                inputMode="search"
                inputValue={props.inputVal}
                getOptionLabel={props.getOptionLabel}
                options={props.options}
                noOptionsText={
                    <div className="text-center text-orange">
                        {props.noOptionsText}
                    </div>
                }
                onChange={props.onSelection}
                onInputChange={props.onInputChange}
                renderInput={props.renderInput}
                renderOption={props.renderOption}
                PaperComponent={handleRenderingOfOptionContainer}
                includeInputInList
                filterSelectedOptions
                autoComplete
            />
        </div>
    );
};

export default SearchBar;
