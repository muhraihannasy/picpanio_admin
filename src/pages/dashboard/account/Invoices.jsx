import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import Loading from "../../../components/loading";

const Invoices = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      {/* Header */}
      <HeaderDashboardComponent />

      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      <main>
        <section className="mt-[37px]"></section>
      </main>
    </div>
  );
};

export default Invoices;
