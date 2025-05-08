
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { User, CreditCard, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserSettings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketUpdates: false,
    newFunds: true,
    portfolioAlerts: true,
  });

  useEffect(() => {
    // In a real app, this would be an authenticated API call
    const storedUser = localStorage.getItem('wealthevolve_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      // Load settings from localStorage if they exist
      const storedSettings = localStorage.getItem('wealthevolve_settings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } else {
      // Redirect to login if no user found
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to update settings
    localStorage.setItem('wealthevolve_settings', JSON.stringify(settings));
    
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login via the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-wealth-light py-8">
        <div className="wealth-container">
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-bold text-wealth-navy">Account Settings</h1>
            <p className="text-wealth-gray">Manage your notification preferences and security settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar navigation */}
            <div className="md:col-span-3">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 mb-6 p-2">
                    <Avatar className="h-12 w-12 border-2 border-wealth-teal">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-wealth-navy text-white">
                        {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-wealth-navy">{user.name || 'User'}</p>
                      <p className="text-sm text-wealth-gray">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start font-normal" 
                      onClick={() => navigate('/profile')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start font-normal bg-wealth-navy/10" 
                      onClick={() => navigate('/settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start font-normal" 
                      onClick={() => navigate('/subscription')}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="md:col-span-9">
              <Tabs defaultValue="notifications">
                <TabsList className="mb-4">
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-wealth-navy">Notification Settings</CardTitle>
                      <CardDescription>Manage how and when we contact you</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSaveSettings}>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={settings.emailNotifications} 
                            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="market-updates" className="font-medium">Market Updates</Label>
                            <p className="text-sm text-muted-foreground">Get weekly updates about market trends</p>
                          </div>
                          <Switch 
                            id="market-updates" 
                            checked={settings.marketUpdates} 
                            onCheckedChange={(checked) => setSettings({...settings, marketUpdates: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="new-funds" className="font-medium">New Fund Alerts</Label>
                            <p className="text-sm text-muted-foreground">Be notified when new funds are available</p>
                          </div>
                          <Switch 
                            id="new-funds" 
                            checked={settings.newFunds} 
                            onCheckedChange={(checked) => setSettings({...settings, newFunds: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="portfolio-alerts" className="font-medium">Portfolio Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts about significant changes in your portfolio</p>
                          </div>
                          <Switch 
                            id="portfolio-alerts" 
                            checked={settings.portfolioAlerts} 
                            onCheckedChange={(checked) => setSettings({...settings, portfolioAlerts: checked})}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="bg-wealth-navy text-white">Save Changes</Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-wealth-navy">Security Settings</CardTitle>
                      <CardDescription>Manage your password and security preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Password</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Last changed: 30 days ago</p>
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t">
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            <p className="text-sm text-wealth-teal">Not enabled</p>
                          </div>
                          <Button variant="outline">Setup 2FA</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t">
                        <h3 className="font-medium">Sessions</h3>
                        <p className="text-sm text-muted-foreground">You're currently logged in on this device</p>
                        <Button variant="destructive">Log out of all devices</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserSettings;
