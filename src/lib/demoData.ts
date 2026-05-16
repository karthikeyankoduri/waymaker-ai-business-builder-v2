import { Project } from '../types';

export const DEMO_PROJECT: Project = {
  id: 'demo-ecotrack-2024',
  name: 'EcoTrack - Carbon Footprint Tracker',
  idea: 'A mobile app that helps users track and reduce their carbon footprint through daily activities, gamification, and community challenges.',
  industry: 'Sustainability Tech',
  targetAudience: 'Environmentally conscious millennials and Gen Z',
  location: 'Global',
  createdAt: new Date().toISOString(),
  
  marketResearch: `# Market Analysis for EcoTrack

## Executive Summary
EcoTrack addresses the growing demand for personal carbon management tools in a market projected to reach $10.5B by 2027. Our mobile-first approach targets the 73% of millennials willing to pay more for sustainable products.

## Total Addressable Market (TAM)
The global carbon footprint management market is valued at **$10.5 billion** and growing at 6.2% CAGR through 2027.

## Serviceable Addressable Market (SAM)
Mobile sustainability apps segment: **$2.1 billion**
- Consumer carbon tracking: $850M
- B2B2C corporate wellness: $720M
- Educational institutions: $530M

## Serviceable Obtainable Market (SOM)
Target first-year capture: **$15 million** (0.7% of SAM)
- 500K active users at $30 annual subscription
- Realistic given competitor user bases and marketing budget

## Key Market Opportunities

### 1. Rising Climate Awareness
- 85% of Gen Z considers climate change when making purchases
- 73% of millennials willing to pay premium for sustainable products
- Corporate ESG mandates driving B2B2C adoption

### 2. Regulatory Tailwinds
- EU Carbon Border Adjustment Mechanism (2026)
- California SB 253 climate disclosure requirements
- Growing carbon credit markets ($2B in 2023)

### 3. Technology Convergence
- IoT device integration (smart homes, EVs)
- AI-powered personalized recommendations
- Blockchain for carbon credit verification

## Competitive Landscape

### Direct Competitors
1. **Carbon Footprint Ltd** - 2M users, outdated UX
2. **JouleBug** - Strong gamification, US-only
3. **Capture** - Premium positioning, limited features

### Market Gaps
- No comprehensive IoT integration
- Limited social/community features
- Poor mobile experience across competitors
- Lack of corporate wellness integration

## Growth Strategy
1. **Phase 1 (Months 1-6)**: Consumer app launch, influencer partnerships
2. **Phase 2 (Months 7-12)**: B2B2C corporate wellness program
3. **Phase 3 (Year 2)**: International expansion, carbon credit marketplace`,

  competitors: [
    {
      name: 'Carbon Footprint Ltd',
      strengths: [
        'Established brand since 2007',
        'Large user base (2M+ users)',
        'Strong corporate partnerships',
        'Comprehensive carbon calculator'
      ],
      weaknesses: [
        'Outdated UI/UX design',
        'Limited mobile functionality',
        'No gamification features',
        'Slow feature development'
      ],
      gap: 'Modern mobile-first experience with social engagement, gamification, and real-time IoT device integration'
    },
    {
      name: 'JouleBug',
      strengths: [
        'Excellent gamification system',
        'Strong community features',
        'Educational content library',
        'Corporate challenge platform'
      ],
      weaknesses: [
        'US-only focus (no international)',
        'Limited tracking accuracy',
        'No API/IoT integrations',
        'Dated visual design'
      ],
      gap: 'Global reach with precise IoT-based tracking, modern design, and international carbon credit support'
    },
    {
      name: 'Capture',
      strengths: [
        'Premium brand positioning',
        'Beautiful UI design',
        'Carbon offset marketplace',
        'Subscription model proven'
      ],
      weaknesses: [
        'Limited free tier',
        'Expensive ($12/month)',
        'Few tracking categories',
        'No B2B offering'
      ],
      gap: 'Freemium model with comprehensive tracking, B2B2C corporate wellness, and affordable premium tier ($4.99/month)'
    }
  ],

  websiteCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoTrack - Track Your Carbon Footprint</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
    </style>
</head>
<body class="bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <span class="text-2xl">🌱</span>
                </div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">EcoTrack</h1>
            </div>
            <div class="hidden md:flex gap-6 items-center">
                <a href="#features" class="text-gray-700 hover:text-green-600 transition">Features</a>
                <a href="#how-it-works" class="text-gray-700 hover:text-green-600 transition">How It Works</a>
                <a href="#pricing" class="text-gray-700 hover:text-green-600 transition">Pricing</a>
                <button class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105">
                    Get Started
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
                <div class="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    🌍 Join 10,000+ Climate Champions
                </div>
                <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Track Your Impact.<br/>
                    <span class="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Change The World.</span>
                </h2>
                <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                    Join thousands making a difference. Track your carbon footprint, 
                    compete with friends, and earn rewards for sustainable choices.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <button class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition transform hover:scale-105">
                        Download App
                    </button>
                    <button class="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-green-50 transition">
                        Watch Demo
                    </button>
                </div>
                <div class="flex gap-8 mt-8 text-sm text-gray-600">
                    <div>
                        <div class="text-2xl font-bold text-green-600">2.5M+</div>
                        <div>Tons CO₂ Saved</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-green-600">10K+</div>
                        <div>Active Users</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-green-600">4.8★</div>
                        <div>App Rating</div>
                    </div>
                </div>
            </div>
            <div class="relative float-animation">
                <div class="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-8 shadow-2xl">
                    <div class="bg-white rounded-2xl p-6 space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Today's Impact</span>
                            <span class="text-green-600 font-bold">-2.3 kg CO₂</span>
                        </div>
                        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-green-500 to-teal-500 w-3/4"></div>
                        </div>
                        <div class="grid grid-cols-3 gap-4 pt-4">
                            <div class="text-center">
                                <div class="text-2xl mb-1">🚗</div>
                                <div class="text-xs text-gray-600">Transport</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl mb-1">🍽️</div>
                                <div class="text-xs text-gray-600">Food</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl mb-1">⚡</div>
                                <div class="text-xs text-gray-600">Energy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h3 class="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h3>
                <p class="text-xl text-gray-600">Powerful features to help you live sustainably</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-6 rounded-2xl border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transition">
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <span class="text-2xl">📊</span>
                    </div>
                    <h4 class="text-xl font-bold mb-2">Smart Tracking</h4>
                    <p class="text-gray-600">Automatic tracking via IoT devices, smart home integration, and manual logging</p>
                </div>
                <div class="p-6 rounded-2xl border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transition">
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <span class="text-2xl">🎮</span>
                    </div>
                    <h4 class="text-xl font-bold mb-2">Gamification</h4>
                    <p class="text-gray-600">Earn points, unlock achievements, and compete with friends on leaderboards</p>
                </div>
                <div class="p-6 rounded-2xl border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transition">
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <span class="text-2xl">🌳</span>
                    </div>
                    <h4 class="text-xl font-bold mb-2">Carbon Offsets</h4>
                    <p class="text-gray-600">Purchase verified carbon credits and support reforestation projects</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-gradient-to-r from-green-600 to-teal-600">
        <div class="max-w-4xl mx-auto text-center text-white">
            <h3 class="text-4xl font-bold mb-6">Ready to Make a Difference?</h3>
            <p class="text-xl mb-8 opacity-90">Join thousands of users reducing their carbon footprint today</p>
            <button class="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition transform hover:scale-105">
                Start Free Trial
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 px-4">
        <div class="max-w-7xl mx-auto text-center">
            <div class="flex items-center justify-center gap-2 mb-4">
                <span class="text-2xl">🌱</span>
                <span class="text-xl font-bold">EcoTrack</span>
            </div>
            <p class="text-gray-400 mb-4">Making sustainability accessible for everyone</p>
            <div class="flex justify-center gap-6 text-sm text-gray-400">
                <a href="#" class="hover:text-white transition">Privacy</a>
                <a href="#" class="hover:text-white transition">Terms</a>
                <a href="#" class="hover:text-white transition">Contact</a>
            </div>
        </div>
    </footer>
</body>
</html>`,

  marketingKit: [
    {
      platform: 'Instagram',
      content: '🌱 Every small action counts! Track your carbon footprint with EcoTrack and join a community of changemakers.\n\n✨ What you get:\n• Real-time carbon tracking\n• Compete with friends\n• Earn eco-rewards\n• Make a real impact\n\nDownload now and start your sustainability journey! 🌍✨\n\nLink in bio 👆',
      hashtags: ['#EcoTrack', '#Sustainability', '#CarbonFootprint', '#ClimateAction', '#GreenLiving', '#EcoFriendly', '#ZeroWaste', '#SustainableLiving'],
      imagePrompt: 'Modern smartphone displaying a beautiful green sustainability app interface with carbon tracking metrics, nature background with trees and clean air, vibrant colors, professional photography, Instagram-worthy aesthetic'
    },
    {
      platform: 'LinkedIn',
      content: 'Introducing EcoTrack: The future of personal carbon management 🌍\n\nOur AI-powered platform helps individuals and organizations track, reduce, and offset their environmental impact with unprecedented accuracy.\n\nKey Features:\n✅ Real-time IoT device integration\n✅ Gamified sustainability challenges\n✅ Corporate wellness programs\n✅ Verified carbon offset marketplace\n\nJoin 10,000+ users already making a difference. Perfect for:\n• Sustainability-focused professionals\n• Corporate ESG initiatives\n• Environmental organizations\n• Climate-conscious consumers\n\nReady to transform your carbon strategy? Learn more at ecotrack.app\n\n#Sustainability #ClimateAction #GreenTech #ESG #CarbonNeutral #CorporateResponsibility',
      hashtags: ['#Sustainability', '#ClimateAction', '#GreenTech', '#ESG', '#CarbonNeutral'],
      imagePrompt: 'Professional infographic showing carbon reduction statistics and app interface, corporate style, clean design, data visualization, business professional aesthetic, LinkedIn banner format'
    },
    {
      platform: 'Twitter',
      content: '🌍 Small changes = Big impact\n\n✅ Track daily carbon footprint\n✅ Compete with friends\n✅ Earn eco-rewards\n✅ Support reforestation\n\nJoin 10K+ users making a difference with EcoTrack 🌱\n\nFree download 👇\necotrack.app',
      hashtags: ['#ClimateAction', '#Sustainability', '#EcoTech'],
      imagePrompt: 'Eye-catching graphic with carbon footprint reduction statistics, modern design, green and blue color scheme, Twitter card format, bold typography, engaging visual'
    },
    {
      platform: 'Facebook',
      content: '🌱 Ready to make a real difference for our planet?\n\nEcoTrack makes sustainability fun and rewarding! 🌍💚\n\nWhat makes us different:\n🎯 Automatic tracking via smart devices\n🏆 Fun challenges and achievements\n👥 Community of 10,000+ eco-warriors\n🌳 Direct support for reforestation projects\n💰 Earn rewards for sustainable choices\n\nDownload the app today and join our growing community of environmental champions!\n\n👉 Available on iOS and Android\n👉 Free to start, premium features available\n👉 Rated 4.8 stars by users\n\nTogether, we can create a sustainable future! 🌍✨',
      hashtags: ['#EcoTrack', '#Sustainability', '#GreenLiving', '#ClimateAction', '#EcoFriendly'],
      imagePrompt: 'Friendly, approachable image of diverse people using the app outdoors in nature, bright and inviting atmosphere, community feeling, Facebook post format, warm colors'
    }
  ],

  fundingOpportunities: [
    {
      type: 'Accelerator',
      name: 'Y Combinator',
      amount: '$500,000',
      description: 'Leading startup accelerator with strong focus on climate tech and consumer applications. 3-month program with mentorship and demo day.',
      matchReason: 'Perfect fit for early-stage climate tech with strong product-market fit and scalable B2C model. YC has funded similar sustainability apps.',
      link: 'https://www.ycombinator.com/apply'
    },
    {
      type: 'Grant',
      name: 'Google.org Impact Challenge',
      amount: '$1,000,000',
      description: 'Supporting tech solutions for climate change with focus on measurable impact and scalability.',
      matchReason: 'Aligns perfectly with mobile-first climate action initiatives. Strong emphasis on technology innovation and user engagement.',
      link: 'https://www.google.org/impactchallenge/'
    },
    {
      type: 'VC Fund',
      name: 'Breakthrough Energy Ventures',
      amount: '$2,000,000 - $5,000,000',
      description: 'Bill Gates-backed climate tech fund investing in scalable solutions for carbon reduction.',
      matchReason: 'Focus on scalable consumer climate solutions with potential for significant carbon impact. Track record with similar B2C climate apps.',
      link: 'https://www.breakthroughenergy.org/'
    },
    {
      type: 'Angel Network',
      name: 'Climate Angels',
      amount: '$250,000 - $500,000',
      description: 'Network of angel investors focused exclusively on climate tech startups.',
      matchReason: 'Ideal for seed round with investors who understand climate tech market dynamics and consumer behavior.',
      link: 'https://www.climateangels.com/'
    }
  ],

  chatHistory: [],
  
  webhookUrl: '',
  zapierWebhookUrl: ''
};

// Made with Bob
