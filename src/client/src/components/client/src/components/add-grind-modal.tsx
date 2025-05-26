import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateGrind } from "@/hooks/use-grinds";
import { InsertGrind } from "@shared/schema";
import { MAPS, getSpeciesForMap } from "@/lib/species-data";

interface AddGrindModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddGrindModal({ open, onOpenChange }: AddGrindModalProps) {
  const [species, setSpecies] = useState("");
  const [map, setMap] = useState("");

  // Get available animals for selected map
  const availableAnimals = map ? getSpeciesForMap(map) : [];

  // Reset species when map changes
  const handleMapChange = (newMap: string) => {
    setMap(newMap);
    setSpecies(""); // Clear species when changing map
  };
  const createGrind = useCreateGrind();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!species.trim() || !map) return;

    const grindData: InsertGrind = {
      species: species.trim(),
      map,
      kills: 0,
      diamonds: 0,
      rares: 0,
      goHarvested: false,
    };

    createGrind.mutate(grindData);
    setSpecies("");
    setMap("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bottom-0 top-auto translate-y-0 rounded-t-3xl border-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Grind</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="species" className="text-sm font-medium text-gray-700">
              Species
            </Label>
            <Select value={species} onValueChange={setSpecies} required disabled={!map}>
              <SelectTrigger className="mt-2 p-3 border border-gray-300 rounded-lg">
                <SelectValue placeholder={map ? "Select a species" : "Select a map first"} />
              </SelectTrigger>
              <SelectContent>
                {availableAnimals.map((animal) => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="map" className="text-sm font-medium text-gray-700">
              Map
            </Label>
            <Select value={map} onValueChange={handleMapChange} required>
              <SelectTrigger className="mt-2 p-3 border border-gray-300 rounded-lg">
                <SelectValue placeholder="Select a map" />
              </SelectTrigger>
              <SelectContent>
                {MAPS.map((mapName) => (
                  <SelectItem key={mapName} value={mapName}>
                    {mapName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium touch-action-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createGrind.isPending}
              className="flex-1 py-3 px-4 bg-forest text-white rounded-lg font-medium hover:bg-green-700 touch-action-manipulation"
            >
              {createGrind.isPending ? "Creating..." : "Create Grind"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
