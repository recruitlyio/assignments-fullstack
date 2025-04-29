import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface Props {
   title: string;
   description: string;
   isOpen: boolean;
   onClose: () => void;
   children?: React.ReactNode;
}

const CustomDialog: React.FC<Props> = ({
   title,
   description,
   isOpen,
   onClose,
   children,
}) => {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>{children ?? <span>No Content Provided</span>}</div>
         </DialogContent>
      </Dialog>
   );
};

export default CustomDialog;
