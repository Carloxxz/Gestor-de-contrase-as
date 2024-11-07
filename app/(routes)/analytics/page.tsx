
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { countPasswords } from "@/lib/countPassword";
import RepeatedPasswordsChart from "./components/RepeatedPasswordsChart/RepeatedPasswordsChart";
import ViewAnalyticsChart from "./components/ViewAnalyticsChart/ViewAnalyticsChart";
import TrafficDevice from "./components/TrafficDevice/TrafficDevice";

export default async function AnalyticsPage() {
  const session = await getServerSession()

  if (!session || !session.user?.email) {
    return redirect("/")
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      elements: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  if (!user || !user.elements) {
    return redirect("/")
  }

  const { unique, repeated } = countPasswords(user.elements)

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <RepeatedPasswordsChart repeated={repeated} unique={unique} />
        <ViewAnalyticsChart repeated={repeated} unique={unique} />
      </div>
      <TrafficDevice />
    </div>
  )
}