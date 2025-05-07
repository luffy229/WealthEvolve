
import React, { Suspense, useState, useRef } from 'react';
import { Phone, Target, Shield, BarChart2, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const products = [
  {
    title: 'Wealth Monitor App',
    description: 'Track all your investments in real-time across platforms with our powerful mobile application.',
    icon: Phone,
    link: '/wealth-monitor-app'
  },
  {
    title: 'Goal-Based Investing',
    description: 'Create and fund specific financial goals with specialized portfolios tailored to your timeline.',
    icon: Target,
    link: '/financial-planning'
  },
  {
    title: 'Portfolio Health Score',
    description: 'Get instant insights into your portfolio performance and risk exposure with our proprietary scoring system.',
    icon: BarChart2,
    link: '/portfolio-health-check'
  },
  {
    title: 'AI-Powered Rebalancing',
    description: 'Intelligent portfolio rebalancing that adjusts to market conditions and your changing financial goals.',
    icon: Shield,
    link: '/investment-analyzer'
  },
  {
    title: 'Monthly Market Reports',
    description: 'Receive comprehensive market analysis and investment insights from our expert research team.',
    icon: FileText,
    link: '/blog'
  }
];

// 3D Components
function PhoneModel() {
  const [hovering, setHovering] = useState(false);
  
  return (
    <group
      onPointerOver={() => setHovering(true)}
      onPointerOut={() => setHovering(false)}
      scale={hovering ? 1.05 : 1}
      position={[0, 0, 0]}
    >
      {/* Phone base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial 
          color={new THREE.Color("#2C3E50")} 
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.9, 1.8, 0.01]} />
        <meshStandardMaterial 
          color={hovering ? new THREE.Color("#3CDDDB") : new THREE.Color("#2CA6A4")} 
          emissive={hovering ? new THREE.Color("#3CDDDB") : new THREE.Color("#2CA6A4")} 
          emissiveIntensity={0.8} 
          metalness={0.3}
          roughness={0.3}
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
          <meshStandardMaterial color={new THREE.Color(params[3] as string)} />
        </mesh>
      ))}
      
      {/* Animated Stock Chart */}
      {hovering && (
        <group position={[0, -0.4, 0.07]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 0.3, 0.01]} />
            <meshStandardMaterial color={new THREE.Color("#ffffff")} />
          </mesh>
          <mesh position={[-0.3, 0.05, 0.02]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color("#2ecc71")} emissive={new THREE.Color("#2ecc71")} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.15, 0.08, 0.02]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color("#2ecc71")} emissive={new THREE.Color("#2ecc71")} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.04, 0.02]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color("#2ecc71")} emissive={new THREE.Color("#2ecc71")} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.15, 0.12, 0.02]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color("#2ecc71")} emissive={new THREE.Color("#2ecc71")} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.3, 0.15, 0.02]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color("#2ecc71")} emissive={new THREE.Color("#2ecc71")} emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Float
        speed={3} // Animation speed
        rotationIntensity={0.2} // XYZ rotation intensity
        floatIntensity={0.5} // Up/down float intensity
      >
        <PhoneModel />
      </Float>
      
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

const ProductFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="products" className="section-padding py-24 bg-wealth-light relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDRjNmYwNSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')] opacity-30"></div>
        
        {[1, 2, 3, 4].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-wealth-teal/5"
            style={{
              top: `${20 + i * 25}%`,
              left: `${60 + (i % 2) * 20}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      <div className="wealth-container relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 text-wealth-navy mb-4 font-serif text-5xl font-bold">Our Product Suite</h2>
          <p className="text-wealth-gray text-lg">
            Comprehensive wealth management tools and services designed for the modern investor.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid gap-6 relative">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                >
                  <Card 
                    className={`feature-card border-none shadow hover:shadow-xl transition-all duration-500 overflow-hidden group ${
                      activeIndex === index ? 'scale-[1.02] z-10' : 'z-0'
                    }`}
                  >
                    {/* Glowing top border */}
                    <div className={`h-1 w-full bg-gradient-to-r from-wealth-teal via-wealth-navy to-wealth-gold transition-transform duration-700 ${
                      activeIndex === index ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                    
                    <CardContent className="flex items-start p-6 relative">
                      <div className={`mr-5 mt-1 p-3 rounded-xl transition-all duration-500 ${
                        activeIndex === index 
                          ? 'bg-wealth-teal text-white' 
                          : 'bg-wealth-teal bg-opacity-10 text-wealth-teal'
                      }`}>
                        <product.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-medium mb-2 text-wealth-navy group-hover:text-wealth-teal transition-colors">{product.title}</h3>
                        <p className="text-wealth-gray text-sm">{product.description}</p>
                        
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: activeIndex === index ? 1 : 0,
                            height: activeIndex === index ? 'auto' : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <Button 
                            variant="ghost" 
                            className="p-0 h-8 text-wealth-teal hover:text-wealth-navy hover:bg-transparent"
                            asChild
                          >
                            <a href={product.link} className="flex items-center">
                              Learn more
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                      
                      {/* Background pattern */}
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0H100V100H0V0Z" fill="url(#pattern0)"/>
                          <defs>
                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width=".2" height=".2">
                              <circle cx="0.1" cy="0.1" r="0.05" fill="#204C6F"/>
                            </pattern>
                          </defs>
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            ref={phoneRef}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-[280px] h-[580px]">
              {/* 3D Phone Model */}
              <div className="bg-wealth-navy rounded-[3rem] p-2 shadow-xl h-full w-full relative z-10">
                <div className="bg-black rounded-[2.5rem] overflow-hidden h-full w-full relative">
                  <div className="bg-wealth-navy h-10 flex justify-center items-center">
                    <div className="w-20 h-6 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="absolute inset-0 top-10">
                    <Suspense fallback={
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                        />
                      </div>
                    }>
                      <Canvas camera={{ position: [0, 0, 3] }} className="h-full w-full">
                        <Scene />
                      </Canvas>
                    </Suspense>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-wealth-gold opacity-50 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-8 -right-8 w-24 h-24 bg-wealth-teal opacity-50 rounded-full blur-xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* App features callouts */}
              <motion.div 
                className="absolute -left-32 top-1/4 bg-white p-3 rounded-lg shadow-lg text-sm w-28 text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <span className="text-wealth-teal font-medium">Real-time tracking</span>
                <div className="absolute w-6 h-0.5 bg-wealth-teal right-[-24px] top-1/2"></div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-36 top-2/3 bg-white p-3 rounded-lg shadow-lg text-sm w-32 text-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-wealth-navy font-medium">Instant notifications</span>
                <div className="absolute w-6 h-0.5 bg-wealth-navy left-[-24px] top-1/2"></div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-40 top-1/4 bg-white p-3 rounded-lg shadow-lg text-sm w-36 text-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4 }}
              >
                <span className="text-wealth-gold font-medium">Smart portfolio insights</span>
                <div className="absolute w-6 h-0.5 bg-wealth-gold left-[-24px] top-1/2"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
