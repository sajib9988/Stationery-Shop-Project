import { MonthlySalesGraph } from "./MonthlySalesGraph";
import OrderHistoryGraph from "./OrderHistoryGraph";

const AdminDashboardIndex = () => {
  return (
    <div className="flex flex-col gap-2">
      <div> <MonthlySalesGraph ></MonthlySalesGraph>
      </div>
      <div>
        <OrderHistoryGraph />
      </div>
     

    </div>
  );
};

export default AdminDashboardIndex;