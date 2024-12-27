import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RangeSlider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/trpc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { FormValues } from "@/components/search/form.tsx";
const visibleCount = 3;

export function AdditionalFilters() {
  const form = useFormContext<FormValues>();
  const [filters] = trpc.vehicles.options.useSuspenseQuery();
  const { makes, classifications, passengerCounts } = filters;

  const [showClassifications, setShowClassifications] = useState(false);
  const [showMakes, setShowMakes] = useState(false);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="w-full max-w-sm mx-auto">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 pb-4"
          >
            Hourly price range:
          </label>
          <Controller
            name="price"
            control={form.control}
            render={({ field }) => (
              <>
                <RangeSlider
                  id="price"
                  defaultValue={[0, 100]}
                  onValueCommit={(value) => field.onChange(value)}
                  min={10}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <span className="block text-lg font-bold text-back mt-1">
                  ${field.value[0]} - ${field.value[1]}{" "}
                </span>
              </>
            )}
          />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <label
            htmlFor="minPassengers"
            className="block text-sm font-medium text-gray-700 pb-4"
          >
            Min passenger Count:
          </label>
          <Controller
            name="minPassengers"
            control={form.control}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  {passengerCounts.map((count) => (
                    <SelectItem key={count} value={String(count)}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <label className="block text-sm font-medium text-gray-700 pb-4">
            Vehicle Classifications:
          </label>
          <FormField
            control={form.control}
            name="classification"
            render={({ field }) => (
              <FormItem>
                {classifications
                  .slice(
                    0,
                    showClassifications ? classifications.length : visibleCount
                  )
                  .map((classification, index) => (
                    <FormItem
                      key={index}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(classification)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...field.value, classification])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== classification
                                  )
                                )
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {classification}
                      </FormLabel>
                    </FormItem>
                  ))}
                {classifications.length > visibleCount && (
                  <button
                    type="button"
                    className="text-blue-500 underline mt-2"
                    onClick={() => setShowClassifications(!showClassifications)}
                  >
                    {showClassifications ? "Show Less" : "Show More"}
                  </button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <label className="block text-sm font-medium text-gray-700 pb-4">
            Vehicle Makes:
          </label>
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                {makes
                  .slice(0, showMakes ? makes.length : visibleCount)
                  .map((make, index) => (
                    <FormItem
                      key={index}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(make)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...field.value, make])
                              : field.onChange(
                                  field.value.filter((value) => value !== make)
                                )
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{make}</FormLabel>
                    </FormItem>
                  ))}
                {makes.length > visibleCount && (
                  <button
                    type="button"
                    className="text-blue-500 underline mt-2"
                    onClick={() => setShowMakes(!showMakes)}
                  >
                    {showMakes ? "Show Less" : "Show More"}
                  </button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
