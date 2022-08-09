import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeverageInfo, extractBeverageInfoFromUrl } from "../utils/extractBeverageInfoFromUrl";

interface BeverageBreadcrumbsProps {
  beverageCategories?: BeverageInfo;
}

const BeverageBreadcrumbs = ({ beverageCategories }: BeverageBreadcrumbsProps): JSX.Element => {
  const urlParams = useParams();
  const [beverageInfo, setBeverageInfo] = useState<BeverageInfo>();

  const searchActions = useSearchActions();

  useEffect(() => {
    const { alcoholType, category, subCategory, beverageId } = beverageCategories
      ? beverageCategories
      : extractBeverageInfoFromUrl(urlParams);

    setBeverageInfo({ alcoholType, category, subCategory, beverageId });
  }, [urlParams, beverageCategories]);

  const renderPageLink = (label?: string, to?: string, first?: boolean): JSX.Element => {
    if (!label) return <></>;
    label = label
      .toLowerCase()
      .replaceAll("-", " ")
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    if (to) {
      return (
        <span>
          {!first && <span className="mx-2">/</span>}
          <Link
            className="text-toast-dark-orange hover:underline"
            to={to}
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
        <span>
          <span className="mx-2">/</span>
          <span>{label}</span>
        </span>
      );
    }
  };

  if (!beverageInfo?.alcoholType) {
    return <></>;
  }

  return (
    <div>
      {renderPageLink("Toast", "/", true)}
      {renderPageLink(
        beverageInfo.alcoholType,
        beverageInfo.category && beverageInfo.category !== "all"
          ? `/${beverageInfo.alcoholType}/all`
          : undefined
      )}
      {beverageInfo.category &&
        beverageInfo.category !== "all" &&
        renderPageLink(
          beverageInfo.category,
          beverageInfo.subCategory || beverageInfo.beverageId
            ? `/${beverageInfo.alcoholType}/${beverageInfo.category?.replaceAll(" ", "-")}`
            : undefined
        )}
      {renderPageLink(
        beverageInfo.subCategory,
        beverageInfo.beverageId
          ? `/${beverageInfo.alcoholType}/${beverageInfo.category?.replaceAll(
              " ",
              "-"
            )}/${beverageInfo.subCategory?.replaceAll(" ", "-")}`
          : undefined
      )}
    </div>
  );
};

export default BeverageBreadcrumbs;
