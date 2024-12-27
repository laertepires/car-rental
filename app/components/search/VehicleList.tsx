import { Pagination, trpc } from "@/trpc.ts";
import { useFormContext } from "react-hook-form";
import { combineDateTime, FormValues } from "@/components/search/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { formatCents } from "@/lib/formatters";

function PaginationButtons({ data }: { data: Pagination }) {
  const form = useFormContext<FormValues>();
  const page = form.watch("page");

  return (
    <div className="flex justify-center mt-6">
      <Button
        variant="link"
        onClick={() => form.setValue("page", page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="link"
        onClick={() => form.setValue("page", page + 1)}
        disabled={page === data.totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export function VehicleList() {
  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const price = form.watch("price");
  const page = form.watch("page");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime]
  );
  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime]
  );

  const [searchResponse] = trpc.vehicles.search.useSuspenseQuery(
    {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      page: Number(page),
      passengerCount: Number(minPassengers),
      classification: classification,
      make: make,
      priceMin: price[0],
      priceMax: price[1],
    },
    {
      keepPreviousData: true,
    }
  );

  if (searchResponse.vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">
          No vehicles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResponse.vehicles.map((vehicle) => {
          const bookNowParams = new URLSearchParams({
            id: vehicle.id,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
          });

          return (
            <div
              key={vehicle.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center text-gray-800">
                  {vehicle.make} {vehicle.model}
                </h2>
              </div>

              <img
                src={vehicle.thumbnail_url}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-48 object-cover px-4"
              />

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg text-gray-800">
                    {formatCents(vehicle.hourly_rate_cents)}
                    <span className="text-sm text-gray-600">/hr</span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="text-sm text-gray-600">Year:</span>{" "}
                    <span className="font-medium">{vehicle.year}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <span className="text-sm text-gray-600">Passengers:</span>{" "}
                    <span className="font-medium">
                      {vehicle.max_passengers}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-sm text-gray-600">Class:</span>{" "}
                    <span className="font-medium">
                      {vehicle.classification}
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-4">
                <Button
                  asChild
                  className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg"
                >
                  <Link
                    to={{
                      pathname: "review",
                      search: bookNowParams.toString(),
                    }}
                  >
                    Reserve Now
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <PaginationButtons data={searchResponse.pagination} />
    </div>
  );
}
