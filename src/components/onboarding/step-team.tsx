"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "Admin" | "Operator" | "Driver";

interface Invite {
  id: string;
  email: string;
  role: Role;
  sent: boolean;
}

function createInvite(): Invite {
  return {
    id: crypto.randomUUID(),
    email: "",
    role: "Operator",
    sent: false,
  };
}

const roleDescriptions: Record<Role, string> = {
  Admin: "Full access to everything",
  Operator: "Manage jobs, calendar, and invoicing",
  Driver: "View assigned jobs, track time, navigate",
};

interface StepTeamProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onUpdateData: (count: number) => void;
}

export function StepTeam({
  onNext,
  onBack,
  onSkip,
  onUpdateData,
}: StepTeamProps) {
  const [invites, setInvites] = useState<Invite[]>([createInvite()]);
  const [sending, setSending] = useState(false);

  function addInvite() {
    setInvites((prev) => [...prev, createInvite()]);
  }

  function removeInvite(id: string) {
    setInvites((prev) => prev.filter((i) => i.id !== id));
  }

  function updateInvite(
    id: string,
    field: "email" | "role",
    value: string
  ) {
    setInvites((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  }

  async function handleNext() {
    const validInvites = invites.filter((i) => i.email.trim());
    if (validInvites.length > 0) {
      setSending(true);
      // In production: send Clerk invitation emails via server action
      await new Promise((resolve) => setTimeout(resolve, 500));
      setInvites((prev) =>
        prev.map((i) =>
          i.email.trim() ? { ...i, sent: true } : i
        )
      );
      setSending(false);
    }
    onUpdateData(validInvites.length);
    onNext();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          {(Object.entries(roleDescriptions) as [Role, string][]).map(
            ([role, desc]) => (
              <div key={role} className="rounded-md bg-muted/50 p-3">
                <p className="text-sm font-medium">{role}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="space-y-3">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex items-end gap-2"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor={`email-${invite.id}`} className="sr-only">
                Email
              </Label>
              <Input
                id={`email-${invite.id}`}
                type="email"
                placeholder="team@company.com"
                value={invite.email}
                onChange={(e) =>
                  updateInvite(invite.id, "email", e.target.value)
                }
                disabled={invite.sent}
              />
            </div>
            <div className="w-32">
              <Select
                value={invite.role}
                onValueChange={(value) =>
                  updateInvite(invite.id, "role", value)
                }
                disabled={invite.sent}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Operator">Operator</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {invite.sent ? (
              <CheckCircle2 className="mb-1 size-5 shrink-0 text-success" />
            ) : (
              invites.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeInvite(invite.id)}
                  aria-label="Remove invite"
                  className="mb-1"
                >
                  <Trash2 className="size-3.5 text-muted-foreground" />
                </Button>
              )
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addInvite} className="w-full">
        <Plus className="size-4" />
        Add another
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button variant="ghost" onClick={onSkip}>
            Skip for now
          </Button>
        </div>
        <Button onClick={handleNext} disabled={sending}>
          {sending ? "Sending..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
