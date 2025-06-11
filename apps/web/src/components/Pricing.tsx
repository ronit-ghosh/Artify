import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface PlanType {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  buttonVariant?: "default" | "secondary";
  plan?: "basic" | "premium" | "free"
}

const PricingCard = ({
  title,
  price,
  features,
  highlighted = false,
  buttonVariant = "secondary",
  plan
}: PlanType) => (
  <Card className={`w-[300px] ${highlighted ? 'border-primary/50 bg-card/50 shadow-lg shadow-primary/20' : ''
    }`}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <p className="text-3xl font-bold">{price}</p>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Link href={`/buy-credits?plan=${plan}`}>
        <Button className="w-full" variant={buttonVariant}>
          Get Started
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export default function Pricing() {
  const plans: PlanType[] = [
    {
      title: "Free",
      price: "Free",
      features: [
        "1 AI Portraits",
        "Basic Styles",
        "24h Support",
        "Basic Export"
      ],
      plan: "free"
    },
    {
      title: "Basic",
      price: "₹2000",
      features: [
        "100 AI Portraits",
        "Premium Styles",
        "Priority Support",
        "HD Export",
        "Advanced Editing"
      ],
      highlighted: true,
      plan: "basic"
    },
    {
      title: "Premium",
      price: "₹5000",
      features: [
        "Unlimited Portraits",
        "Custom Styles",
        "Dedicated Support",
        "API Access",
        "Custom Integration"
      ],
      plan: "premium"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Simple, <span className="text-primary">Transparent</span> Pricing
        </h1>
        <p className="text-muted-foreground">
          Choose the perfect plan for your needs. No hidden fees.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, i) => (
          <PricingCard
            key={i}
            {...plan}
            buttonVariant={plan.highlighted ? "default" : "secondary"}
          />
        ))}
      </div>
    </div>
  );
}
