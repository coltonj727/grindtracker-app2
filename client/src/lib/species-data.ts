import { LocalGrind } from "@/lib/storage";
import { SoundButton } from "@/components/ui/sound-button";
import { MapPin, Plus, Minus, BarChart3, Crown, Diamond } from "lucide-react";
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
  // Calculate rates
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
      
      <div className="space-y-4 mb-6">
        {/* Regular Kills */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="text-white font-medium">Regular Kills</div>
          <div className="flex items-center space-x-4">
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onRemoveKill(grind)}
              className="h-8 w-8 p-0 bg-red-600/20 border-red-600 text-red-400 hover:bg-red-600/30"
              disabled={grind.kills === 0}
            >
              <Minus className="w-4 h-4" />
            </SoundButton>
            <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
              {grind.kills}
            </span>
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onAddKill(grind)}
              className="h-8 w-8 p-0 bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30"
            >
              <Plus className="w-4 h-4" />
            </SoundButton>
          </div>
        </div>

        {/* Diamonds */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-cyan-400 font-medium">Diamonds</div>
            <div className="text-sm text-cyan-400/80">{diamondRate}% rate</div>
          </div>
          <div className="flex items-center space-x-4">
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onRemoveDiamond(grind)}
              className="h-8 w-8 p-0 bg-red-600/20 border-red-600 text-red-400 hover:bg-red-600/30"
              disabled={grind.diamonds === 0}
            >
              <Minus className="w-4 h-4" />
            </SoundButton>
            <span className="text-2xl font-bold text-cyan-400 min-w-[3rem] text-center">
              {grind.diamonds}
            </span>
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onAddDiamond(grind)}
              className="h-8 w-8 p-0 bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30"
            >
              <Plus className="w-4 h-4" />
            </SoundButton>
          </div>
        </div>

        {/* Rares */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-purple-400 font-medium">Rares</div>
            <div className="text-sm text-purple-400/80">{rareRate}% rate</div>
          </div>
          <div className="flex items-center space-x-4">
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onRemoveRare(grind)}
              className="h-8 w-8 p-0 bg-red-600/20 border-red-600 text-red-400 hover:bg-red-600/30"
              disabled={grind.rares === 0}
            >
              <Minus className="w-4 h-4" />
            </SoundButton>
            <span className="text-2xl font-bold text-purple-400 min-w-[3rem] text-center">
              {grind.rares}
            </span>
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onAddRare(grind)}
              className="h-8 w-8 p-0 bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30"
            >
              <Plus className="w-4 h-4" />
            </SoundButton>
          </div>
        </div>

        {/* Trolls */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
          <div className="text-red-400 font-medium">Trolls</div>
          <div className="flex items-center space-x-4">
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onRemoveTroll(grind)}
              className="h-8 w-8 p-0 bg-red-600/20 border-red-600 text-red-400 hover:bg-red-600/30"
              disabled={grind.trolls === 0}
            >
              <Minus className="w-4 h-4" />
            </SoundButton>
            <span className="text-2xl font-bold text-red-400 min-w-[3rem] text-center">
              {grind.trolls}
            </span>
            <SoundButton
              size="sm"
              variant="outline"
              onClick={() => onAddTroll(grind)}
              className="h-8 w-8 p-0 bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30"
            >
              <Plus className="w-4 h-4" />
            </SoundButton>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {!grind.goHarvested && onMarkGO && hasGreatOne(grind.species) && (
          <SoundButton
            onClick={() => onMarkGO(grind)}
            className="flex-1 bg-yellow-600 text-white hover:bg-yellow-700 touch-action-manipulation"
          >
            <Crown className="w-4 h-4 mr-2" />
            Mark Great One
          </SoundButton>
        )}
        <SoundButton
          onClick={() => onViewDetails(grind)}
          variant="outline"
          className="px-4 py-2 border border-border hover:bg-muted touch-action-manipulation"
        >
          <BarChart3 className="w-4 h-4" />
        </SoundButton>
      </div>
    </div>
  );
          }
