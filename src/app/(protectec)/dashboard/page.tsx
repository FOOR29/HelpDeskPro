// app/(protectec)/dashboard/page.tsx

import { auth } from "@/src/auth"
import ClientDashboard from "@/src/components/ClientDashboard"
import { db } from "@/src/lib/db"

const ClientPage = async () => {
    // get the authenticated user session
    const session = await auth()
    if (!session) {
        return <div>Not authenticated</div>
    }

    // get tickets created by this client
    const tickets = await db.ticket.findMany({
        where: { createdById: session.user.id }, // only their own tickets
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="min-h-screen bg-[#10451d]/5">
            <ClientDashboard
                // visible name in header (fallback to email if name is not defined)
                userName={session.user.name || session.user.email}
                tickets={tickets}
            />
        </div>
    )
}

export default ClientPage
