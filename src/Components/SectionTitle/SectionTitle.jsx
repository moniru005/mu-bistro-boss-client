
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center w-4/12 mx-auto z-50">
            <p className="text-yellow-500 text-xl mb-2">---{subHeading}---</p>
            <h3 className="text-3xl border-y-2 py-2">{heading}</h3>
        </div>
    );
};

export default SectionTitle;