
import React, { Suspense } from 'react';
import { Phone, Target, Shield, BarChart2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const products = [
  {
    title: 'Wealth Monitor App',
    description: 'Track all your investments in real-time across platforms with our powerful mobile application.',
    icon: Phone
  },
  {
    title: 'Goal-Based Investing',
    description: 'Create and fund specific financial goals with specialized portfolios tailored to your timeline.',
    icon: Target
  },
  {
    title: 'Portfolio Health Score',
    description: 'Get instant insights into your portfolio performance and risk exposure with our proprietary scoring system.',
    icon: BarChart2
  },
  {
    title: 'AI-Powered Rebalancing',
    description: 'Intelligent portfolio rebalancing that adjusts to market conditions and your changing financial goals.',
    icon: Shield
  },
  {
    title: 'Monthly Market Reports',
    description: 'Receive comprehensive market analysis and investment insights from our expert research team.',
    icon: FileText
  }
];

// 3D Components
function PhoneModel() {
  return (
    <group>
      {/* Phone base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.9, 1.8, 0.01]} />
        <meshStandardMaterial color="#2CA6A4" emissive="#2CA6A4" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Home button */}
      <mesh position={[0, -1, 0.06]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Camera */}
      <mesh position={[0, 0.85, 0.06]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* App icons (simplified as colored squares) */}
      {[
        [-0.3, 0.4, 0.07, "#e74c3c"],
        [0, 0.4, 0.07, "#3498db"],
        [0.3, 0.4, 0.07, "#2ecc71"],
        [-0.3, 0, 0.07, "#f1c40f"],
        [0, 0, 0.07, "#9b59b6"],
        [0.3, 0, 0.07, "#e67e22"],
      ].map((params, i) => (
        <mesh key={i} position={[params[0] as number, params[1] as number, params[2] as number]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.01]} />
          <meshStandardMaterial color={params[3] as string} />
        </mesh>
      ))}
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

const ProductFeatures: React.FC = () => {
  return (
    <section id="products" className="section-padding bg-wealth-light">
      <div className="wealth-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-wealth-navy mb-4">Our Product Suite</h2>
          <p className="text-wealth-gray text-lg">
            Comprehensive wealth management tools and services designed for the modern investor.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-6">
              {products.map((product, index) => (
                <Card key={index} className="feature-card border-none shadow hover:shadow-lg">
                  <CardContent className="flex items-start p-6">
                    <div className="mr-5 mt-1 bg-wealth-teal bg-opacity-10 p-3 rounded-full">
                      <product.icon className="h-6 w-6 text-wealth-teal" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium mb-2 text-wealth-navy">{product.title}</h3>
                      <p className="text-wealth-gray text-sm">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-[280px] h-[580px]">
              {/* 3D Phone Model */}
              <div className="bg-wealth-navy rounded-[3rem] p-2 shadow-2xl h-full w-full">
                <div className="bg-black rounded-[2.5rem] overflow-hidden h-full w-full relative">
                  <div className="bg-wealth-navy h-10 flex justify-center items-center">
                    <div className="w-20 h-6 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="absolute inset-0 top-10">
                    <Suspense fallback={<div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">Loading Model...</div>}>
                      <Canvas camera={{ position: [0, 0, 3] }} className="h-full w-full">
                        <Scene />
                      </Canvas>
                    </Suspense>
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
  );
};

export default ProductFeatures;
