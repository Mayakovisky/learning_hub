import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, CheckCircle, ArrowRight, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for beginners",
    features: [
      "Access to 100+ courses",
      "Basic certificates",
      "Email support",
      "30-day access to courses",
      "Offline viewing",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: 79,
    description: "Most popular choice",
    features: [
      "Access to 500+ courses",
      "Advanced certificates",
      "Priority support",
      "Lifetime access to courses",
      "Offline viewing",
      "1-on-1 mentoring sessions",
      "Course projects & assignments",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For organizations",
    features: [
      "Access to all 1000+ courses",
      "Enterprise certificates",
      "24/7 dedicated support",
      "Lifetime access",
      "Offline viewing",
      "Unlimited mentoring",
      "Advanced analytics",
      "Custom learning paths",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time. No hidden fees or long-term contracts.",
  },
  {
    question: "Do I get access to all courses with a subscription?",
    answer: "Yes, depending on your plan. Our Professional plan gives you access to 500+ courses, and Enterprise gives you all 1000+.",
  },
  {
    question: "Is there a free trial?",
    answer: "Absolutely! All new users get a 7-day free trial with full access to premium features.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes! You can change your plan anytime. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes! Save 20% when you choose annual billing instead of monthly.",
  },
];

export const Pricing = () => {
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
            <Link to="/pricing" className="text-primary font-medium">Pricing</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
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

      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey. All plans include a 7-day free trial.
          </p>
          
          {/* Toggle for billing period */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-muted-foreground">Monthly</span>
            <div className="bg-muted rounded-full p-1 flex items-center gap-1">
              <button className="px-6 py-2 rounded-full bg-primary text-white font-medium">Monthly</button>
              <button className="px-6 py-2 rounded-full text-muted-foreground hover:text-foreground">Annual (Save 20%)</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all ${
                  plan.highlighted
                    ? "md:scale-105 border-primary shadow-2xl"
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <Link to="/register" className="w-full block">
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? "gradient" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <div className="space-y-3 pt-6 border-t border-border">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-center mb-12">
              Have questions? We've got answers.
            </p>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to invest in yourself?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your 7-day free trial today. No credit card required.
          </p>
          <Link to="/register">
            <Button size="lg" variant="gradient">
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
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

export default Pricing;
