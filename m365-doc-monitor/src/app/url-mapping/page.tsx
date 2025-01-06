"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function URLMappingPage() {
  const [mappings, setMappings] = useState([])
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="container mx-auto max-w-4xl py-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">URL Mappings</h1>
          <p className="text-sm text-muted-foreground">Manage your documentation relationships</p>
        </div>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Mapping
        </Button>
      </div>

      {mappings.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-3 bg-muted rounded-full">
                  <PlusCircle className="h-6 w-6" />
                </div>
              </div>
              <h3 className="font-medium">No mappings configured</h3>
              <p className="text-sm text-muted-foreground">Add your first URL mapping to start monitoring</p>
              <Button size="sm" onClick={() => setShowAddDialog(true)}>
                Add First Mapping
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* We'll map through the mappings here when we have data */}
        </div>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New URL Mapping</DialogTitle>
            <DialogDescription>
              Enter the Microsoft Learn documentation URL and corresponding internal documentation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Microsoft Learn URL</label>
              <Input placeholder="https://learn.microsoft.com/..." />
              <p className="text-xs text-muted-foreground">
                Enter the URL of the Microsoft documentation you want to monitor
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Internal Documentation URL</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Your internal documentation URL" />
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another URL
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button size="sm">
              Create Mapping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}