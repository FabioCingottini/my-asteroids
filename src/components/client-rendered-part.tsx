"use client";

import dayjs from 'dayjs';
import React, {FC, useEffect, useMemo, useState} from "react";
import {Grid} from "@/components/grid";
import {DEFAULT_END_DATE, DEFAULT_START_DATE, QueryParamsEnum} from "@/utils/constants";
import {Validators} from "@/utils/validators";
import {z} from "zod";
import cn from "classnames";
import {DatePicker} from "@/components/date-picker";
import {TextInput} from "@/components/text-input";
import {Button} from "@/components/button";
import {SectionAsteroidsList} from "@/components/section-asteroids-list";

type ClientRenderedPart = FC<{}>
export const ClientRenderedPart: ClientRenderedPart = ({}) => {
  const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

  // - maximum difference between start and end date is 7 days,
  // - start date can't be in the future
  // - start date can't be after end date
  const minStartDate = useMemo(() => {
    const today = dayjs();
    const endDateDayjs = dayjs(endDate);
    const endMinus7Days = endDateDayjs.subtract(7, 'day');
    const minStartDate = today.isBefore(endMinus7Days) ? today : endMinus7Days;
    return minStartDate.format('YYYY-MM-DD');
  }, [endDate]);

  // - maximum difference between start and end date is 7 days,
  // - end date can't be in the future
  // - end date can't be before start date
  const maxEndDate = useMemo(() => {
    const today = dayjs();
    const startDateDayjs = dayjs(startDate);
    const startPlus7Days = startDateDayjs.add(7, 'day');
    const maxEndDate = today.isBefore(startPlus7Days) ? today : startPlus7Days;
    return maxEndDate.format('YYYY-MM-DD');
  }, [startDate]);

  const [data, setData] = useState<z.infer<typeof Validators.nasaResponseAsteroidsApi.shape.near_earth_objects>>();
  const [filteredAndSortedData, setFilteredAndSortedData] = useState<z.infer<typeof Validators.nasaResponseAsteroidsApi.shape.near_earth_objects>>();
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/asteroids?${QueryParamsEnum.START_DATE}=${startDate}&${QueryParamsEnum.END_DATE}=${endDate}`)
      const json = await response.json() as z.infer<typeof Validators.nasaResponseAsteroidsApi>;
      setData(json.near_earth_objects);
      setFilteredAndSortedData(json.near_earth_objects);
    })()
  }, [startDate, endDate]);

  const [textFilter, setTextFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(true); // true = A-Z, false = Z-A

  useEffect(() => {
    if (!data) return;
    const lowerCaseTextFilter = textFilter.toLowerCase();
    const filteredData = Object.fromEntries(
      Object.entries(data).map(([date, asteroids]) => {
        return [
          date,
          asteroids
            .filter(asteroid => asteroid.name.toLowerCase().includes(lowerCaseTextFilter))
            .sort((a, b) => {
              if (sortOrder) {
                return a.name.localeCompare(b.name);
              } else {
                return b.name.localeCompare(a.name);
            }
          })
        ];
      })
    );
    setFilteredAndSortedData(filteredData);
  }, [textFilter, sortOrder, data]);

  return (
    <Grid>
      <section
        className={cn(
          "flex flex-col md:flex-row gap-4 items-end",
          "col-span-full",
        )}
      >
        <DatePicker
          min={minStartDate}
          max={endDate}
          label={"Start Date"}
          value={startDate}
          setValue={setStartDate}
        />
        <DatePicker
          min={startDate}
          max={maxEndDate}
          label={"End Date"}
          value={endDate}
          setValue={setEndDate}
        />
        <TextInput
          placeholder={"Eg. my asteroid"}
          label={"Search by name"}
          value={textFilter}
          setValue={setTextFilter}
        />
        <Button
          disabled={sortOrder}
          onClick={() => setSortOrder(true)}
        >
          Sort A-Z
        </Button>
        <Button
          disabled={!sortOrder}
          onClick={() => setSortOrder(false)}
        >
          Sort Z-A
        </Button>
      </section>
      {filteredAndSortedData && <SectionAsteroidsList
        className={"col-span-full"}
        filteredAndSortedData={filteredAndSortedData}
      />}
    </Grid>
  );
}
