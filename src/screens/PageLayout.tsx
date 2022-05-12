import { ToastHeader } from "../components/ToastHeader";

interface PageLayoutProps {
  children?: JSX.Element;
}
export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <ToastHeader />
      {children}
    </>
  );
};
