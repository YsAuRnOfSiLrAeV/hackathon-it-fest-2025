type CvData = {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    summary: string;
    skills: string;
    education: string;
    experience: string;
    projects: string;
};

function TemplateB({ data, skills }: { data: CvData; skills: string[]; }) {
    return (
        <div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight">{data.fullName || "Your Name"}</h2>
                <div className="text-sm text-[#525252]">{data.email} | {data.phone}</div>
            </div>
            <div className="text-sm text-[#525252]">{data.location} · {data.website} · {data.github} · {data.linkedin}</div>
    
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
                <h3 className="mb-1 font-semibold">Experience</h3>
                <pre className="whitespace-pre-wrap wrap-break-word text-sm text-[#3f3f46]">{data.experience}</pre>
                <h3 className="mt-4 mb-1 font-semibold">Projects</h3>
                <pre className="whitespace-pre-wrap wrap-break-word text-sm text-[#3f3f46]">{data.projects}</pre>
            </div>
            <div>
                <h3 className="mb-1 font-semibold">Summary</h3>
                <p className="text-sm text-[#3f3f46] wrap-break-word">{data.summary}</p>
                <h3 className="mt-4 mb-1 font-semibold">Skills</h3>
                <ul className="list-inside list-disc text-sm text-[#3f3f46]">
                {skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <h3 className="mt-4 mb-1 font-semibold">Education</h3>
                <pre className="whitespace-pre-wrap wrap-break-word text-sm text-[#3f3f46]">{data.education}</pre>
            </div>
            </div>
        </div>
    );
}

export default TemplateB;