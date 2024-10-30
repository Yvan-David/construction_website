import { useEffect } from "react";

import axiosClient from "../../hooks/AxiosInstance";
import { toast } from "react-toastify";

const SellerDashboardStats = () => {

  const notify = (message: string) => toast(message);

  const client = axiosClient();

  useEffect(() => {
    const fetchCollections = async () => {
      try {

        const response = await client.get("/collections");
        const { totalPages, limit } = response.data.pagination;
        let collectionsCount = response.data.collections.length;
        for (let page = 2; page <= totalPages; page++) {
          const res = await client.get(`/collections?page=${page}&limit=${limit}`);
          collectionsCount += res.data.collections.length;
        }
      } catch (err: any) {
        notify(err.response ? err.response.data.message : "Fetching collections failed");
      } finally {
      }
    };

    fetchCollections();
  }, []);



  return (
    <div className="bg-white shadow-md rounded-md p-4 flex-1 text-xs">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
      {/* <div className="flex flex-wrap justify-around gap-4">
        {isLoading
          ? "Loading..."
          : stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-md flex items-center border border-gray-300 flex-1 min-w-[200px] sm:w-[calc(25%-1rem)] md:w-[calc(20%-1rem)] lg:w-[calc(20%-1rem)]"
              >
                <div className="p-3 rounded-full bg-white shadow-md mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600">{stat.title}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
              </div>
            ))}
      </div> */}
    </div>
  );
};

export default SellerDashboardStats;