/** Small inline icons (stroke-based, 16px, coloured by `currentColor`). */
import React from "react";

function Icon({ children }: { children: React.ReactNode }) {
    return (
        <svg
            className="icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export const DownloadIcon = () => (
    <Icon>
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M5 21h14" />
    </Icon>
);

export const CopyIcon = () => (
    <Icon>
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </Icon>
);

export const RefreshIcon = () => (
    <Icon>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 3v6h-6" />
    </Icon>
);

export const ChevronDownIcon = () => (
    <Icon>
        <path d="M6 9l6 6 6-6" />
    </Icon>
);

export const FileIcon = () => (
    <Icon>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6" />
    </Icon>
);

export const PlusIcon = () => (
    <Icon>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </Icon>
);

export const SparkleIcon = () => (
    <Icon>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
    </Icon>
);

export const ArrowUpIcon = () => (
    <Icon>
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
    </Icon>
);

export const ArrowDownIcon = () => (
    <Icon>
        <path d="M12 5v14" />
        <path d="M6 13l6 6 6-6" />
    </Icon>
);

export const TrashIcon = () => (
    <Icon>
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M6 7l1 13h10l1-13" />
        <path d="M9 7V4h6v3" />
    </Icon>
);
