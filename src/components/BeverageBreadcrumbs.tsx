import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeverageCategory } from "../types/beverages";
import formatFilterName from "../utils/formatFilterName";
import { v4 as uuidv4 } from "uuid";

interface BeverageBreadcrumbsProps {
  beverageCategories?: BeverageCategory[];
}

const BeverageBreadcrumbs = ({ beverageCategories }: BeverageBreadcrumbsProps): JSX.Element => {
  const urlParams = useParams();
  const [categories, setCategories] = useState<{ label: string; path?: string }[]>([]);

  const searchActions = useSearchActions();

  useEffect(() => {
    const pathCategories: { label: string; path?: string }[] = [{ label: "Toast", path: "/" }];
    const { categoryA, categoryB, categoryC, categoryD } = urlParams;
    if (categoryA) {
      categoryB
        ? pathCategories.push({ label: formatFilterName(categoryA), path: `/${categoryA}/all` })
        : pathCategories.push({ label: formatFilterName(categoryA) });
    }
    if (categoryB) {
      categoryC
        ? pathCategories.push({
            label: formatFilterName(categoryB),
            path: `/${categoryA}/${categoryB}`,
          })
        : pathCategories.push({ label: formatFilterName(categoryB) });
    }
    if (categoryC) {
      categoryD
        ? pathCategories.push({
            label: formatFilterName(categoryC),
            path: `/${categoryA}/${categoryB}/${categoryC}`,
          })
        : pathCategories.push({ label: formatFilterName(categoryC) });
    }
    if (categoryD) {
      pathCategories.push({ label: formatFilterName(categoryD) });
    }

    setCategories(pathCategories);
  }, [urlParams, beverageCategories]);

  const renderPageLink = (label: string, to?: string, first?: boolean): JSX.Element => {
    if (to) {
      return (
        <span key={uuidv4()}>
          {!first && <span className="mx-2">/</span>}
          <Link
            className="text-toast-dark-orange hover:underline"
            to={to}
            // TODO: move logic to hook cleanup function
            onClick={() => {
              searchActions.resetFacets();
              searchActions.setSortBys([]);
            }}
          >
            {label}
          </Link>
        </span>
      );
    } else {
      return (
        <span key={uuidv4()}>
          <span className="mx-2">/</span>
          <span>{label}</span>
        </span>
      );
    }
  };

  return (
    <>
      {categories.map((category, index) =>
        renderPageLink(category.label, category.path, index === 0)
      )}
    </>
  );
};

export default BeverageBreadcrumbs;
