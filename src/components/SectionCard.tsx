import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from 'react';

interface SectionCardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

const SectionCard = ({ title, icon, children, className }: SectionCardProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default SectionCard;