import { isBrowser } from "@acme/shared";

export type DisplayType = "grid" | "list";

export function setProjectSearchPerPage(perPage: number) {
  if (isBrowser()) {
    localStorage.setItem("projectSearchPerPage", perPage.toString());
  }
}

export function getProjectSearchPerPage() {
  if (isBrowser()) {
    const perPage = localStorage.getItem("projectSearchPerPage");
    if (perPage) {
      return parseInt(perPage);
    }
  }
  return 9;
}

export function setProjectSearchDisplayType(displayType: string) {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem("projectSearchDisplayType", displayType);
}

export function getProjectSearchDisplayType(): DisplayType {
  if (isBrowser()) {
    const displayType = localStorage.getItem("projectSearchDisplayType");
    if (displayType) {
      return displayType as DisplayType;
    }
  }
  return "grid";
}
