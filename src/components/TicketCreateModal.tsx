// src/components/dashboard/TicketCreateModal.tsx
'use client'

import { AnimatePresence, motion } from "framer-motion"
import TicketCreateForm from "./form/TicketCreateForm"

export default function TicketCreateModal({
    open,
    onClose,
    onCreated,
}: {
    open: boolean
    onClose: () => void
    onCreated: () => void
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    // backdrop
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        // modal container
                        className="w-full max-w-md rounded-2xl bg-[#10451d] text-white shadow-2xl border border-[#25a244]/60"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* header */}
                        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10">
                            <h2 className="text-lg font-semibold">
                                New ticket
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-sm text-white/80 hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        {/* body */}
                        <div className="px-5 pb-5 pt-3 bg-[#1a7431]/20 rounded-b-2xl">
                            <TicketCreateForm onSuccess={onCreated} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
