type TextareaProps = {
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
}

function Textarea({ label, value, onChange, rows = 4 }: TextareaProps) {
    return (
        <label className="block text-sm">
            <span className="mb-1 block text-zinc-700">{label}</span>
            <textarea
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-0 focus:border-zinc-900"
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
}

export default Textarea;