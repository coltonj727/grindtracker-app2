import { LocalGrind } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, BarChart3, Crown } from "lucide-react";
import { hasGreatOne } from "@/lib/species-data";

interface GrindCardProps {
  grind: LocalGrind;
  onAddKill: (grind: LocalGrind) => void;
  onRemoveKill: (grind: LocalGrind) => void;
  onAddDiamond: (grind: LocalGrind) => void;
  onRemoveDiamond: (grind: LocalGrind) => void;
  onAddRare: (grind: LocalGrind) => void;
  onRemoveRare: (grind: LocalGrind) => void;
  onAddTroll: (grind: LocalGrind) => void;
  onRemoveTroll: (grind: LocalGrind) => void;
  onViewDetails: (grind: LocalGrind) => void;
  onMarkGO?: (grind: LocalGrind) => void;
}

export function GrindCard({ grind, onAddKill, onRemoveKill, onAddDiamond, onRemoveDiamond, onAddRare, onRemoveRare, onAddTroll, onRemoveTroll, onViewDetails, onMarkGO }: GrindCardProps) {
  // Calculate the percentage rates you want
  const diamondRate = grind.kills > 0 ? ((grind.diamonds / grind.kills) * 100).toFixed(1) : "0.0";
  const rareRate = grind.kills > 0 ? ((grind.rares / grind.kills) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-6 mb-4 touch-action-manipulation backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">{grind.species}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{grind.map}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {grind.diamonds > 0 && (
            <span className="bg-gold/20 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              {grind.diamonds} 💎
            </span>
          )}
          {grind.goHarvested && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              GO ✓
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {/* Regular Kills */}
        <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
          <div className="text-sm font-medium text-card-foreground">Regular Kills</div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemoveKill(grind)}
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-300"
              disabled={grind.kills === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold text-card-foreground min-w-[2rem] text-center">
              {grind.kills}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddKill(grind)}
              className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 border-green-300"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Diamonds - WITH PERCENTAGE RATE */}
        <div className="flex items-center justify-between bg-cyan-50 dark:bg-cyan-950/20 rounded-lg p-3">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Diamonds</div>
            <div className="text-xs text-cyan-600 dark:text-cyan-400">{diamondRate}% rate</div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemoveDiamond(grind)}
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-300"
              disabled={grind.diamonds === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold text-cyan-600 min-w-[2rem] text-center">
              {grind.diamonds}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddDiamond(grind)}
              className="h-8 w-8 p-0 border-cyan-300 text-cyan-600 hover:bg-cyan-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Rares - WITH PERCENTAGE RATE */}
        <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Rares</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">{rareRate}% rate</div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemoveRare(grind)}
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-300"
              disabled={grind.rares === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold text-purple-600 min-w-[2rem] text-center">
              {grind.rares}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddRare(grind)}
              className="h-8 w-8 p-0 border-purple-300 text-purple-600 hover:bg-purple-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Trolls */}
        <div className="flex items-center justify-between bg-red-50 dark:bg-red-950/20 rounded-lg p-3">
          <div className="text-sm font-medium text-red-700 dark:text-red-300">Trolls</div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemoveTroll(grind)}
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 border-red-300"
              disabled={grind.trolls === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold text-red-600 min-w-[2rem] text-center">
              {grind.trolls}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddTroll(grind)}
              className="h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {!grind.goHarvested && onMarkGO && hasGreatOne(grind.species) && (
          <Button
            onClick={() => onMarkGO(grind)}
            className="flex-1 bg-yellow-600 text-white hover:bg-yellow-700 touch-action-manipulation"
          >
            <Crown className="w-4 h-4 mr-2" />
            Mark Great One
          </Button>
        )}
        <Button
          onClick={() => onViewDetails(grind)}
          variant="outline"
          className="px-4 py-2 border border-border hover:bg-muted touch-action-manipulation"
        >
          <BarChart3 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
