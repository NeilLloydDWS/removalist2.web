"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultColors = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

interface Truck {
  id: string;
  name: string;
  color: string;
  capacity: string;
  registration: string;
}

function createTruck(index: number): Truck {
  return {
    id: crypto.randomUUID(),
    name: "",
    color: defaultColors[index % defaultColors.length],
    capacity: "",
    registration: "",
  };
}

interface StepTrucksProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onUpdateData: (count: number) => void;
}

export function StepTrucks({
  onNext,
  onBack,
  onSkip,
  onUpdateData,
}: StepTrucksProps) {
  const [trucks, setTrucks] = useState<Truck[]>([createTruck(0)]);

  function addTruck() {
    setTrucks((prev) => [...prev, createTruck(prev.length)]);
  }

  function removeTruck(id: string) {
    setTrucks((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTruck(id: string, field: keyof Truck, value: string) {
    setTrucks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  function handleNext() {
    const filledTrucks = trucks.filter((t) => t.name.trim());
    onUpdateData(filledTrucks.length);
    onNext();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {trucks.map((truck, index) => (
          <div
            key={truck.id}
            className="rounded-lg border bg-card p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Truck {index + 1}
              </h3>
              {trucks.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeTruck(truck.id)}
                  aria-label="Remove truck"
                >
                  <Trash2 className="size-3.5 text-muted-foreground" />
                </Button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`name-${truck.id}`}>Truck name</Label>
                <Input
                  id={`name-${truck.id}`}
                  placeholder="e.g. Van 1, Big Truck"
                  value={truck.name}
                  onChange={(e) =>
                    updateTruck(truck.id, "name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`color-${truck.id}`}>Calendar colour</Label>
                <div className="flex items-center gap-2">
                  <input
                    id={`color-${truck.id}`}
                    type="color"
                    value={truck.color}
                    onChange={(e) =>
                      updateTruck(truck.id, "color", e.target.value)
                    }
                    className="size-9 cursor-pointer rounded-md border bg-transparent p-0.5"
                  />
                  <div className="flex gap-1">
                    {defaultColors.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          updateTruck(truck.id, "color", color)
                        }
                        className="size-6 rounded-full border-2 transition-transform hover:scale-110"
                        style={{
                          backgroundColor: color,
                          borderColor:
                            truck.color === color
                              ? color
                              : "transparent",
                        }}
                        aria-label={`Select colour ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`capacity-${truck.id}`}>
                  Capacity (m&sup3;, optional)
                </Label>
                <Input
                  id={`capacity-${truck.id}`}
                  type="text"
                  placeholder="e.g. 25"
                  value={truck.capacity}
                  onChange={(e) =>
                    updateTruck(truck.id, "capacity", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`reg-${truck.id}`}>
                  Registration (optional)
                </Label>
                <Input
                  id={`reg-${truck.id}`}
                  placeholder="e.g. ABC123"
                  value={truck.registration}
                  onChange={(e) =>
                    updateTruck(truck.id, "registration", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addTruck} className="w-full">
        <Plus className="size-4" />
        Add another truck
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
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
