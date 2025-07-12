import Link from "next/link";
import { subCategoryUrls } from "../../../config";

export function BreadCrumbs({ baseUrl }) {
    const parts = baseUrl
        .split("/")
        .filter(Boolean); // удаляем пустые строки

    const crumbs = [
        { href: "/", label: "Головна" },
        ...parts.map((part, index) => {
            const href = "/" + parts.slice(0, index + 1).join("/");
            const label = subCategoryUrls[part] || decodeURIComponent(part);
            return { href, label };
        })
    ];

    return (
        <ol style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2px", listStyle: "none", padding: 0, margin: 0 }}>
            {crumbs.map((crumb, index) => (
                <li key={`breadcrumbs-${index}`} style={{ display: "flex", alignItems: "center" }}>
                    <Link href={crumb.href}>
                        <span style={{ textDecoration: "none", color: "var(--orange)" }}>{crumb.label}</span>
                    </Link>
                    {index < crumbs.length - 1 && (
                        <span style={{ margin: "0 8px", color: "#888" }}>/</span>
                    )}
                </li>
            ))}
        </ol>
    );
}
