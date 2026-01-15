"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useDogRoutineStore } from "@/store/useDogRoutineStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const { profile, setProfile } = useDogRoutineStore();
  const [form, setForm] = React.useState(profile);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setProfile(form);
    toast({ title: "Profile saved", description: "Your settings are updated." });
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">Settings</p>
        <h1 className="text-3xl font-semibold">Owner profile & preferences</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={form.avatarUrl} alt={form.dogName} />
                <AvatarFallback>{form.dogName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Owner & dog profile</p>
                <p className="text-lg font-semibold">{form.ownerName}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="ownerName">Owner name</Label>
                <Input
                  id="ownerName"
                  value={form.ownerName}
                  onChange={(event) => updateField("ownerName", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dogName">Dog name</Label>
                <Input
                  id="dogName"
                  value={form.dogName}
                  onChange={(event) => updateField("dogName", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dogBreed">Breed</Label>
                <Input
                  id="dogBreed"
                  value={form.dogBreed}
                  onChange={(event) => updateField("dogBreed", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dogAge">Age</Label>
                <Input
                  id="dogAge"
                  value={form.dogAge}
                  onChange={(event) => updateField("dogAge", event.target.value)}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
                <Input
                  id="avatarUrl"
                  value={form.avatarUrl}
                  onChange={(event) => updateField("avatarUrl", event.target.value)}
                  placeholder="https://"
                />
              </div>
            </div>

            <Button onClick={handleSave}>Save profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <p className="text-sm text-muted-foreground">Preferences</p>
              <h2 className="text-xl font-semibold">Theme & app settings</h2>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
              <div>
                <p className="font-medium">Dark mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle for low-light comfort.
                </p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
                aria-label="Toggle dark mode"
              />
            </div>
            <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
              API mode scaffolding is ready when you&apos;re ready to connect a backend.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
