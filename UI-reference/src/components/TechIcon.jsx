export default function TechIcon({ icon, size = 20 }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={`#${icon.hex}`}
            aria-label={icon.title}
            className="opacity-80 hover:opacity-100 transition"
        >
            <path d={icon.path} />
        </svg>

    );
}
