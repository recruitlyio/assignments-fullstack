import Link from "next/link";
import { FC, Fragment } from "react";

export type TBreadCrumbItem = {
  text: string;
  link: string;
  linkDisabled?: boolean;
};

export interface IBreadCrumbsProps {
  items: TBreadCrumbItem[];
}

export const BreadCrumbs: FC<IBreadCrumbsProps> = ({ items }) => {
  return (
    <div>
      <p className="flex items-center space-x-1 text-gray-500 text-sm">
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>&gt;</span>}
            {item.linkDisabled ? (
              <span className="text-black">{item.text}</span>
            ) : (
              <Link href={item.link}>
                {" "}
                <span className="text-primary hover:text-black">
                  {item.text}
                </span>
              </Link>
            )}
          </Fragment>
        ))}
      </p>
    </div>
  );
};
