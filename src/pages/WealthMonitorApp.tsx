
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Smartphone, BarChart2, PieChart, Bell, Lock, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// QR Code component
const QRCode: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
      <div className="w-48 h-48 grid grid-cols-10 grid-rows-10 gap-1">
        {/* This creates a simplified visual representation of a QR code */}
        {Array.from({ length: 100 }).map((_, i) => {
          // Create a pattern that resembles a QR code
          const row = Math.floor(i / 10);
          const col = i % 10;
          
          // Create border pattern
          const isBorder = row === 0 || row === 9 || col === 0 || col === 9;
          
          // Create the three positioning squares in corners
          const isPositioningSquare = 
            (row < 3 && col < 3) || // Top-left
            (row < 3 && col > 6) || // Top-right
            (row > 6 && col < 3);   // Bottom-left
            
          // Random pattern for the rest with some bias toward white
          const isRandom = Math.random() > 0.7;
          
          return (
            <div 
              key={i} 
              className={`
                ${isPositioningSquare || isBorder || isRandom ? 'bg-wealth-navy' : 'bg-white'}
                ${(row === 1 && col === 1) || (row === 1 && col === 8) || (row === 8 && col === 1) ? 'bg-white' : ''}
              `}
            ></div>
          );
        })}
      </div>
      <p className="text-center mt-4 text-sm font-medium">Scan to Download</p>
    </div>
  );
};

