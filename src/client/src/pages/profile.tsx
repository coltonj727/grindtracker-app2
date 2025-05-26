import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useStats } from "@/hooks/use-grinds";
import { User, Trash2, Bell, Moon, Shield, Volume2, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { audioManager } from "@/lib/audio";
import { useTheme } from "@/lib/theme";

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(audioManager.isEnabled());
  const [vibrateEnabled, setVibrateEnabled] = useState(audioManager.isVibrateEnabled());
  const { theme, setTheme } = useTheme();
  
  const { totalGrinds, totalDiamonds, totalGOs, totalKills } = useStats();
  const { toast } = useToast();

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all your hunting data? This action cannot be undone.")) {
      localStorage.removeItem('grindtracker-grinds');
      localStorage.removeItem('grindtracker-kills');
      localStorage.removeItem('grindtracker-next-id');
      
      toast({
        title: "Data cleared!",
        description: "All your hunting data has been deleted.",
      });
      
      // Reload the page to reflect changes
      window.location.reload();
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 max-w-md">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              Hunter Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-forest">{totalGrinds}</div>
                <div className="text-sm text-muted-foreground">Active Grinds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-forest">{totalKills}</div>
                <div className="text-sm text-muted-foreground">Total Kills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{totalDiamonds}</div>
                <div className="text-sm text-muted-foreground">Diamonds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{totalGOs}</div>
                <div className="text-sm text-muted-foreground">Great Ones</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <Label htmlFor="notifications" className="font-medium">Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
              </div>
              <Switch
                id="darkMode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <Label htmlFor="soundEnabled" className="font-medium">Sound Effects</Label>
              </div>
              <Switch
                id="soundEnabled"
                checked={soundEnabled}
                onCheckedChange={(enabled) => {
                  setSoundEnabled(enabled);
                  audioManager.setEnabled(enabled);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <Label htmlFor="vibrateEnabled" className="font-medium">Haptic Feedback</Label>
              </div>
              <Switch
                id="vibrateEnabled"
                checked={vibrateEnabled}
                onCheckedChange={(enabled) => {
                  setVibrateEnabled(enabled);
                  audioManager.setVibrateEnabled(enabled);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <Label htmlFor="offlineMode" className="font-medium">Offline Mode</Label>
              </div>
              <Switch
                id="offlineMode"
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handleClearData}
              variant="destructive"
              className="w-full justify-start"
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
