import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Video,
  Shield,
  Users,
  Zap,
  Instagram,
  Twitter,
  Menu,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Pattern */}
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[#ece0ed] [background:radial-gradient(125%_125%_at_50%_10%,#ece0ed_30%,#b4a2e0_100%)]"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-20 bg-[#ece0ed]/80 backdrop-blur-md border-b">
          <div className="mx-auto width-full">
            <div className="flex items-center justify-between h-16 px-16">
              {/* Logo */}
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="BlazeTV Logo"
                  width={200}
                  height={80}
                  className="h-10 w-auto"
                />
              </div>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#guidelines"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  Guidelines
                </a>
                <Link href="/meet">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-200">
                    Start Chat
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
              Connect Instantly
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Real-time video chat with people around the world. No signups, no
              BS - just genuine conversations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/meet">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                >
                  <Video className="mr-3 h-5 w-5" />
                  Start Chatting Now
                </Button>
              </Link>
              <a href="#guidelines">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-10 py-6 text-lg rounded-2xl transition-all duration-300"
                >
                  <Users className="mr-3 h-5 w-5" />
                  See Guidelines
                </Button>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Instant Connection
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect with strangers in seconds. No waiting, no delays.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Safe & Secure
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Your privacy matters. Anonymous chats with built-in safety
                  features.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  HD Video Quality
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Crystal clear video and audio for the best chat experience.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Community Guidelines */}
          <Card
            id="guidelines"
            className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-12 rounded-2xl"
          >
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Community Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center">
                    <span className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                      ✓
                    </span>
                    Do:
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3 mt-1">•</span>
                      Be respectful and kind
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3 mt-1">•</span>
                      Keep conversations appropriate
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3 mt-1">•</span>
                      Report inappropriate behavior
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-3 mt-1">•</span>
                      Have fun and make connections
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                    <span className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                      ✗
                    </span>
                    Don&apos;t:
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      Share personal information
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      Use inappropriate language
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      Engage in harassment
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      Share explicit content
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Ready to Meet Someone New?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-xl mx-auto">
              Join thousands of people having real conversations right now.
            </p>
            <Link href="/meet">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                <Video className="mr-3 h-6 w-6" />
                Start Your First Chat
              </Button>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center relative z-10">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <a
                href="https://www.instagram.com/blazetv.live"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
              >
                <Instagram className="h-6 w-6 text-slate-600 group-hover:text-pink-500 transition-colors duration-300" />
              </a>
              <a
                href="https://x.com/LiveBlazetv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
              >
                <Twitter className="h-6 w-6 text-slate-600 group-hover:text-blue-500 transition-colors duration-300" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © 2025 BlazeTV. Connect responsibly.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
