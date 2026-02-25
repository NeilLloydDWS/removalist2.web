import { Truck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
     <Image src="/logo_3.png" alt="VanMan" width={100} height={100} />
      <span className="text-xl font-bold tracking-tight p-0 m-0" style={{ color: "#152C5A" }}>Van<span style={{ color: "#EE7628" }}>M<span style={{ color: "#EE7628" }}>an</span></span></span>
      {/* <Image src="/logo_4.png" alt="VanMan" width={100} height={100} />
      <span className="text-xl font-bold tracking-tight p-0 m-0" style={{ color: "#53B2DF" }}>Van<span style={{ color: "#FA8006" }}>M<span style={{ color: "#464647" }}>an</span></span></span>
     */}
     <span className="text-xl font-bold tracking-tight p-0 m-0" style={{ color: "#464647" }}>Solutions</span>
    </Link>
  );
}

export function LogoVertical({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex flex-col items-start gap-2", className)}>
     <Image src="/logo_3.png" alt="VanMan" width={100} height={100} />
      <div>
        <span className="text-xl font-bold tracking-tight p-0 m-0" style={{ color: "#152C5A" }}>Van<span style={{ color: "#EE7628" }}>M<span style={{ color: "#EE7628" }}>an</span></span></span>
        <span className="text-xl font-bold tracking-tight p-0 m-0" style={{ color: "#464647" }}> Solutions</span>
      </div>
    </Link>
  );
}
