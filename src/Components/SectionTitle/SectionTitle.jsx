
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center w-4/12 mx-auto z-50">
            <p className="text-yellow-500 text-base lg:text-xl mb-2">---{subHeading}---</p>
            <h3 className=" text-xl lg:text-3xl font-medium border-y-2 py-2">{heading}</h3>
        </div>
    );
};

export default SectionTitle;