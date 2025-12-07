import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Globe, Award, Heart, Zap, ArrowRight } from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former Software Engineer at Tech Giants",
    avatar: "SC",
  },
  {
    name: "Michael Brown",
    role: "Head of Curriculum",
    bio: "PhD in Education Technology",
    avatar: "MB",
  },
  {
    name: "Jane Williams",
    role: "Chief Design Officer",
    bio: "Award-winning UX Designer",
    avatar: "JW",
  },
  {
    name: "Alex Johnson",
    role: "VP of Engineering",
    bio: "10+ Years in Software Development",
    avatar: "AJ",
  },
];

const values = [
  {
    icon: Heart,
    title: "Student-Centric",
    description: "We put learners first in everything we do.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Making quality education accessible to everyone, everywhere.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly improving and adapting to new learning needs.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to the highest standards of quality and delivery.",
  },
];

const stats = [
  { number: "500K+", label: "Active Learners" },
  { number: "1000+", label: "Expert Instructors" },
  { number: "5000+", label: "Courses Available" },
  { number: "50+", label: "Countries Reached" },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">LearnHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/about" className="text-primary font-medium">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10">
            About Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Transforming Education Through Technology
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Founded in 2020, LearnHub is dedicated to making world-class education 
            accessible to everyone, regardless of their background or location.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Story</h2>
          <div className="space-y-6 text-muted-foreground">
            <p>
              LearnHub was born from a simple idea: education should be accessible to everyone. 
              Our founders, a group of passionate educators and technologists, believed that 
              geographic location and financial constraints shouldn't limit anyone's potential.
            </p>
            <p>
              In 2020, we launched with just 50 courses and a handful of expert instructors. 
              Today, we've grown to serve over 500,000 learners across 50+ countries, with 
              thousands of courses spanning every discipline imaginable.
            </p>
            <p>
              But our growth isn't about numbers. It's about impact. Every day, we hear stories 
              from learners who've changed their lives through our platform—career switchers who 
              landed their dream jobs, entrepreneurs who launched successful startups, and students 
              who accelerated their academic careers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Core Values</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            These principles guide everything we do at LearnHub.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Leadership Team</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Meet the people behind LearnHub.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="h-20 w-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Be part of a global community of learners and educators transforming lives through education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Explore Courses
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">LearnHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
