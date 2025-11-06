import { useCallback } from "react";

export interface CardHomeProps {
    curOpen: number;
    onCurOpen: React.Dispatch<React.SetStateAction<number>>;
    num: number;
    name: string;
    description: string;
    skills: string[];
}

export default function CardHome({ num, name, description, skills, curOpen, onCurOpen }: CardHomeProps) {
    const isActive = curOpen === num;

    const handleClick = useCallback(() => {
        onCurOpen((v) => (v === num ? -1 : num));
    }, [num, onCurOpen]);

    return (
        <div className="relative group" onClick={handleClick}>
            {isActive ? (
                <div className="relative flex w-full min-h-[200px] flex-col justify-evenly gap-0 rounded-3xl bg-[#85b9ea] py-4 px-4 duration-400 ease-linear hover:cursor-pointer">
                    <p className="text-sm font-normal text-gray-800">{description}</p>
                    <ul className="list-inside list-disc space-y-1 text-left text-sm font-medium text-gray-800">
                        {skills.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                        ))}
                    </ul>
                    <div className="absolute inset-0 -z-10 origin-center rotate-0 rounded-3xl bg-white transition-all duration-300 ease-out group-hover:rotate-[5deg]" />
                </div>
            ) : (
                <div className="relative flex w-full min-h-[200px] flex-col items-center justify-evenly gap-0 rounded-3xl bg-white py-5 px-12 duration-400 ease-linear hover:cursor-pointer">
                    <h3 className="text-center text-[20px] font-bold">{name}</h3>
                    <p className="mx-auto max-w-[34ch] text-center text-sm text-zinc-700">
                        {description}
                    </p>
                    <div className="absolute inset-0 -z-10 origin-center rotate-0 rounded-3xl bg-[#85b9ea] transition-all duration-300 ease-out group-hover:rotate-[5deg]" />
                </div>
            )}
        </div>
    );
}


