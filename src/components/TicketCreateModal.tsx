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
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        // contenedor modal
                        className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold">Nuevo ticket</h2>
                            <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Cerrar</button>
                        </div>

                        <TicketCreateForm onSuccess={onCreated} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