// 3D Phone Model Component
function PhoneModel() {
  return (
    <group>
      {/* Phone base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color={new THREE.Color("#2C3E50")} />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.9, 1.8, 0.01]} />
        <meshStandardMaterial 
          color={new THREE.Color("#2CA6A4")} 
          emissive={new THREE.Color("#2CA6A4")} 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* Home button */}
      <mesh position={[0, -1, 0.06]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
        <meshStandardMaterial color={new THREE.Color("#333333")} />
      </mesh>
      
      {/* Camera */}
      <mesh position={[0, 0.85, 0.06]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
        <meshStandardMaterial color={new THREE.Color("#111111")} />
      </mesh>
      
      {/* App chart visualization */}
      <group position={[0, 0.1, 0.07]}>
        {/* Chart bars */}
        {[0.4, 0.25, 0.6, 0.3, 0.5].map((height, i) => (
          <mesh key={i} position={[-0.3 + i * 0.15, -0.2 - height/2, 0]} castShadow>
            <boxGeometry args={[0.08, height, 0.01]} />
            <meshStandardMaterial color={new THREE.Color(i % 2 === 0 ? "#2CA6A4" : "#f1c40f")} />
          </mesh>
        ))}
        
        {/* Pie chart */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32]} />
          <meshStandardMaterial color={new THREE.Color("#ecf0f1")} />
        </mesh>
        <mesh position={[0, 0.4, 0.01]} castShadow rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32, 1, false, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color={new THREE.Color("#2CA6A4")} />
        </mesh>
        <mesh position={[0, 0.4, 0.01]} castShadow rotation={[0, 0, Math.PI * 0.7]}>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32, 1, false, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color={new THREE.Color("#f1c40f")} />
        </mesh>
        <mesh position={[0, 0.4, 0.01]} castShadow rotation={[0, 0, Math.PI * 1.2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32, 1, false, 0, Math.PI * 0.8]} />
          <meshStandardMaterial color={new THREE.Color("#3498db")} />
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <PhoneModel />
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

const WealthMonitorApp: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-wealth-navy to-wealth-navy/80 text-white py-20">
          <div className="wealth-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                  Wealth Monitor <span className="text-wealth-gold">Mobile App</span>
                </h1>
                <p className="text-lg opacity-90 mb-8">
                  Track all your investments in real-time across platforms with powerful analytics and personalized insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white flex items-center">
                    <Download className="mr-2 h-5 w-5" />
                    Download App
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-wealth-navy">
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-[280px] h-[400px]">
                  {/* 3D Phone Model */}
                  <div className="bg-wealth-navy rounded-[3rem] p-2 shadow-2xl h-full w-full">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden h-full w-full relative">
                      <div className="bg-wealth-navy h-10 flex justify-center items-center">
                        <div className="w-20 h-6 bg-black rounded-b-xl"></div>
                      </div>
                      <div className="absolute inset-0 top-10">
                        <React.Suspense fallback={<div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">Loading Model...</div>}>
                          <Canvas camera={{ position: [0, 0, 3] }} className="h-full w-full">
                            <Scene />
                          </Canvas>
                        </React.Suspense>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-wealth-gold opacity-30 rounded-full blur-xl"></div>
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-wealth-teal opacity-30 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Features */}
        <section className="py-16 bg-white">
          <div className="wealth-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-2 text-wealth-navy mb-4">Powerful Features at Your Fingertips</h2>
              <p className="text-wealth-gray text-lg">
                Our app puts sophisticated investment analytics in the palm of your hand
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Portfolio Tracking",
                  description: "Monitor your investments across different platforms in real-time with automated synchronization.",
                  icon: Activity
                },
                {
                  title: "Performance Analytics",
                  description: "Detailed analysis of your investments with customizable metrics and benchmarks.",
                  icon: BarChart2
                },
                {
                  title: "Asset Allocation Visualization",
                  description: "Visual breakdown of your portfolio by asset class, sector, and geography.",
                  icon: PieChart
                },
                {
                  title: "Smart Alerts",
                  description: "Customizable notifications for price movements, rebalancing opportunities, and market events.",
                  icon: Bell
                },
                {
                  title: "Secure Authentication",
                  description: "Bank-grade security with biometric authentication and encrypted data transmission.",
                  icon: Lock
                },
                {
                  title: "Mobile-First Experience",
                  description: "Intuitive interface designed specifically for mobile devices with offline capabilities.",
                  icon: Smartphone
                }
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-wealth-teal bg-opacity-10 p-3 rounded-full mr-4">
                        <feature.icon className="h-6 w-6 text-wealth-teal" />
                      </div>
                      <h3 className="font-serif text-xl font-medium text-wealth-navy">{feature.title}</h3>
                    </div>
                    <p className="text-wealth-gray pl-16">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16 bg-wealth-light">
          <div className="wealth-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 text-wealth-navy mb-6">Download Our App Today</h2>
                <p className="text-wealth-gray text-lg mb-8">
                  Available on iOS and Android devices. Scan the QR code or use the download buttons below to get started.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button className="bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13 8a1 1 0 0 1-2 0"></path>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on</span>
                      <span className="font-semibold">App Store</span>
                    </div>
                  </Button>
                  
                  <Button className="bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on</span>
                      <span className="font-semibold">Google Play</span>
                    </div>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  {[
                    "10,000+ Downloads", 
                    "4.8/5 App Store Rating", 
                    "4.7/5 Google Play Rating"
                  ].map((stat, index) => (
                    <div key={index} className="bg-white px-4 py-3 rounded-lg shadow-sm text-center">
                      <p className="text-wealth-navy font-medium">{stat}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center">
                  <p className="text-wealth-gray mr-2">Have questions about the app?</p>
                  <Button variant="link" className="text-wealth-teal inline-flex items-center p-0">
                    View FAQ <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <QRCode />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials or Screenshots Section could be added here */}

        {/* Call to Action */}
        <section className="py-16 bg-wealth-navy text-white">
          <div className="wealth-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 mb-6">Start Managing Your Investments Smarter</h2>
              <p className="text-lg opacity-80 mb-8">
                Download our app today and take control of your financial future with powerful analytics at your fingertips.
              </p>
              <Button size="lg" className="bg-wealth-teal hover:bg-opacity-90 text-white flex items-center mx-auto">
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WealthMonitorApp;
