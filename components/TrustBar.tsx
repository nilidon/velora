import { ShieldCheck, Sparkles, Star, Clock } from "lucide-react";
import { site } from "@/lib/site";

const items = [
  { icon: Star, label: `${site.rating} on Google` },
  { icon: ShieldCheck, label: "Licensed & insured" },
  { icon: Clock, label: "15-minute callback" },
  { icon: Sparkles, label: "Eco-friendly products" },
];

export function TrustBar() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon size={16} className="text-gold" />
          {label}
        </div>
      ))}
    </div>
  );
}
