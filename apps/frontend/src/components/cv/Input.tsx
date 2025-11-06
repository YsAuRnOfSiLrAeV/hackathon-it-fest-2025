type InputProps = {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    required?: boolean;
}

function Input({ label, value, onChange, type = "text", required = false }: InputProps) {
    return (
        <label className="text-sm">
        <span className="mb-1 block text-zinc-700">{label}{required ? " *" : ""}</span>
        <input
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-0 focus:border-zinc-900"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            required={required}
        />
        </label>
    );
}

export default Input;