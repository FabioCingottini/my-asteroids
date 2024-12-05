import {FC} from "react";
import {z} from "zod";
import {Validators} from "@/utils/validators";
import {H3, P} from "@/components/typography";
import cn from "classnames";
import Link from "next/link";

type SectionAsteroidsList = FC<{
  filteredAndSortedData: z.infer<typeof Validators.nasaResponseAsteroidsApi.shape.near_earth_objects>;
  className?: string;
}>
export const SectionAsteroidsList: SectionAsteroidsList = ({filteredAndSortedData, className}) => {
  return Object.entries(filteredAndSortedData).map(([date, asteroids]) => {
    return (
      <section
        key={date}
        className={cn(
          "flex flex-col justify-center items-center",
          className
        )}
      >
        <H3 className={"mb-4"}>Asteroids spotted on {date}</H3>
        <ul
          className={cn(
            "w-full",
            "flex flex-col",
            "gap-2",
          )}
        >
          {asteroids.map(asteroid => {
            return (
              <li
                key={asteroid.id}
                className={cn(
                  "border border-gray-100 rounded-lg",
                  "p-4",
                  "shadow hover:shadow-lg transition-shadow",
                )}
              >
                <Link href={`/${asteroid.id}`}>
                  <article className={"flex"}>
                    <P className={cn("font-semibold")}>
                      {asteroid.name}
                    </P>
                    <div className="h-full mx-4"/>
                    <P className={cn("")}>
                      {asteroid.estimated_diameter.kilometers.estimated_diameter_min} km
                      - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} km
                    </P>

                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  });
}
