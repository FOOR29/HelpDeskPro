// app/page.tsx (Home)

"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#10451d] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left side: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white space-y-5"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#25a244] text-white/90 uppercase tracking-wide">
            HelpDeskPro
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Centralize and track your{" "}
            <span className="text-[#a3f7b5]">support tickets</span> in one place.
          </h1>

          <p className="text-sm md:text-base text-[#d2f4d3] max-w-md">
            HelpDeskPro helps clients create tickets and agents manage them with clear
            status, priorities and response history. Built with Next.js, Prisma and
            role‑based access.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold bg-[#25a244] hover:bg-[#1a7431] text-white shadow-md transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-semibold border border-white/60 text-white hover:bg-white/10 transition-colors"
            >
              Register
            </Link>
          </div>
        </motion.div>

        {/* Right side: simple animated card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="hidden md:flex justify-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm rounded-2xl bg-white/95 shadow-2xl border border-[#25a244]/40 p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#10451d]">
                Live ticket overview
              </h2>
              <span className="text-[10px] px-2 py-1 rounded-full bg-[#25a244]/10 text-[#25a244] font-semibold uppercase tracking-wide">
                Demo
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <FakeTicketRow title="VPN not working" status="OPEN" priority="HIGH" />
              <FakeTicketRow title="Email setup" status="IN_PROGRESS" priority="MEDIUM" />
              <FakeTicketRow title="Access to CRM" status="RESOLVED" priority="LOW" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

function FakeTicketRow({
  title,
  status,
  priority,
}: {
  title: string
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED"
  priority: "LOW" | "MEDIUM" | "HIGH"
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#25a244]/30 bg-[#f0fdf4] px-3 py-2">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-[#10451d]">{title}</span>
        <span className="text-[10px] text-gray-500">HelpDeskPro · Support</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a7431]/10 text-[#1a7431] font-semibold uppercase tracking-wide">
          {status}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25a244]/10 text-[#25a244] font-semibold uppercase tracking-wide">
          {priority}
        </span>
      </div>
    </div>
  )
}
