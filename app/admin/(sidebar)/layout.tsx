"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
  Upload,
  Award,
  Cpu,
} from "lucide-react"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Technologies", href: "/admin/technologies", icon: Cpu },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Files", href: "/admin/files", icon: Upload },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-muted/50 min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Portfolio Management</p>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start" size="sm">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 pt-8 border-t">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{session.user?.email?.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{session.user?.email}</p>
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  )
}
