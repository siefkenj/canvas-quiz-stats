import React from "react";

/** Keep a `<dialog>` shown as a modal exactly while `open` is true. */
export function useModal(ref: React.RefObject<HTMLDialogElement>, open: boolean) {
    React.useEffect(() => {
        const d = ref.current;
        if (d && open && !d.open) {
            d.showModal();
        } else if (d && !open && d.open) {
            d.close();
        }
    }, [open]);
}
