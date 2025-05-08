
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check } from '@/components/ui/check';
import { toast } from '@/components/ui/use-toast';
import { User, CreditCard, Settings, CheckIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Subscription plans
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Essential tools for beginning investors',
      features: [
        'Access to basic fund data',
        'Limited portfolio tracking',
        'Standard investment calculators',
        'Market news updates'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$19.99',
      priceId: 'pro_monthly',
      period: '/month',
      description: 'Advanced tools for serious investors',
      features: [
        'Everything in Basic',
        'Advanced portfolio analysis',
        'Unlimited fund comparison',
        'Expert recommendations',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199.99',
      priceId: 'enterprise_yearly',
      period: '/year',
      description: 'Complete solution for professional investors',
      features: [
        'Everything in Pro',
        'API access',
        'Custom reports',
        'Dedicated account manager',
        'White-label options',
        'Advanced data export'
      ],
      popular: false
    }
  ];

  useEffect(() => {
    // In a real app, this would be an authenticated API call
    const storedUser = localStorage.getItem('wealthevolve_user');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Check if user has a subscription saved
      setSubscriptionTier(userData.subscriptionTier || null);
    } else {
      // Redirect to login if no user found
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentDialog(false);
      
      // Update user subscription
      const updatedUser = {
        ...user,
        subscriptionTier: selectedPlan.name,
        subscriptionDate: new Date().toISOString()
      };
      
      localStorage.setItem('wealthevolve_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSubscriptionTier(selectedPlan.name);
      
      toast({
        title: "Subscription successful!",
        description: `You are now subscribed to the ${selectedPlan.name} plan.`,
      });
    }, 2000);
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
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-wealth-navy">Subscription Plans</h1>
            <p className="text-wealth-gray mt-2 max-w-2xl mx-auto">
              Choose the perfect plan to enhance your investment journey and achieve your financial goals
            </p>
          </div>

          {subscriptionTier && (
            <div className="mb-8">
              <Card className="bg-wealth-navy/5 border-wealth-teal">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-wealth-navy">Current Plan: <span className="text-wealth-teal">{subscriptionTier}</span></h3>
                      <p className="text-sm text-wealth-gray">You're currently on the {subscriptionTier} plan. Enjoy all the benefits!</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-4 md:mt-0 border-wealth-teal text-wealth-teal hover:bg-wealth-teal hover:text-white"
                    >
                      Manage Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`flex flex-col h-full ${plan.popular ? 'border-wealth-teal shadow-lg ring-1 ring-wealth-teal' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-wealth-teal text-white text-xs font-semibold py-1 px-3 absolute right-4 top-0 rounded-b-md">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-baseline">
                    <span className={plan.popular ? 'text-wealth-teal' : 'text-wealth-navy'}>{plan.name}</span>
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-wealth-gray text-sm">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-wealth-teal flex-shrink-0 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-wealth-teal hover:bg-wealth-teal/90 text-white' 
                        : 'bg-wealth-navy hover:bg-wealth-navy/90 text-white'
                    }`}
                    disabled={subscriptionTier === plan.name}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {subscriptionTier === plan.name ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-medium text-wealth-navy mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-wealth-navy">Can I change my plan later?</h4>
                <p className="text-wealth-gray">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
              </div>
              <div>
                <h4 className="font-medium text-wealth-navy">How will I be billed?</h4>
                <p className="text-wealth-gray">We bill automatically based on your chosen plan's cycle - monthly or yearly. You'll receive an email receipt for each payment.</p>
              </div>
              <div>
                <h4 className="font-medium text-wealth-navy">Is there a free trial?</h4>
                <p className="text-wealth-gray">Yes, all paid plans include a 14-day free trial. You can cancel anytime during the trial period.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to {selectedPlan?.name}</DialogTitle>
            <DialogDescription>
              Enter your payment details to complete your subscription
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  value={paymentInfo.cardName}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-wealth-navy text-white"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Subscribe for ${selectedPlan?.price}${selectedPlan?.period || ''}`}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Subscription;
