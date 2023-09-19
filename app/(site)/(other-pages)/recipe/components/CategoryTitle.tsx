type Props = {
    title: string;
};

const CategoryTitle = ({ title }: Props) => {
    return <h2 className="text-2xl font-semibold capitalize">{title}</h2>;
};

export default CategoryTitle;
