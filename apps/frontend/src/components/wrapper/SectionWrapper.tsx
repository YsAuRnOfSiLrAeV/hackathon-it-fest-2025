type SectionWrapperProps = {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

function SectionWrapper({ id, className="", children }: SectionWrapperProps) {
    return (
        <section id={id} className={`w-full pb-16 lg:pb-8 pt-16 md:pt-20 px-4 sm:px-6 lg:px-12 xl:px-40 ${className}`}>
            {children}
        </section>
    );
}

export default SectionWrapper;