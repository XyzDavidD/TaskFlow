"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Zap, Shield, Users, BarChart3, Calendar, Kanban, Star, Play, Check, Sparkles } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    {
      icon: <Kanban className="h-6 w-6" />,
      title: "Drag & Drop Kanban",
      description: "Intuitive task management with smooth drag-and-drop functionality across customizable boards",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Calendar",
      description: "View and manage tasks with beautiful calendar integration and deadline tracking",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Track productivity with detailed insights, reports, and performance metrics",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Seamless collaboration with real-time updates, comments, and notifications",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with advanced encryption, SSO, and compliance features",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with instant loading, offline support, and smooth animations",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "SJ",
      content: "TaskFlow transformed how our team manages projects. The intuitive interface and powerful features make it indispensable for our daily workflow.",
      rating: 5,
      company: "TechCorp"
    },
    {
      name: "Michael Chen",
      role: "CEO at StartupXYZ",
      avatar: "MC",
      content: "The best task management tool we've ever used. The analytics and reporting features gave us insights we never had before.",
      rating: 5,
      company: "StartupXYZ"
    },
    {
      name: "Emily Rodriguez",
      role: "Design Lead at CreativeCo",
      avatar: "ER",
      content: "Beautiful design meets incredible functionality. TaskFlow makes project management actually enjoyable and our team more productive.",
      rating: 5,
      company: "CreativeCo"
    }
  ]

  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="h-5 w-5" /> },
    { number: "1M+", label: "Tasks Completed", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="h-5 w-5" /> },
    { number: "4.9/5", label: "User Rating", icon: <Star className="h-5 w-5" /> }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals and small teams getting started",
      features: [
        "Up to 3 projects",
        "5 team members",
        "Basic kanban boards",
        "Mobile app access",
        "Email support"
      ],
      popular: false,
      buttonText: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$12",
      period: "per user/month",
      description: "Advanced features for growing teams and businesses",
      features: [
        "Unlimited projects",
        "Unlimited team members",
        "Advanced analytics",
        "Calendar integration",
        "Priority support",
        "Custom workflows",
        "Time tracking"
      ],
      popular: true,
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Custom solutions for large organizations",
      features: [
        "Everything in Pro",
        "SSO & advanced security",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom training",
        "SLA guarantee"
      ],
      popular: false,
      buttonText: "Contact Sales"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 safe-area-inset">
          <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Kanban className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>
              
              <div className="flex items-center gap-2 lg:gap-8">
                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-base"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('pricing')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-base"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-base"
                  >
                    About
                  </button>
                </div>
                
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 text-sm lg:text-base px-3 lg:px-4 py-2 touch-manipulation">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 mr-1" />
              Now with AI-powered insights
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              Project Management
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of task management with our beautiful, intuitive platform that transforms chaos into clarity.
            </p>
            
            <div className="flex flex-col gap-4 justify-center items-center mb-16">
              <Link href="/auth" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 rounded-xl shadow-xl shadow-blue-500/25 touch-manipulation"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 bg-white/50 backdrop-blur-sm text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 rounded-xl shadow-lg touch-manipulation"
              >
                <Play className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                >
                  <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-2 text-blue-600">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage projects efficiently and beautifully
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white transition-all duration-300 transform hover:scale-105 group h-full shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-gray-900 text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your team. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-white border-2 transition-all duration-300 transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/25' 
                    : 'border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105'
                        : 'variant-outline hover:bg-blue-50'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About/Testimonials Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their TaskFlow experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* About Content */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">About TaskFlow</h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              TaskFlow was born from the frustration of using clunky, outdated project management tools. 
              We believe that beautiful design and powerful functionality shouldn't be mutually exclusive. 
              Our mission is to create the most intuitive, efficient, and enjoyable task management experience possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Team-First</h4>
                <p className="text-gray-600">Built for collaboration and seamless teamwork</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h4>
                <p className="text-gray-600">Optimized for speed and performance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Secure</h4>
                <p className="text-gray-600">Enterprise-grade security you can trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using TaskFlow to boost productivity and streamline collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 rounded-xl shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <p className="text-blue-200 text-sm">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Kanban className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                TaskFlow
              </h1>
            </div>
            
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span>© 2025 TaskFlow. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}