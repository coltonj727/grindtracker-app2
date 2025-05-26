import { LocalGrind } from "@/lib/storage";
import { SoundButton } from "@/components/ui/sound-button";
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
  // Calculate rates - THIS SHOWS THE PERCENTAGES LIKE YOUR ORIGINAL
  const diamondRate = grind.kills > 0 ? ((grind.diamonds / grind.kills) * 100).toFixed(1) : "0.0";
  const rareRate = grind.kills > 0 ? ((grind.rares / grind.kills) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{grind.species}</h3>
          <p className="text-sm text-gray-400 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{grind.map}</span>
          </p>
        </div>
      </div>
      
      {/* Stats Sections */}
      <div className="space-y-4 mb-6">
        {/* Regular Kills */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
          <div className="text-white font-medium">Regular Kills</div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onRemoveKill(grind)}
              className="w-8 h-8 rounded border border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
              disabled={grind.kills === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-white min-w-[2rem] text-center">
              {grind.kills}
            </span>
            <button
              onClick={() => onAddKill(grind)}
              className="w-8 h-8 rounded border border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diamonds - WITH RATE PERCENTAGE */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-cyan-400 font-medium">Diamonds</div>
            <div className="text-sm text-cyan-400/80">{diamondRate}% rate</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onRemoveDiamond(grind)}
              className="w-8 h-8 rounded border border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
              disabled={grind.diamonds === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-cyan-400 min-w-[2rem] text-center">
              {grind.diamonds}
            </span>
            <button
              onClick={() => onAddDiamond(grind)}
              className="w-8 h-8 rounded border border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rares - WITH RATE PERCENTAGE */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
          <div className="flex flex-col">
            <div className="text-purple-400 font-medium">Rares</div>
            <div className="text-sm text-purple-400/80">{rareRate}% rate</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onRemoveRare(grind)}
              className="w-8 h-8 rounded border border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
              disabled={grind.rares === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-purple-400 min-w-[2rem] text-center">
              {grind.rares}
            </span>
            <button
              onClick={() => onAddRare(grind)}
              className="w-8 h-8 rounded border border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trolls */}
        <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
          <div className="text-red-400 font-medium">Trolls</div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onRemoveTroll(grind)}
              className="w-8 h-8 rounded border border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center"
              disabled={grind.trolls === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-bold text-red-400 min-w-[2rem] text-center">
              {grind.trolls}
            </span>
            <button
              onClick={() => onAddTroll(grind)}
              className="w-8 h-8 rounded border border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Great One Button */}
      {!grind.goHarvested && onMarkGO && hasGreatOne(grind.species) && (
        <button
          onClick={() => onMarkGO(grind)}
          className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3 px-4 rounded-lg font-bold flex items-center justify-center mb-4"
        >
          <Crown className="w-4 h-4 mr-2" />
          Mark Great One
        </button>
      )}
      
      {/* View Details Button */}
      <button
        onClick={() => onViewDetails(grind)}
        className="w-full bg-gray-700 text-gray-300 hover:bg-gray-600 py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        View Details
      </button>
    </div>
  );
}
