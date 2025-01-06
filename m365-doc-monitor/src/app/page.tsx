"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Activity, Bell, ArrowRight } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-4xl py-4 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Monitor and manage your M365 documentation synchronization
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4" />
              URL Mapping
            </CardTitle>
            <CardDescription className="text-sm">Manage documentation relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/url-mapping">
              <Button size="sm" className="flex items-center gap-2 w-full">
                Manage Mappings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Change Detection
            </CardTitle>
            <CardDescription className="text-sm">Monitor documentation updates</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/changes">
              <Button size="sm" className="flex items-center gap-2 w-full">
                View Changes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </CardTitle>
            <CardDescription className="text-sm">Stay informed about updates</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/notifications">
              <Button size="sm" className="flex items-center gap-2 w-full">
                Manage Notifications
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}