import { capitalize } from "@utils/string";
import { v4 as uuidV4 } from "uuid";
import FilterCheckBox from "./FilterCheckbox";

type Props = {
    groupTitle: string;
    filterName: string;
    filters: string[] | { value: string; labelText: string }[];
};

const FilterGroup = ({ groupTitle, filterName, filters }: Props) => {
    return (
        <section className="space-y-3">
            <h2 className="font-semibold">{groupTitle}</h2>
            <ul className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4">
                {filters.map(filter =>
                    typeof filter === "string" ? (
                        <li key={uuidV4()}>
                            <FilterCheckBox
                                inputProps={{
                                    name: filterName,
                                    value: filter,
                                }}
                                labelText={capitalize(filter)}
                            />
                        </li>
                    ) : (
                        <li key={uuidV4()}>
                            <FilterCheckBox
                                inputProps={{
                                    name: filterName,
                                    value: filter.value,
                                }}
                                labelText={capitalize(filter.labelText)}
                            />
                        </li>
                    ),
                )}
            </ul>
        </section>
    );
};

export default FilterGroup;
