import Section from "./Section";

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

function TemplateA({ data, skills }: { data: CvData; skills: string[]; }) {
    return (
        <div>
            <h2 className="text-2xl font-bold">{data.fullName || "Your Name"}</h2>
            <div className="text-sm text-[#525252]">{data.location} · {data.email} · {data.phone}</div>
            <div className="text-sm text-[#525252]">{data.website} · {data.github} · {data.linkedin}</div>
    
            <div className="mt-4">
                <h3 className="font-semibold">Summary</h3>
                <p className="text-sm text-[#3f3f46] wrap-break-word">{data.summary}</p>
            </div>
            <div className="mt-3">
                <h3 className="font-semibold">Skills</h3>
                <div className="mt-1 flex flex-wrap">
                    {skills.map((s) => <span key={s} className="badge mr-2 mb-2 rounded-full bg-[#f4f4f5] px-3 py-1 text-xs">{s}</span>)}
                </div>
            </div>
            <Section title="Experience" text={data.experience} />
            <Section title="Projects" text={data.projects} />
            <Section title="Education" text={data.education} />
        </div>
    );
}

export default TemplateA;