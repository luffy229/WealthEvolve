
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { User, CreditCard, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an authenticated API call
    const storedUser = localStorage.getItem('wealthevolve_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user found
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to update the user profile
    localStorage.setItem('wealthevolve_user', JSON.stringify(user));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
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
            <h1 className="text-3xl font-serif font-bold text-wealth-navy">My Profile</h1>
            <p className="text-wealth-gray">Manage your account settings and subscription</p>
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
                      className="w-full justify-start font-normal bg-wealth-navy/10" 
                      onClick={() => navigate('/profile')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start font-normal" 
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
              <Tabs defaultValue="personal">
                <TabsList className="mb-4">
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-wealth-navy">Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSaveProfile}>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={user.name || ''} 
                              onChange={e => setUser({...user, name: e.target.value})} 
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={user.email} 
                              onChange={e => setUser({...user, email: e.target.value})} 
                              placeholder="john@example.com"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              value={user.phone || ''} 
                              onChange={e => setUser({...user, phone: e.target.value})} 
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">City</Label>
                            <Input 
                              id="location" 
                              value={user.location || ''} 
                              onChange={e => setUser({...user, location: e.target.value})} 
                              placeholder="New York"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea 
                            id="bio"
                            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={user.bio || ''}
                            onChange={e => setUser({...user, bio: e.target.value})}
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="bg-wealth-navy text-white">Save Changes</Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-wealth-navy">Preferences</CardTitle>
                      <CardDescription>Manage your notification and display preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Preference settings will be implemented soon.</p>
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

export default UserProfile;
