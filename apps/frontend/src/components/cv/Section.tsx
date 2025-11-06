function Section({ title, text }: { title: string; text: string; }) {
    return (
        <div className="mt-3">
            <h3 className="font-semibold">{title}</h3>
            <pre className="whitespace-pre-wrap wrap-break-word text-sm text-[#3f3f46]">{text}</pre>
        </div>
    );
}

export default Section;