import { FC } from "react";
import { BreadCrumbs, TBreadCrumbItem } from "../breadcrumbs";

interface IPageHeadingProps {
  breadcrumbs: TBreadCrumbItem[];
  headingText: string;
}

export const PageHeading: FC<IPageHeadingProps> = ({
  breadcrumbs,
  headingText,
}) => {
  return (
    <div className="pt-4">
      <div>
        <h2 className="text-3xl">{headingText}</h2>
      </div>
      <div>
        <BreadCrumbs items={breadcrumbs} />
      </div>
    </div>
  );
};
